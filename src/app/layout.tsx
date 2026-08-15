import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trinetraaisolutions.com'),
  title: "Industry-Specific CRM — First Month ₹299 | Trinetra AI",
  description:
    "Manage your business with an industry-specific CRM for leads, customers, teams, follow-ups and daily operations. Choose your CRM and start your first month for ₹299.",
  keywords: [
    "CRM",
    "industry CRM",
    "consultancy CRM",
    "solar CRM",
    "school CRM",
    "digital marketing CRM",
    "real estate CRM",
    "lead management",
    "Trinetra AI",
  ],
  authors: [{ name: "Trinetra AI Solutions" }],
  icons: {
    icon: "/trinetra-logo.jpeg",
  },
  openGraph: {
    title: "Industry-Specific CRM — First Month ₹299 | Trinetra AI",
    description:
      "Manage your business with an industry-specific CRM. Choose Consultancy, Solar, School, Digital Marketing or Real Estate CRM. First month ₹299 only.",
    url: "https://trinetraaisolutions.com",
    siteName: "Trinetra AI Solutions",
    type: "website",
    images: [
      {
        url: "/trinetra-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Trinetra AI CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry-Specific CRM — First Month ₹299 | Trinetra AI",
    description:
      "Manage your business with an industry-specific CRM. First month ₹299 only.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta Pixel - Replace PIXEL_ID with your actual Meta Pixel ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ""}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
