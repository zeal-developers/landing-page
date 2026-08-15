'use client';

import { PRICE } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function PricingSection() {
  const scrollToForm = () => {
    document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10">
            Start With Your <span className="text-[#FF7A00]">Industry CRM</span>
          </h2>

          <div className="bg-gradient-to-br from-[#FFF7F0] to-white rounded-3xl p-8 sm:p-12 border-2 border-orange-100 shadow-lg">
            <div className="text-sm font-semibold text-gray-500 mb-2">FIRST MONTH ONLY</div>
            <div className="text-6xl sm:text-7xl font-extrabold text-[#FF7A00] mb-2">
              ₹{PRICE}
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Get your CRM setup started and receive your login details within 24 hours after successful payment.
            </div>

            {/* Future pricing placeholder */}
            <div className="bg-white/60 rounded-xl p-3 mb-6 border border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                After the first month: <span className="font-semibold text-gray-700" id="future-price">Contact for pricing</span>
              </p>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              GET CRM FOR ₹{PRICE}
            </button>

            <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Secure payment powered by PayU
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
