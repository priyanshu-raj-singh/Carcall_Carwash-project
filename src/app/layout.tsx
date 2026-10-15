import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://carcall.in"),
  title: "CarCall Cleaning | Recurring Society-Based Vehicle Maintenance & Digital History",
  description:
    "Predictable monthly vehicle care for apartment and gated communities across North Bengaluru. Waterless eco-cleaning, 6-visit recurring cadence, persistent digital service history, and zero-leak windshield QR protection.",
  keywords: [
    "recurring car wash",
    "society car cleaning",
    "apartment car wash bangalore",
    "carcall cleaning",
    "digital service history",
    "waterless car wash",
    "carcall care",
    "north bengaluru car wash",
    "vidyaranyapura car wash",
    "sobha city car cleaning",
    "carcall.in",
  ],
  authors: [{ name: "CarCall Technologies Pvt. Ltd." }],
  openGraph: {
    title: "CarCall Cleaning — Recurring Society-Based Vehicle Maintenance",
    description:
      "Predictable monthly vehicle care, verified cleaner workflows, and persistent digital service history for North Bengaluru apartment communities.",
    url: "https://carcall.in",
    siteName: "CarCall Cleaning",
    images: [
      {
        url: "/images/carcall-we-come-to-you.jpg",
        width: 1200,
        height: 630,
        alt: "CarCall Cleaning Recurring Society-Based Vehicle Maintenance",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#f8f8f8] text-slate-900 antialiased selection:bg-red-600 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
