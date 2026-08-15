'use client';

import { FileSpreadsheet, MessageCircle, NotebookPen, ClipboardList, Clock, Users, CreditCard, UserPlus, FolderOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const problems = [
  { icon: FileSpreadsheet, label: 'Excel Sheets', color: 'bg-green-50 text-green-600 border-green-200' },
  { icon: MessageCircle, label: 'WhatsApp Chats', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { icon: NotebookPen, label: 'Notebooks', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { icon: ClipboardList, label: 'Customer Lists', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { icon: Clock, label: 'Reminders', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { icon: Users, label: 'Team Messages', color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { icon: CreditCard, label: 'Payment Records', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  { icon: UserPlus, label: 'Lead Lists', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { icon: FolderOpen, label: 'Project Info', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
];

const painPoints = [
  'Data ek jagah nahi.',
  'Follow-up miss ho jata hai.',
  'Team ka kaam track karna difficult hai.',
  'Customer information scattered hai.',
  'Har industry ke liye alag business workflow hai.',
];

export default function ProblemSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Still Managing Your Business Across{' '}
            <span className="text-[#FF7A00]">Excel, WhatsApp</span> & Multiple Tools?
          </h2>
        </motion.div>

        {/* Scattered tools */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 15, rotate: (i % 2 === 0 ? -3 : 3) }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-medium ${p.color}`}
            >
              <p.icon size={16} />
              {p.label}
            </motion.div>
          ))}
        </div>

        {/* Pain points */}
        <div className="max-w-2xl mx-auto space-y-3 mb-12">
          {painPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 text-gray-700"
            >
              <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span className="text-sm sm:text-base">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#FFF7F0] rounded-2xl p-6 sm:p-8 border border-orange-100"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg sm:text-xl font-bold text-gray-900">Ab Sab Ek CRM Mein.</p>
            <p className="text-sm text-gray-600 mt-1">Choose your industry-specific CRM and get started.</p>
          </div>
          <a
            href="#crm-solutions"
            className="flex items-center gap-2 bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 whitespace-nowrap"
          >
            Choose Your CRM
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
