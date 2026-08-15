import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: Record<string, string> = {};
    if (status && status !== 'All') {
      if (['PAID', 'PENDING', 'FAILED', 'CANCELLED', 'REFUNDED'].includes(status)) {
        where.paymentStatus = status;
      } else if (['PENDING_SETUP', 'ACCOUNT_CREATED', 'LOGIN_SENT', 'ACTIVE'].includes(status)) {
        where.crmAccountStatus = status;
      }
    }

    const orders = await db.order.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Aggregate stats
    const allOrders = await db.order.findMany();
    const stats = {
      total: allOrders.length,
      paid: allOrders.filter((o) => o.paymentStatus === 'PAID').length,
      pending: allOrders.filter((o) => o.paymentStatus === 'PENDING').length,
      pendingSetup: allOrders.filter((o) => o.crmAccountStatus === 'PENDING_SETUP').length,
      loginSent: allOrders.filter((o) => o.onboardingStatus === 'LOGIN_SENT').length,
      active: allOrders.filter((o) => o.onboardingStatus === 'ACTIVE').length,
    };

    return NextResponse.json({ orders, stats });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, action, adminNotes } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    const order = await db.order.findUnique({ where: { orderId } });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};

    switch (action) {
      case 'mark_account_created':
        updates.crmAccountStatus = 'ACCOUNT_CREATED';
        updates.accountCreatedAt = new Date();
        break;
      case 'mark_login_sent':
        updates.onboardingStatus = 'LOGIN_SENT';
        updates.loginSentAt = new Date();
        break;
      case 'mark_active':
        updates.onboardingStatus = 'ACTIVE';
        break;
      case 'add_note':
        updates.adminNotes = adminNotes;
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updated = await db.order.update({
      where: { orderId },
      data: updates,
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
