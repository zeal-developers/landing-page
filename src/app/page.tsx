'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import CrmCardsSection from '@/components/landing/CrmCardsSection';
import WhichCrmSection from '@/components/landing/WhichCrmSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DashboardShowcase from '@/components/landing/DashboardShowcase';
import PricingSection from '@/components/landing/PricingSection';
import PurchaseForm from '@/components/landing/PurchaseForm';
import FaqSection from '@/components/landing/FaqSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';
import Footer from '@/components/landing/Footer';
import MobileStickyCta from '@/components/landing/MobileStickyCta';
import { CRMS, type CrmId } from '@/lib/constants';

// Map URL slug to CRM ID
function getCrmFromPath(): CrmId | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.toLowerCase();
  for (const crm of CRMS) {
    if (path.includes(crm.id)) return crm.id;
  }
  return null;
}

export default function LandingPage() {
  const [selectedCrm, setSelectedCrm] = useState<CrmId | null>(() => getCrmFromPath());

  // Track ViewContent on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
      (window as unknown as { fbq: (event: string, data?: Record<string, unknown>) => void }).fbq('track', 'ViewContent', {
        content_name: 'CRM Landing Page',
        content_category: 'CRM',
      });
    }
  }, []);

  const handleSelectCrm = (id: CrmId) => {
    setSelectedCrm(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-14 sm:pt-16 md:pt-[4.5rem]">
        <HeroSection />
        <ProblemSection />
        <CrmCardsSection onSelectCrm={handleSelectCrm} />
        <WhichCrmSection onSelectCrm={handleSelectCrm} />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardShowcase />
        <PricingSection />
        <PurchaseForm preselectedCrm={selectedCrm} />
        <FaqSection />
        <FinalCtaSection />
        {/* Spacer for mobile sticky CTA */}
        <div className="h-16 sm:h-18 lg:hidden" />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
