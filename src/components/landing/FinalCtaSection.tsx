'use client';

import { PRICE } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinalCtaSection() {
  const scrollToCrm = () => {
    document.getElementById('crm-solutions')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToForm = () => {
    document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#FF7A00] to-[#E66A00] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
            Ready To Manage Your Business Better?
          </h2>
          <p className="text-orange-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
            Choose your industry CRM and get started today.
          </p>
          <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-1.5 sm:mb-2">
            ₹{PRICE}
          </div>
          <p className="text-orange-100 text-xs sm:text-sm font-medium mb-6 sm:mb-8">FIRST MONTH ONLY</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToCrm}
              className="w-full sm:w-auto bg-white text-[#FF7A00] font-bold text-base px-8 py-4 rounded-full hover:bg-orange-50 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            >
              CHOOSE YOUR CRM
              <ArrowRight size={18} />
            </button>
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto border-2 border-white/40 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              VIEW CRM DEMOS
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
