'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft, Headphones } from 'lucide-react';
import { PRICE } from '@/lib/constants';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [verified, setVerified] = useState(false);
  const [orderData, setOrderData] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function verify() {
      if (!orderId) {
        setError('No order ID found.');
        return;
      }
      try {
        // In production, PayU sends POST params to surl.
        // Here we verify through our API.
        // The actual PayU response should be forwarded to /api/payu/verify
        // For the demo, we check the order status in our DB.
        const res = await fetch(`/api/payu/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        if (data.verified || res.ok) {
          setVerified(true);
          if (data.orderId) {
            setOrderData({
              orderId: data.orderId,
              crmType: data.crmType || '',
              amount: `₹${PRICE}`,
              status: 'PAID',
            });
          }
          // Fire Meta Pixel Purchase event ONLY after server verification
          if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
            (window as unknown as {
              fbq: (event: string, eventName: string, data?: Record<string, unknown>) => void;
            }).fbq('track', 'Purchase', {
              value: PRICE,
              currency: 'INR',
            });
          }
        } else {
          setError(data.error || 'Payment verification failed.');
        }
      } catch {
        setError('Verification error. Please contact support.');
      }
    }
    verify();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        {verified ? (
          <>
            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-2">Thank You for Choosing Trinetra AI.</p>
            <p className="text-gray-600 mb-6">
              Your CRM setup has been initiated. Your CRM Login ID & Password will be shared{' '}
              <span className="font-bold text-[#FF7A00]">within 24 hours</span>.
            </p>

            {orderData && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2 border border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-medium text-gray-900">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">CRM</span>
                  <span className="font-medium text-gray-900">{orderData.crmType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-bold text-[#FF7A00]">{orderData.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-green-600">{orderData.status}</span>
                </div>
              </div>
            )}

            <a
              href="https://trinetraaisolutions.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-[#FF7A00] text-gray-700 hover:text-[#FF7A00] font-semibold text-sm px-6 py-3 rounded-xl transition-all"
            >
              <Headphones size={16} />
              CONTACT SUPPORT
            </a>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 text-6xl mb-4">!</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Verification Pending</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[#FF7A00] font-semibold text-sm"
            >
              <ArrowLeft size={16} />
              Back to Home
            </a>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-sm">Verifying your payment...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
