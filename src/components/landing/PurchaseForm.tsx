'use client';

import { useState, useEffect, useCallback } from 'react';
import { CRM_OPTIONS, PRICE, type CrmId } from '@/lib/constants';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, ShieldCheck } from 'lucide-react';

interface PurchaseFormProps {
  preselectedCrm?: CrmId | null;
}

interface FormData {
  fullName: string;
  businessName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  crmType: string;
  teamSize: string;
  currentMethod: string;
  message: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
}

interface FormErrors {
  fullName?: string;
  businessName?: string;
  mobile?: string;
  email?: string;
  crmType?: string;
}

export default function PurchaseForm({ preselectedCrm }: PurchaseFormProps) {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    businessName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    city: '',
    crmType: preselectedCrm || '',
    teamSize: '',
    currentMethod: '',
    message: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmContent: '',
    utmTerm: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Capture UTM params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const updates: Partial<FormData> = {};
    utmFields.forEach((f) => {
      const val = params.get(f);
      if (val) {
        const key = f.replace('utm_', 'utm') as keyof Pick<FormData, 'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmContent' | 'utmTerm'>;
        const mappedKey = f === 'utm_source' ? 'utmSource' : f === 'utm_medium' ? 'utmMedium' : f === 'utm_campaign' ? 'utmCampaign' : f === 'utm_content' ? 'utmContent' : 'utmTerm';
        (updates as Record<string, string>)[mappedKey] = val;
      }
    });
    if (Object.keys(updates).length > 0) {
      setForm((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  // Update CRM selection from parent
  useEffect(() => {
    if (preselectedCrm) {
      setForm((prev) => ({ ...prev, crmType: preselectedCrm }));
    }
  }, [preselectedCrm]);

  const validate = useCallback((): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.businessName.trim()) e.businessName = 'Business name is required';
    if (!form.mobile.trim()) {
      e.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, ''))) {
      e.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!form.crmType) e.crmType = 'Please select a CRM';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/payu/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: PRICE,
        }),
      });
      const data = await res.json();

      if (data.paymentActionUrl && data.payuParams) {
        // Track InitiateCheckout
        if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
          (window as unknown as { fbq: (...args: [string, string, Record<string, unknown>?]) => void }).fbq('track', 'InitiateCheckout', { value: PRICE, currency: 'INR' });
        }

        // PayU requires a real POST form submission, not a GET redirect with query params
        const form2 = document.createElement('form');
        form2.method = 'POST';
        form2.action = data.paymentActionUrl;

        Object.entries(data.payuParams as Record<string, string>).forEach(([name, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form2.appendChild(input);
        });

        document.body.appendChild(form2);
        form2.submit();
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 focus:border-[#FF7A00] ${
      errors[field] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 bg-gray-50/50'
    }`;

  const labelClass = 'block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5';

  return (
    <section id="purchase-form" className="py-12 sm:py-16 lg:py-24 bg-[#FFF7F0]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
              Get Your <span className="text-[#FF7A00]">CRM Access</span>
            </h2>
            <p className="text-gray-600 text-sm">Fill in your details and proceed to payment.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              {/* Full Name */}
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass('fullName')}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Business Name */}
              <div>
                <label className={labelClass}>
                  Business / Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className={inputClass('businessName')}
                  placeholder="Your company name"
                />
                {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
              </div>

              {/* Mobile */}
              <div>
                <label className={labelClass}>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={inputClass('mobile')}
                  placeholder="10-digit mobile"
                />
                {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={inputClass('fullName')}
                  placeholder="Same as mobile if same"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass('email')}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={inputClass('fullName')}
                  placeholder="Your city"
                />
              </div>

              {/* CRM Type */}
              <div>
                <label className={labelClass}>
                  Select Your CRM <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.crmType}
                  onChange={(e) => setForm({ ...form, crmType: e.target.value })}
                  className={inputClass('crmType')}
                >
                  <option value="">Choose a CRM</option>
                  {CRM_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                {errors.crmType && <p className="text-xs text-red-500 mt-1">{errors.crmType}</p>}
              </div>

              {/* Team Size */}
              <div>
                <label className={labelClass}>Number of Team Members</label>
                <select
                  value={form.teamSize}
                  onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                  className={inputClass('fullName')}
                >
                  <option value="">Select</option>
                  {['1-5', '6-10', '11-20', '21-50', '50+'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Current Method */}
              <div>
                <label className={labelClass}>Current Management Method</label>
                <select
                  value={form.currentMethod}
                  onChange={(e) => setForm({ ...form, currentMethod: e.target.value })}
                  className={inputClass('fullName')}
                >
                  <option value="">Select</option>
                  {['Excel / Sheets', 'WhatsApp', 'Notebook / Manual', 'Other CRM', 'No System'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Message / Requirement</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass('fullName')} min-h-[80px] resize-none`}
                  placeholder="Any specific requirements..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#FF7A00] hover:bg-[#E66A00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 flex items-center justify-center gap-2 mt-4"
            >
              {submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                `PROCEED TO PAYMENT — ₹${PRICE}`
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <ShieldCheck size={14} />
              Secure payment powered by PayU
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}