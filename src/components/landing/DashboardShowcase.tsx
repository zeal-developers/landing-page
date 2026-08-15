'use client';

import { CRMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const DEMO_STATS: Record<string, number[]> = {
  consultancy: [248, 156, 89],
  solar: [312, 187, 64],
  school: [1240, 48, 320],
  'digital-marketing': [95, 42, 178],
  'real-estate': [67, 234, 51],
};

export default function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const crm = CRMS[active];
  const stats = useMemo(() => DEMO_STATS[crm.id] || [120, 85, 45], [crm.id]);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Everything Your Business Needs.{' '}
            <span className="text-[#FF7A00]">In One Dashboard.</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CRMS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                active === i
                  ? 'bg-[#FF7A00] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Dashboard Preview */}
        <motion.div
          key={crm.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
        >
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-100">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-md px-4 py-1 text-[11px] text-gray-400">
                {crm.name} — Trinetra AI
              </div>
            </div>
          </div>

          {/* Sidebar + Content layout */}
          <div className="flex min-h-[320px]">
            {/* Sidebar */}
            <div className="hidden sm:flex flex-col w-48 bg-white border-r border-gray-100 p-3 shrink-0">
              <div className="text-xs font-bold text-gray-400 mb-3 px-2">MODULES</div>
              {crm.dashboardModules.map((mod, i) => (
                <div
                  key={mod}
                  className={`px-3 py-2 rounded-lg text-xs font-medium mb-0.5 ${
                    i === 0 ? 'bg-[#FFF7F0] text-[#FF7A00]' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {mod}
                </div>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{crm.dashboardModules[0]}</h3>
                  <p className="text-[11px] text-gray-400">Overview</p>
                </div>
                <div className="bg-[#FF7A00] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  ACTIVE
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {crm.dashboardModules.slice(0, 3).map((mod, idx) => (
                  <div key={mod} className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="text-[10px] text-gray-400">Total {mod}</div>
                    <div className="text-lg font-bold text-gray-900">
                      {stats[idx] || 120}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table placeholder */}
              <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100">
                  {['Name', 'Status', 'Date', 'Action'].map((h) => (
                    <span key={h} className="text-[10px] font-semibold text-gray-500">
                      {h}
                    </span>
                  ))}
                </div>
                {[1, 2, 3, 4].map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-[10px] text-gray-700">
                      {crm.dashboardModules[0]} #{row}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        row % 2 === 0 ? 'text-green-600' : 'text-[#FF7A00]'
                      }`}
                    >
                      {row % 2 === 0 ? 'Active' : 'Pending'}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      0{row}/08/2026
                    </span>
                    <span className="text-[10px] text-[#FF7A00] font-medium cursor-pointer">
                      View
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
