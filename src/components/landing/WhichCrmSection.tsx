'client';

import { useState } from 'react';
import { CRMS, PRICE, type CrmId } from '@/lib/constants';
import { Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhichCrmProps {
  onSelectCrm?: (id: CrmId) => void;
}

const industryLabels: Record<CrmId, string> = {
  consultancy: 'Consultancy / Recruitment',
  solar: 'Solar Business',
  school: 'School',
  'digital-marketing': 'Digital Marketing Agency',
  'real-estate': 'Real Estate',
};

export default function WhichCrmSection({ onSelectCrm }: WhichCrmProps) {
  const [selected, setSelected] = useState<CrmId | null>(null);
  const crm = selected ? CRMS.find((c) => c.id === selected) : null;

  const handleSelect = (id: CrmId) => {
    setSelected(id);
  };

  const handleGetCrm = () => {
    if (selected && onSelectCrm) onSelectCrm(selected);
    setTimeout(() => {
      document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Not Sure Which CRM Is <span className="text-[#FF7A00]">Right For You</span>?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">What type of business do you run?</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Industry Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {CRMS.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => handleSelect(c.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selected === c.id
                    ? 'border-[#FF7A00] bg-white shadow-md'
                    : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected === c.id ? 'border-[#FF7A00]' : 'border-gray-300'
                    }`}
                  >
                    {selected === c.id && <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />}
                  </div>
                  <span className="font-semibold text-sm text-gray-800">{industryLabels[c.id]}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected CRM Details */}
          <AnimatePresence mode="wait">
            {crm && (
              <motion.div
                key={crm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{crm.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{crm.description}</p>
                    <div className="space-y-2 mb-6">
                      {crm.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <Check size={14} className="text-[#FF7A00]" />
                          <span className="text-sm text-gray-600">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl font-extrabold text-[#FF7A00]">₹{PRICE}</span>
                      <span className="text-sm text-gray-500">First Month Only</span>
                    </div>
                    <button
                      onClick={handleGetCrm}
                      className="flex items-center gap-2 bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md"
                    >
                      GET THIS CRM FOR ₹{PRICE}
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Right: Dashboard Preview */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 mb-3">Dashboard Modules</div>
                    <div className="grid grid-cols-2 gap-2">
                      {crm.dashboardModules.map((mod) => (
                        <div
                          key={mod}
                          className="bg-white rounded-lg px-3 py-3 text-center text-xs font-medium text-gray-700 border border-gray-100"
                        >
                          {mod}
                        </div>
                      ))}
                    </div>
                    {/* Fake mini chart */}
                    <div className="mt-4 bg-white rounded-lg p-3 border border-gray-100">
                      <div className="text-[10px] text-gray-400 mb-2">Activity Overview</div>
                      <div className="flex items-end gap-1 h-12">
                        {[35, 55, 40, 70, 50, 80, 65, 90, 60, 85, 70, 95].map((h, i) => (
                          <div key={i} className="flex-1">
                            <div
                              className="w-full rounded-sm bg-[#FF7A00]"
                              style={{ height: `${h}%`, opacity: 0.5 + h / 200 }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
