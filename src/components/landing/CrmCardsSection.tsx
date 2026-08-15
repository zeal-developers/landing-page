'use client';

import { CRMS, PRICE, type CrmId } from '@/lib/constants';
import { Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  'briefcase': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#FF7A00]"><rect x="4" y="12" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M10 12V8a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="21" r="2" fill="currentColor"/></svg>
  ),
  'sun': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#F59E0B]"><circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2"/><path d="M16 4v4m0 16v4M4 16h4m16 0h4M7.5 7.5l2.8 2.8m11.4 11.4l2.8 2.8M7.5 24.5l2.8-2.8m11.4-11.4l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  'graduation-cap': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#10B981]"><path d="M4 12l12-7 12 7v10l-12 7-12-7V12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M4 12l12 7 12-7" stroke="currentColor" strokeWidth="2"/><path d="M16 19v10" stroke="currentColor" strokeWidth="2"/></svg>
  ),
  'megaphone': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#8B5CF6]"><path d="M8 22h2l6-12h-2L8 22z" fill="currentColor"/><path d="M16 10h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8V10z" stroke="currentColor" strokeWidth="2"/><path d="M8 22a4 4 0 0 0 0-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  'building-2': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#3B82F6]"><rect x="6" y="4" width="20" height="26" rx="1" stroke="currentColor" strokeWidth="2"/><path d="M12 10h2m4 0h2m-8 6h2m4 0h2m-8 6h2m4 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M13 22h6v8h-6z" stroke="currentColor" strokeWidth="2"/></svg>
  ),
};

interface CrmCardsProps {
  onSelectCrm?: (id: CrmId) => void;
}

export default function CrmCardsSection({ onSelectCrm }: CrmCardsProps) {
  const scrollToForm = (crmId: CrmId) => {
    if (onSelectCrm) onSelectCrm(crmId);
    setTimeout(() => {
      document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="crm-solutions" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Your Business. <span className="text-[#FF7A00]">Your CRM.</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Apne business ke liye specially designed CRM choose karein.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRMS.map((crm, i) => (
            <motion.div
              key={crm.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Mini dashboard preview */}
              <div className="bg-gray-50 p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    {iconMap[crm.icon]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{crm.name}</h3>
                    <p className="text-[10px] text-gray-400">Dashboard Preview</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {crm.dashboardModules.slice(0, 6).map((mod) => (
                    <div
                      key={mod}
                      className="bg-white rounded-md px-2 py-1.5 text-center text-[10px] font-medium text-gray-600 border border-gray-100"
                    >
                      {mod}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {crm.description}
                </p>

                <div className="space-y-2 mb-5 flex-1">
                  {crm.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={14} className="text-[#FF7A00] shrink-0" />
                      <span className="text-xs text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="bg-[#FFF7F0] rounded-xl p-3 mb-4 text-center">
                  <span className="text-xs text-gray-500">First Month</span>
                  <div className="text-2xl font-extrabold text-[#FF7A00]">₹{PRICE}</div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  <a
                    href={crm.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 hover:border-[#FF7A00] text-gray-700 hover:text-[#FF7A00] font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-200"
                  >
                    VIEW {crm.name.toUpperCase()}
                    <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => scrollToForm(crm.id)}
                    className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
                  >
                    GET THIS CRM — ₹{PRICE}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
