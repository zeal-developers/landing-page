'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Headphones, AlertTriangle } from 'lucide-react';

function FailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <AlertTriangle size={64} className="text-red-500 mx-auto mb-6" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          Payment Could Not Be Completed.
        </h1>
        <p className="text-gray-600 mb-2">
          Your order has not been marked as paid.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-6">
            Order ID: {orderId}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all"
          >
            TRY PAYMENT AGAIN
          </a>
          <a
            href="https://trinetraaisolutions.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-[#FF7A00] text-gray-700 hover:text-[#FF7A00] font-semibold text-sm px-6 py-3 rounded-xl transition-all"
          >
            <Headphones size={16} />
            CONTACT SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FailurePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FailureContent />
    </Suspense>
  );
}
