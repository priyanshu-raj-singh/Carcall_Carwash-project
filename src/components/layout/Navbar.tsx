"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import {
  Sparkles,
  Menu,
  X,
  Car,
  Wrench,
  ShieldCheck,
  QrCode,
  ChevronDown,
  Bell,
} from "lucide-react";

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    openSubscribeModal,
    setIsNotificationsModalOpen,
    notifications,
  } = useCarCall();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsMenuOpen, setPortalsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-xl border-b border-slate-200/90 shadow-sm py-2 sm:py-3"
            : "bg-white/95 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
            {/* Left: Official Carcall Logo + Subtitle matching reference */}
            <div
              onClick={() => setCurrentView("landing")}
              className="flex items-center gap-2 group shrink-0 cursor-pointer"
              aria-label="CarCall Cleaning Home"
            >
              <div className="relative h-8 sm:h-9 w-24 sm:w-32 flex items-center transition-transform group-hover:scale-105">
                <Image
                  src="/Carcall-logo.png"
                  alt="CarCall Logo"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 96px, 128px"
                />
              </div>
              <span className="hidden xs:inline-block text-[9px] uppercase font-black tracking-widest text-slate-400 border-l border-slate-300 pl-2">
                CAR WASH
              </span>
            </div>

            {/* Desktop Navigation Links Matching Reference */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
              <button
                onClick={() => setCurrentView("landing")}
                className={`text-xs xl:text-sm font-bold transition-colors py-1 cursor-pointer ${
                  currentView === "landing" ? "text-red-600 font-black" : "text-slate-700 hover:text-red-600"
                }`}
              >
                Home
              </button>

              <a
                href="#pricing"
                onClick={() => setCurrentView("landing")}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
              >
                Wash Packages
              </a>

              <a
                href="#about"
                onClick={() => {
                  setCurrentView("landing");
                  setTimeout(() => {
                    const el = document.getElementById("about");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
              >
                About
              </a>

              <a
                href="#contact"
                onClick={() => {
                  setCurrentView("landing");
                  setTimeout(() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
              >
                Contact
              </a>

              <a
                href="#resources"
                onClick={() => {
                  setCurrentView("landing");
                  setTimeout(() => {
                    const el = document.getElementById("resources");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
              >
                Resources
              </a>

              <a
                href="#support"
                onClick={() => setCurrentView("landing")}
                className="text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
              >
                Support
              </a>

              {/* Portals Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPortalsMenuOpen(!portalsMenuOpen)}
                  className="flex items-center gap-1 text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
                >
                  <span>Interactive Portals</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {portalsMenuOpen && (
                  <div
                    onMouseLeave={() => setPortalsMenuOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-in fade-in"
                  >
                    <button
                      onClick={() => {
                        setCurrentView("mycar");
                        setPortalsMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Car className="w-4 h-4 text-red-600" />
                      <span>Customer 'My Car'</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView("cleaner");
                        setPortalsMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Wrench className="w-4 h-4 text-blue-600" />
                      <span>Cleaner PWA</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView("supervisor");
                        setPortalsMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>Supervisor Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView("qr-scan");
                        setPortalsMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      <span>Windshield QR Scan</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Notification Trigger + Location Pill + Red Book a Wash Pill Button */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* WhatsApp Notification Stream Trigger */}
              <button
                onClick={() => setIsNotificationsModalOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs cursor-pointer transition-colors"
                title="Open simulated WhatsApp notifications"
                aria-label="WhatsApp Notification Stream"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>WhatsApp Stream</span>
                {notifications.length > 0 && (
                  <span className="bg-emerald-500 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Location Pill */}
              <div className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <span className="text-red-600">📍</span>
                <span>North Bengaluru</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>

              {/* Red Pill Button "Book a Wash →" */}
              <button
                onClick={() => openSubscribeModal()}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-5 py-2.5 rounded-full shadow-md shadow-red-600/30 hover:scale-105 active:scale-95 transition-all text-xs flex items-center gap-2 cursor-pointer min-h-[40px]"
              >
                <span>Book a Wash</span>
                <span className="text-white">→</span>
              </button>
            </div>

            {/* Mobile Actions: WhatsApp Bell + Book a Wash + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsNotificationsModalOpen(true)}
                className="relative p-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700"
                aria-label="WhatsApp Notifications"
              >
                <Bell className="w-4 h-4 text-emerald-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => openSubscribeModal()}
                className="bg-red-600 text-white font-black px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-sm"
              >
                <span>Book</span>
                <span>→</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Explore Views
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-left font-bold text-xs text-slate-900"
                >
                  🌐 Landing
                </button>
                <button
                  onClick={() => {
                    setCurrentView("mycar");
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-left font-bold text-xs text-red-700"
                >
                  🚗 My Car
                </button>
                <button
                  onClick={() => {
                    setCurrentView("cleaner");
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-left font-bold text-xs text-blue-700"
                >
                  🧼 Cleaner PWA
                </button>
                <button
                  onClick={() => {
                    setCurrentView("supervisor");
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-left font-bold text-xs text-purple-700"
                >
                  📊 Supervisor Ops
                </button>
                <button
                  onClick={() => {
                    setCurrentView("qr-scan");
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left font-bold text-xs text-emerald-700"
                >
                  📱 QR Scan View
                </button>
                <button
                  onClick={() => {
                    setIsNotificationsModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left font-bold text-xs text-emerald-700"
                >
                  🔔 WhatsApp Stream
                </button>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100 text-xs sm:text-sm font-bold text-slate-800">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                Navigation Links
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="#hero-cadence"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                >
                  6-Visit Cadence
                </a>
                <a
                  href="#pricing"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                >
                  Plans & Pricing
                </a>
                <a
                  href="#scenarios"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                >
                  Doorstep Scenarios
                </a>
                <a
                  href="#societies"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                >
                  Societies
                </a>
                <a
                  href="#reviews"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                >
                  Reviews
                </a>
                <a
                  href="#faqs"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                >
                  FAQs
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setCurrentView("landing");
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors col-span-2"
                >
                  Support & Contact
                </a>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  openSubscribeModal();
                  setMobileMenuOpen(false);
                }}
                className="carcall-btn-primary w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Subscribe to CarCall Care (₹499)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
