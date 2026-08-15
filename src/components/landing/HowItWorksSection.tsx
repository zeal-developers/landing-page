'use client';

import { MousePointerClick, FileText, Shield, Clock } from 'lucide-react';
import { PRICE } from '@/lib/constants';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Choose Your CRM',
    desc: 'Select the CRM designed for your industry.',
  },
  {
    icon: FileText,
    title: 'Fill the Form',
    desc: 'Enter your business and contact details.',
  },
  {
    icon: Shield,
    title: `Pay ₹${PRICE} Securely`,
    desc: 'Complete the payment through PayU.',
  },
  {
    icon: Clock,
    title: 'Get Your Login Within 24 Hours',
    desc: 'Our team will create your account and send your CRM Login ID & Password within 24 hours.',
    highlight: true,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-[#FFF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Get Your CRM in <span className="text-[#FF7A00]">4 Simple Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#FF7A00]/30 to-transparent z-0" />
              )}

              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <step.icon size={22} className="text-[#FF7A00] w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                </div>
                <div className="text-xs font-bold text-[#FF7A00] mb-2">STEP {i + 1}</div>
                <h3 className={`font-bold text-gray-900 text-xs sm:text-sm mb-1.5 sm:mb-2 ${step.highlight ? 'sm:text-base' : ''}`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
                {step.highlight && (
                  <span className="inline-block mt-2 bg-[#FF7A00] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    WITHIN 24 HOURS
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
