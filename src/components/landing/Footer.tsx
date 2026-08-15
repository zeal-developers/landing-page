import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'CRM Solutions', href: '#crm-solutions' },
  { label: 'Privacy Policy', href: 'https://trinetraaisolutions.com/privacy-policy' },
  { label: 'Terms & Conditions', href: 'https://trinetraaisolutions.com/terms-and-conditions' },
  { label: 'Refund / Cancellation Policy', href: 'https://trinetraaisolutions.com/refund-cancellation-policy' },
  { label: 'Contact', href: 'https://trinetraaisolutions.com/contact' },
  { label: 'Support', href: 'https://trinetraaisolutions.com/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/trinetra-logo.jpeg"
                alt="Trinetra AI Solutions"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-lg">Trinetra AI Solutions</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Industry-specific CRM solutions designed to help businesses manage leads, customers, teams, follow-ups and daily operations from one dashboard.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#FF7A00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300">Contact</h4>
            <p className="text-sm text-gray-400 mb-2">
              Website:{' '}
              <a
                href="https://trinetraaisolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF7A00] hover:underline"
              >
                trinetraaisolutions.com
              </a>
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Secure Payments Powered by PayU
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Trinetra AI Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}