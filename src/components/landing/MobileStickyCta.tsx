'use client';

import { PRICE } from '@/lib/constants';
import { useState, useEffect } from 'react';

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const scrollToForm = () => {
    document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 safe-area-pb">
      <button
        onClick={scrollToForm}
        className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-base py-3.5 rounded-xl transition-colors shadow-lg"
      >
        GET CRM FOR ₹{PRICE}
      </button>
    </div>
  );
}
