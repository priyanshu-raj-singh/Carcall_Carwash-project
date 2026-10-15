"use client";

import React from "react";
import { CarCallProvider, useCarCall } from "@/context/CarCallContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturePillarsBar from "@/components/sections/FeaturePillarsBar";
import StepsProcessSection from "@/components/sections/StepsProcessSection";
import HeroPlanCadence from "@/components/sections/HeroPlanCadence";
import InteractiveCarShowcase from "@/components/sections/InteractiveCarShowcase";
import SubscriptionPlansSection from "@/components/sections/SubscriptionPlansSection";
import ServiceStandardSection from "@/components/sections/ServiceStandardSection";
import QrIdentitySection from "@/components/sections/QrIdentitySection";
import RealUseCases from "@/components/sections/RealUseCases";
import SocietyDensitySection from "@/components/sections/SocietyDensitySection";
import DarkLocationShowcase from "@/components/sections/DarkLocationShowcase";
import QuickBookingBar from "@/components/sections/QuickBookingBar";
import AboutSection from "@/components/sections/AboutSection";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import PreFooterDarkBanner from "@/components/sections/PreFooterDarkBanner";

import CustomerPortal from "@/components/portals/CustomerPortal";
import CleanerPWA from "@/components/portals/CleanerPWA";
import SupervisorAdminDashboard from "@/components/portals/SupervisorAdminDashboard";
import PublicQrScanView from "@/components/portals/PublicQrScanView";
import SubscribeModal from "@/components/portals/SubscribeModal";
import WhatsAppNotificationModal from "@/components/portals/WhatsAppNotificationModal";

import { MessageCircle, CheckCircle2 } from "lucide-react";
import { CARCALL_CONTACT } from "@/data/carwashData";

function AppContent() {
  const { currentView, openSubscribeModal, toastMessage } = useCarCall();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8] text-slate-900 selection:bg-red-600 selection:text-white relative overflow-x-hidden font-sans">

      {/* RENDER VIEW BASED ON CURRENT ACTIVE PORTAL */}
      {currentView === "landing" && (
        <>
          <Navbar />
          <main className="flex-1">
            {/* 1. Hero Section (Your Car. We come to you. Doorstep Vehicle Care) */}
            <Hero />

            {/* 2. 5 Core Feature Pillars (Eco-Friendly, Zero-Swirl, Gloss, Flexible, QR) */}
            <FeaturePillarsBar />

            {/* 3. Customer Journey (4 Simple Steps) */}
            <StepsProcessSection />

            {/* 4. Hero Plan Cadence (CarCall Care ⭐ ₹499/mo, 6 Visits) */}
            <HeroPlanCadence />

            {/* 5. Interactive Before/After Transformation & Package Highlights */}
            <InteractiveCarShowcase />

            {/* 6. Complete 5-Tier Subscription Plans & Add-on Marketplace */}
            <SubscriptionPlansSection />

            {/* 7. Standardized Service Checklists (Exterior & Interior) */}
            <ServiceStandardSection />

            {/* 8. Windshield QR Architecture (Public, Cleaner, Owner) */}
            <QrIdentitySection />

            {/* 9. carcall.in Real-world Vehicle Protection Scenarios */}
            <RealUseCases onOpenBooking={() => openSubscribeModal()} />

            {/* 10. Society Management & Density Engine (North Bengaluru) */}
            <SocietyDensitySection />

            {/* 11. Location Showcase (Home, Gated Society Basements, Offices) */}
            <DarkLocationShowcase />

            {/* 12. Instant Society & Plan Booking Configurator */}
            <QuickBookingBar />

            {/* 13. About CarCall Cleaning */}
            <AboutSection />

            {/* 14. Customer Testimonials */}
            <Testimonials />

            {/* 15. Comprehensive FAQs */}
            <div id="faqs">
              <FaqSection />
            </div>

            {/* 16. Contact & WhatsApp Support */}
            <ContactSection />

            {/* 17. Cinematic Pre-Footer Dark Banner */}
            <PreFooterDarkBanner />
          </main>
          <Footer />
        </>
      )}

      {currentView === "mycar" && (
        <>
          <Navbar />
          <main className="flex-1">
            <CustomerPortal />
          </main>
          <Footer />
        </>
      )}

      {currentView === "cleaner" && (
        <main className="flex-1 bg-slate-100">
          <CleanerPWA />
        </main>
      )}

      {currentView === "supervisor" && (
        <>
          <Navbar />
          <main className="flex-1">
            <SupervisorAdminDashboard />
          </main>
          <Footer />
        </>
      )}

      {currentView === "qr-scan" && (
        <main className="flex-1 bg-slate-900">
          <PublicQrScanView />
        </main>
      )}

      {/* Floating WhatsApp Action */}
      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        <a
          href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=Hi%20CarCall,%20I%20have%20an%20inquiry%20about%20CarCall%20Cleaning`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25d366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all border-2 border-white cursor-pointer min-h-[48px] min-w-[48px]"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
      </div>

      {/* Global Subscribe 5-Step Modal */}
      <SubscribeModal />

      {/* Global WhatsApp Simulated Notification Stream */}
      <WhatsAppNotificationModal />

      {/* Global Success / Alert Toast Overlay */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function CarWashLandingPage() {
  return (
    <CarCallProvider>
      <AppContent />
    </CarCallProvider>
  );
}
