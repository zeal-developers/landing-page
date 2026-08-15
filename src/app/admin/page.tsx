'use client';

import { useEffect, useState } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  Settings,
  Send,
  UserCheck,
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  fullName: string;
  businessName: string;
  mobile: string;
  email: string;
  city: string;
  crmType: string;
  amount: number;
  paymentStatus: string;
  crmAccountStatus: string;
  onboardingStatus: string;
  createdAt: string;
  payuTransactionId: string | null;
}

interface Stats {
  total: number;
  paid: number;
  pending: number;
  pendingSetup: number;
  loginSent: number;
  active: number;
}

const statCards = [
  { key: 'total' as const, label: 'TOTAL ORDERS', icon: Package, color: 'bg-gray-50 text-gray-700' },
  { key: 'paid' as const, label: 'PAID ORDERS', icon: CheckCircle2, color: 'bg-green-50 text-green-700' },
  { key: 'pending' as const, label: 'PENDING PAYMENTS', icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
  { key: 'pendingSetup' as const, label: 'PENDING CRM SETUPS', icon: Settings, color: 'bg-orange-50 text-orange-700' },
  { key: 'loginSent' as const, label: 'LOGINS SENT', icon: Send, color: 'bg-blue-50 text-blue-700' },
  { key: 'active' as const, label: 'ACTIVE CUSTOMERS', icon: UserCheck, color: 'bg-emerald-50 text-emerald-700' },
];

const filters = ['All', 'Paid', 'Pending', 'Pending Setup', 'Account Created', 'Login Sent', 'Active'];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, paid: 0, pending: 0, pendingSetup: 0, loginSent: 0, active: 0 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchOrders = async (status?: string) => {
    setLoading(true);
    try {
      const url = status && status !== 'All' ? `/api/orders?status=${status}` : '/api/orders';
      const res = await fetch(url);
      const data = await res.json();
      setOrders(data.orders || []);
      if (data.stats) setStats(data.stats);
    } catch {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = (f: string) => {
    setActiveFilter(f);
    fetchOrders(f);
  };

  const handleAction = async (orderId: string, action: string) => {
    setActionLoading(orderId);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, action }),
      });
      if (res.ok) {
        fetchOrders(activeFilter);
      }
    } catch {
      console.error('Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'PAID': return 'bg-green-100 text-green-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'FAILED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const accountColor = (s: string) => {
    switch (s) {
      case 'ACCOUNT_CREATED': return 'bg-blue-100 text-blue-700';
      case 'LOGIN_SENT': return 'bg-purple-100 text-purple-700';
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Order Dashboard</h1>
          <p className="text-sm text-orange-600 font-semibold mt-1">CRM LOGIN DELIVERY: WITHIN 24 HOURS</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {statCards.map((s) => (
            <div key={s.key} className={`rounded-xl p-4 ${s.color}`}>
              <s.icon size={20} className="mb-2" />
              <div className="text-2xl font-bold">{stats[s.key]}</div>
              <div className="text-[10px] font-medium mt-1 opacity-80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === f
                  ? 'bg-[#FF7A00] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Order ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">CRM</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Mobile</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Payment</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Account</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} className="text-center py-8 text-gray-400">Loading...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-8 text-gray-400">No orders found.</td></tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-mono text-[11px]">{o.orderId.slice(0, 18)}...</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 text-xs">{o.fullName}</div>
                        <div className="text-[10px] text-gray-400">{o.businessName}</div>
                      </td>
                      <td className="px-4 py-3 text-xs">{o.crmType}</td>
                      <td className="px-4 py-3 text-xs">{o.mobile}</td>
                      <td className="px-4 py-3 font-semibold text-xs">₹{o.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor(o.paymentStatus)}`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${accountColor(o.crmAccountStatus)}`}>
                          {o.crmAccountStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(o.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {o.paymentStatus === 'PAID' && o.crmAccountStatus === 'PENDING_SETUP' && (
                            <button
                              onClick={() => handleAction(o.orderId, 'mark_account_created')}
                              disabled={actionLoading === o.orderId}
                              className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                            >
                              Create Account
                            </button>
                          )}
                          {o.crmAccountStatus === 'ACCOUNT_CREATED' && (
                            <button
                              onClick={() => handleAction(o.orderId, 'mark_login_sent')}
                              disabled={actionLoading === o.orderId}
                              className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded hover:bg-purple-100 transition-colors"
                            >
                              Mark Login Sent
                            </button>
                          )}
                          {o.onboardingStatus === 'LOGIN_SENT' && (
                            <button
                              onClick={() => handleAction(o.orderId, 'mark_active')}
                              disabled={actionLoading === o.orderId}
                              className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition-colors"
                            >
                              Mark Active
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
