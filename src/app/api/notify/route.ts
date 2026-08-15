import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order, payuData } = body;

    if (!order) {
      return NextResponse.json({ error: 'No order data' }, { status: 400 });
    }

    const TEAM_EMAIL = process.env.TEAM_NOTIFICATION_EMAIL;
    const notification = {
      title: 'NEW CRM ORDER — PAYMENT RECEIVED',
      customerName: order.fullName,
      businessName: order.businessName,
      mobile: order.mobile,
      email: order.email,
      selectedCrm: order.crmType,
      orderId: order.orderId,
      amount: '₹299',
      paymentStatus: 'PAID',
      orderDate: new Date().toISOString(),
      accountStatus: 'PENDING_SETUP',
    };

    console.log('=== NEW CRM ORDER NOTIFICATION ===');
    console.log(JSON.stringify(notification, null, 2));
    console.log('===================================');

    // Email notification (placeholder - integrate with your email service)
    if (TEAM_EMAIL) {
      console.log(`Team notification email would be sent to: ${TEAM_EMAIL}`);
      // In production, integrate with: Resend, SendGrid, Nodemailer, etc.
      // Example with a generic fetch to your email service:
      // await fetch('https://your-email-service.com/send', { ... })
    }

    // WhatsApp notification hook (placeholder for future integration)
    // if (process.env.WHATSAPI_URL) {
    //   await fetch(process.env.WHATSAPI_URL, { ... });
    // }

    return NextResponse.json({ success: true, message: 'Notification processed' });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Notification failed' }, { status: 500 });
  }
}
