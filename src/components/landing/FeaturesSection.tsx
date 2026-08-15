'use client';

import { LayoutDashboard, UserPlus, PhoneCall, Users, Bell, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: LayoutDashboard,
    title: 'ONE DASHBOARD',
    desc: 'Keep your important business data organized in one place.',
  },
  {
    icon: UserPlus,
    title: 'LEAD MANAGEMENT',
    desc: 'Track every lead from enquiry to conversion.',
  },
  {
    icon: PhoneCall,
    title: 'FOLLOW-UP MANAGEMENT',
    desc: 'Never lose track of important follow-ups.',
  },
  {
    icon: Users,
    title: 'TEAM MANAGEMENT',
    desc: 'Assign work, track tasks and monitor team activity.',
  },
  {
    icon: Bell,
    title: 'NOTIFICATIONS & REMINDERS',
    desc: 'Stay updated on important activities and pending work.',
  },
  {
    icon: BarChart3,
    title: 'BUSINESS REPORTS',
    desc: 'Get a clear view of your business performance.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Stop Managing Your Business <span className="text-[#FF7A00]">in Pieces.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#FFF7F0] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#FF7A00] transition-colors duration-300">
                <b.icon size={20} className="text-[#FF7A00] sm:text-[22px] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5 sm:mb-2 tracking-wide">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
