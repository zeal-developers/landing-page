import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, businessName, mobile, whatsapp, email, city, crmType, teamSize, currentMethod, message, amount, utmSource, utmMedium, utmCampaign, utmContent, utmTerm } = body;

    // Validate required fields
    if (!fullName || !businessName || !mobile || !email || !crmType) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    // Validate Indian mobile
    if (!/^[6-9]\d{9}$/.test(mobile.replace(/\s/g, ''))) {
      return NextResponse.json({ error: 'Enter a valid 10-digit Indian mobile number.' }, { status: 400 });
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    const merchantKey = process.env.PAYU_MERCHANT_KEY;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;
    const environment = process.env.PAYU_ENVIRONMENT || 'test';

    if (!merchantKey || !merchantSalt) {
      return NextResponse.json({ error: 'Payment gateway is not configured. Please contact support.' }, { status: 500 });
    }

    // Generate unique order ID
    const orderId = `TRN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const txnId = `TXN-${Date.now()}`;

    // Store order as PENDING
    await db.order.create({
      data: {
        orderId,
        fullName,
        businessName,
        mobile: mobile.replace(/\s/g, ''),
        whatsapp: whatsapp ? whatsapp.replace(/\s/g, '') : null,
        email,
        city,
        crmType,
        teamSize: teamSize || null,
        currentMethod: currentMethod || null,
        message: message || null,
        amount: parseFloat(String(amount)) || 299,
        paymentStatus: 'PENDING',
        crmAccountStatus: 'PENDING_SETUP',
        onboardingStatus: 'PENDING_SETUP',
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmContent: utmContent || null,
        utmTerm: utmTerm || null,
      },
    });

    // PayU URLs
    const payuBaseUrls: Record<string, string> = {
      test: 'https://test.payu.in',
      live: 'https://secure.payu.in',
    };
    const baseUrl = payuBaseUrls[environment] || payuBaseUrls.test;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://trinetraaisolutions.com';
    const successUrl = `${appUrl}/payment/success?orderId=${orderId}`;
    const failureUrl = `${appUrl}/payment/failure?orderId=${orderId}`;

    // PayU hash: sha512(key|txnid|amount|productinfo|firstname|email|||||||||||SALT)
    const hashString = `${merchantKey}|${txnId}|${amount}|${crmType}|${fullName}|${email}|||||||||||${merchantSalt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const params = new URLSearchParams({
      key: merchantKey,
      txnid: txnId,
      amount: String(amount),
      productinfo: crmType,
      firstname: fullName,
      email,
      phone: mobile,
      surl: successUrl,
      furl: failureUrl,
      hash,
      service_provider: 'payu_paisa',
    });

    const paymentUrl = `${baseUrl}/_payment?${params.toString()}`;

    return NextResponse.json({ paymentUrl, orderId, txnId });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
