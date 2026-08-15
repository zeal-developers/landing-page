import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txnid, mihpayid, status, amount, productinfo, firstname, email, hash: receivedHash, phone } = body;

    // Verify the hash server-side
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;
    const merchantKey = process.env.PAYU_MERCHANT_KEY;

    if (!merchantSalt || !merchantKey) {
      return NextResponse.json({ error: 'Payment gateway not configured.', verified: false }, { status: 500 });
    }

    // PayU response hash: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    // Additional info (reverse order): sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|||||SALT)
    const verifyString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${merchantSalt}`;
    const expectedHash = crypto.createHash('sha512').update(verifyString).digest('hex');

    // Find the order by transaction ID mapping - we need to look up by our stored txnid
    // Since we generate txnId as TXN-timestamp, we can find the order by looking at recent orders
    // Better approach: find by checking if status matches and amount matches
    const order = await db.order.findFirst({
      where: {
        payuTransactionId: txnid,
      },
    });

    // If no order found by payuTransactionId, the order might still have the old status
    // In production, you'd store txnid in the order and look it up directly
    // For now, we verify based on hash match and status

    const isHashValid = expectedHash === receivedHash;
    const isStatusSuccess = status === 'success';
    const isAmountCorrect = parseFloat(amount) === 299;

    if (!isHashValid) {
      console.error('Hash verification failed', { expectedHash, receivedHash });
      return NextResponse.json({ error: 'Hash verification failed.', verified: false }, { status: 400 });
    }

    if (!isStatusSuccess) {
      // Mark as failed
      if (order) {
        await db.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'FAILED',
            payuTransactionId: txnid,
            paymentReference: mihpayid,
          },
        });
      }
      return NextResponse.json({ verified: false, status: 'failed' });
    }

    if (!isAmountCorrect) {
      console.error('Amount mismatch', { expected: 299, received: amount });
      return NextResponse.json({ error: 'Amount mismatch.', verified: false }, { status: 400 });
    }

    // All checks passed - mark as PAID
    if (order) {
      await db.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'PAID',
          payuTransactionId: txnid,
          paymentReference: mihpayid,
          paymentDate: new Date(),
        },
      });
    }

    // Trigger team notification (fire and forget)
    try {
      const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/notify`;
      fetch(notifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: order ? { ...order, paymentStatus: 'PAID' } : null,
          payuData: body,
        }),
      }).catch(() => {}); // Don't block on notification failure
    } catch {
      // Ignore notification errors
    }

    // Track Meta Purchase event
    // The success page will handle the pixel firing after server verification

    return NextResponse.json({
      verified: true,
      status: 'success',
      orderId: order?.orderId,
      crmType: order?.crmType,
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ error: 'Verification failed.', verified: false }, { status: 500 });
  }
}
