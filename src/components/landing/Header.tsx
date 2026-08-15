'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, PRICE } from '@/lib/constants';
import Image from 'next/image';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('purchase-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/trinetra-logo.jpeg"
              alt="Trinetra AI Solutions"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <span className="font-bold text-lg text-gray-900 hidden sm:block">
              Trinetra AI
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#FF7A00] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={scrollToForm}
            className="hidden lg:block bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            GET CRM FOR ₹{PRICE}
          </button>

          {/* Mobile: hamburger + CTA */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={scrollToForm}
              className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors"
            >
              ₹{PRICE}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-gray-600 hover:text-[#FF7A00] py-1"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={scrollToForm}
              className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors mt-2"
            >
              GET CRM FOR ₹{PRICE}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
