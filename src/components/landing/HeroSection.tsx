'use client';

import { PRICE } from '@/lib/constants';
import {
  Users,
  UserCheck,
  PhoneCall,
  UsersRound,
  ListChecks,
  Bell,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';

const floatCards = [
  { icon: Users, label: 'Leads', x: '5%', y: '10%', delay: 0 },
  { icon: UserCheck, label: 'Customers', x: '75%', y: '5%', delay: 0.1 },
  { icon: PhoneCall, label: 'Follow-ups', x: '80%', y: '55%', delay: 0.2 },
  { icon: UsersRound, label: 'Team', x: '2%', y: '60%', delay: 0.15 },
  { icon: ListChecks, label: 'Tasks', x: '40%', y: '0%', delay: 0.05 },
  { icon: Bell, label: 'Notifications', x: '50%', y: '85%', delay: 0.25 },
  { icon: TrendingUp, label: 'Sales', x: '85%', y: '30%', delay: 0.3 },
  { icon: BarChart3, label: 'Reports', x: '8%', y: '35%', delay: 0.2 },
];

export default function HeroSection() {
  const scrollToCrm = () => {
    document.getElementById('crm-solutions')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToForm = () => {
    document.getElementById('purchase-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF7F0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Offer Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#FF7A00] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-lg shadow-orange-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              FIRST MONTH ₹{PRICE} ONLY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 tracking-tight"
          >
            Your Business.{' '}
            <span className="text-[#FF7A00]">Your CRM.</span>
            <br />
            One Dashboard.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2"
          >
            Manage Leads, Customers, Teams, Follow-ups, Sales & Daily Operations
            — All From One CRM.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              GET YOUR CRM FOR ₹{PRICE}
            </button>
            <button
              onClick={scrollToCrm}
              className="w-full sm:w-auto border-2 border-gray-200 hover:border-[#FF7A00] text-gray-700 hover:text-[#FF7A00] font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200"
            >
              EXPLORE CRMs
            </button>
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100"
        >
          {/* Floating cards */}
          {floatCards.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + card.delay }}
              className="absolute hidden lg:flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-sm font-medium text-gray-700 z-10"
              style={{ left: card.x, top: card.y }}
            >
              <card.icon size={16} className="text-[#FF7A00]" />
              {card.label}
            </motion.div>
          ))}

          {/* Main Dashboard Card */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-4 py-1 text-xs text-gray-400 border border-gray-200">
                  crm.trinetraaisolutions.com
                </div>
              </div>
            </div>
            {/* Dashboard content */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6">
              <DashboardModule icon="📊" label="Leads" value="248" change="+12%" />
              <DashboardModule icon="👥" label="Customers" value="1,420" change="+8%" />
              <DashboardModule icon="📞" label="Follow-ups" value="67" change="Pending" />
              <DashboardModule icon="📈" label="Sales" value="₹4.2L" change="+15%" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 px-4 sm:px-6 pb-4 sm:pb-6">
              {['Candidates', 'Companies', 'Projects', 'Tasks', 'Team', 'Reports'].map((m) => (
                <div
                  key={m}
                  className="bg-[#FFF7F0] rounded-lg px-1.5 sm:px-2 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-medium text-gray-700 hover:bg-orange-100 transition-colors cursor-default"
                >
                  {m}
                </div>
              ))}
            </div>
            {/* Mini chart area */}
            <div className="px-3 sm:px-6 pb-4 sm:pb-6">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-700">Monthly Overview</span>
                  <span className="text-xs text-[#FF7A00] font-medium">This Month</span>
                </div>
                <div className="flex items-end gap-0.5 sm:gap-1.5 h-12 sm:h-16">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-[#FF7A00] transition-all duration-500"
                        style={{ height: `${h}%`, opacity: 0.6 + (h / 200) }}
                      />
                      <span className="text-[7px] sm:text-[9px] text-gray-400">
                        {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6 font-medium">
            Built for Your Industry
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardModule({ icon, label, value, change }: { icon: string; label: string; value: string; change: string }) {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-100">
      <div className="text-base sm:text-xl mb-0.5 sm:mb-1">{icon}</div>
      <div className="text-base sm:text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{label}</div>
      <div className={`text-[10px] sm:text-xs font-medium mt-0.5 sm:mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-[#FF7A00]'}`}>
        {change}
      </div>
    </div>
  );
}
