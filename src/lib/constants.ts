export const CRMS = [
  {
    id: 'consultancy',
    name: 'Consultancy CRM',
    description: 'Candidates, Companies, Requirements & Team — Sab Ek Dashboard.',
    features: ['Candidates', 'Companies', 'Requirements', 'Interviews', 'Follow-ups', 'BDE / Team Management'],
    viewUrl: 'https://trinetraaisolutions.com/free-tools/consultancy-crm',
    color: '#FF7A00',
    icon: 'briefcase',
    dashboardModules: ['Candidates', 'Companies', 'Requirements', 'Interviews', 'Follow-ups', 'Team'],
  },
  {
    id: 'solar',
    name: 'Solar CRM',
    description: 'Leads Se Installation Tak — Pura Solar Business Ek Jagah.',
    features: ['Leads', 'Customers', 'Site Visits', 'Quotations', 'Projects', 'Installations', 'Follow-ups', 'Team'],
    viewUrl: 'https://trinetraaisolutions.com/free-tools/solar-crm',
    color: '#F59E0B',
    icon: 'sun',
    dashboardModules: ['Leads', 'Site Visits', 'Quotations', 'Projects', 'Installations', 'Follow-ups'],
  },
  {
    id: 'school',
    name: 'School CRM & ERP',
    description: 'Students, Teachers, Attendance, Fees & Exams — One Dashboard.',
    features: ['Students', 'Teachers', 'Attendance', 'Fees', 'Exams', 'Timetable', 'Notices', 'Reports'],
    viewUrl: 'https://trinetraaisolutions.com/free-tools/school-crm',
    color: '#10B981',
    icon: 'graduation-cap',
    dashboardModules: ['Students', 'Attendance', 'Fees', 'Exams', 'Teachers', 'Timetable'],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing CRM',
    description: 'Leads, Clients, Projects, Content, SEO, Ads & Billing — Sab Ek Jagah.',
    features: ['Leads', 'Clients', 'Projects', 'Content', 'SEO', 'Campaigns', 'Billing', 'Team'],
    viewUrl: 'https://trinetraaisolutions.com/free-tools/digital-marketing-crm',
    color: '#8B5CF6',
    icon: 'megaphone',
    dashboardModules: ['Clients', 'Projects', 'Content', 'SEO', 'Campaigns', 'Billing'],
  },
  {
    id: 'real-estate',
    name: 'Real Estate CRM',
    description: 'Projects, Properties, Leads, Site Visits, Bookings & Payments — One Dashboard.',
    features: ['Projects', 'Properties / Units', 'Leads', 'Site Visits', 'Bookings', 'Payments', 'Customers', 'Team'],
    viewUrl: 'https://trinetraaisolutions.com/free-tools/real-estate-crm',
    color: '#3B82F6',
    icon: 'building-2',
    dashboardModules: ['Projects', 'Units', 'Leads', 'Site Visits', 'Bookings', 'Payments'],
  },
] as const;

export type CrmId = (typeof CRMS)[number]['id'];

export const CRM_OPTIONS = CRMS.map((c) => ({ value: c.id, label: c.name }));

export const PRICE = 299;

export const FAQS = [
  {
    q: 'What is included in the ₹299 first month?',
    a: 'You get full access to your chosen industry-specific CRM with all features — lead management, follow-ups, team management, notifications, reports and more. This is your first month\'s subscription to get started and explore the CRM.',
  },
  {
    q: 'When will I receive my CRM login?',
    a: 'After successful payment, our team will create your CRM account and send your Login ID & Password within 24 hours to your registered email and WhatsApp number.',
  },
  {
    q: 'How does the payment process work?',
    a: 'You fill the form with your business details, click "Proceed to Payment", and you will be redirected to PayU\'s secure payment page. Complete the ₹299 payment and you will receive a confirmation.',
  },
  {
    q: 'Is the payment secure?',
    a: 'Yes, all payments are processed through PayU, one of India\'s trusted payment gateways. Your card/bank details are never stored on our servers.',
  },
  {
    q: 'Which CRM should I choose?',
    a: 'Choose the CRM that matches your business type — Consultancy CRM for recruitment/staffing, Solar CRM for solar businesses, School CRM for educational institutions, Digital Marketing CRM for agencies, or Real Estate CRM for property businesses.',
  },
  {
    q: 'Can I see the CRM before purchasing?',
    a: 'Yes! Each CRM card has a "VIEW" button that takes you to the live CRM demo page where you can explore the interface and features.',
  },
  {
    q: 'What happens after I make the payment?',
    a: 'Once your payment is verified, our team receives the order notification, creates your CRM account, and sends your Login ID & Password within 24 hours.',
  },
  {
    q: 'What happens after the first month?',
    a: 'After the first month, your CRM subscription continues at the standard monthly rate. You will be informed about the ongoing pricing before your first month ends.',
  },
  {
    q: 'Can I add my team members?',
    a: 'Yes, all our CRMs support team management. You can add team members, assign roles, and manage work distribution from within the CRM.',
  },
  {
    q: 'Do you provide onboarding support?',
    a: 'Yes, our team assists you with the initial setup and ensures you are comfortable using the CRM for your business operations.',
  },
];

export const NAV_LINKS = [
  { label: 'CRM Solutions', href: '#crm-solutions' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'FAQs', href: '#faqs' },
] as const;
