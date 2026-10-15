"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Sparkles,
  Building2,
  Droplets,
  ShieldCheck,
  Car,
  AlertTriangle,
  Gem,
  ShieldAlert,
  CheckCircle2,
  QrCode,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CAR_CARE_SCENARIOS } from "@/data/carwashData";

interface RealUseCasesProps {
  onOpenBooking: () => void;
}

export default function RealUseCases({ onOpenBooking }: RealUseCasesProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll and swipe states for mobile/tablet
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll boundary to update nav button states
  const updateScrollBounds = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollBounds();
    el.addEventListener("scroll", updateScrollBounds, { passive: true });
    window.addEventListener("resize", updateScrollBounds);
    return () => {
      el.removeEventListener("scroll", updateScrollBounds);
      window.removeEventListener("resize", updateScrollBounds);
    };
  }, [updateScrollBounds]);

  // Smooth arrow scrolling for tablet & mobile
  const scrollInDirection = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardEl = scrollRef.current.querySelector<HTMLElement>("[data-card-item]");
    const step = cardEl ? cardEl.offsetWidth + 14 : 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  // Scroll directly to a specific card when clicked or activeTab changed
  const scrollToCard = (index: number) => {
    setActiveTab(index);
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll<HTMLElement>("[data-card-item]");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Icon mapping for scenarios
  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 transition-transform duration-300 group-hover:scale-110" />;
      case "Building2":
        return <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />;
      case "Droplets":
        return <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 transition-transform duration-300 group-hover:scale-110" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />;
      case "Car":
        return <Car className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 transition-transform duration-300 group-hover:scale-110" />;
      case "AlertTriangle":
        return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 transition-transform duration-300 group-hover:scale-110" />;
      case "Gem":
        return <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 transition-transform duration-300 group-hover:scale-110" />;
      case "ShieldAlert":
      default:
        return <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 transition-transform duration-300 group-hover:scale-110" />;
    }
  };

  const activeScenario = CAR_CARE_SCENARIOS[activeTab] || CAR_CARE_SCENARIOS[0];

  return (
    <section id="scenarios" className="py-5 sm:py-7 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-2 sm:space-y-2.5">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase leading-tight">
            When Does Your Car <br />
            <span className="text-red-600">Need CarCall Doorstep Care?</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base lg:text-lg leading-relaxed">
            From abrasive daily commute dust and apartment basement cement powder to muddy monsoon splashes
            and stubborn interior spills—here is how CarCall delivers showroom cleanliness directly to your parking bay:
          </p>
        </div>

        {/* Tablet / Mobile Navigation Header Controls */}
        <div className="flex lg:hidden items-center justify-between gap-2 mb-3 px-0.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Select Scenario ({activeTab + 1}/5)</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollInDirection("left")}
              disabled={!canScrollLeft}
              className="w-8 h-8 rounded-full border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition-all cursor-pointer min-h-[32px] min-w-[32px]"
              aria-label="Previous scenario"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollInDirection("right")}
              disabled={!canScrollRight}
              className="w-8 h-8 rounded-full border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition-all cursor-pointer min-h-[32px] min-w-[32px]"
              aria-label="Next scenario"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Cards Row Container:
            - Desktop: Strict 1 single horizontal row (5 equal columns via lg:grid-cols-5)
            - Tablet: Smooth horizontal carousel
            - Mobile: Swipeable horizontal carousel (one card with peek of next) */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          role="tablist"
          aria-label="When Does Your Car Need Doorstep Care scenarios"
          className="w-full overflow-x-auto pb-3.5 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none cursor-grab active:cursor-grabbing lg:cursor-default snap-x snap-mandatory lg:snap-none"
        >
          <div className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-2.5 xl:gap-3.5 w-max lg:w-full min-w-0">
            {CAR_CARE_SCENARIOS.map((sc, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={sc.id}
                  data-card-item
                  role="tab"
                  id={`scenario-tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls={`scenario-panel-${idx}`}
                  tabIndex={0}
                  onClick={() => {
                    if (!hasDragged) {
                      scrollToCard(idx);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollToCard(idx);
                    }
                  }}
                  className={`w-[78vw] max-w-[280px] xs:w-[260px] sm:w-[280px] lg:w-auto shrink-0 lg:shrink snap-start p-3.5 xs:p-4 lg:p-3 xl:p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isActive
                      ? "bg-red-50/95 border-red-500 shadow-lg ring-2 ring-red-500/20 -translate-y-1 lg:-translate-y-1"
                      : "bg-slate-50/80 hover:bg-white border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 active:scale-[0.99]"
                  }`}
                >
                  <div className="space-y-2.5 lg:space-y-2 xl:space-y-2.5">
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <div className={`p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs shrink-0 transition-transform duration-300 ${isActive ? "scale-105 border-red-200" : "group-hover:scale-105"}`}>
                        {getScenarioIcon(sc.iconName)}
                      </div>
                      <span className={`text-[9px] xl:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border truncate max-w-[110px] xl:max-w-none transition-colors ${sc.badgeColor}`}>
                        {sc.category}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-sm xs:text-sm lg:text-[13px] xl:text-sm font-black text-slate-950 tracking-tight leading-snug line-clamp-2 min-h-[36px] lg:min-h-[34px] xl:min-h-[38px] flex items-center">
                      {sc.title}
                    </h3>

                    {/* Card Situation Description */}
                    <p className="text-[11px] lg:text-[11px] xl:text-xs text-slate-500 leading-relaxed line-clamp-3 min-h-[46px] lg:min-h-[46px] xl:min-h-[50px]">
                      {sc.situation}
                    </p>
                  </div>

                  {/* Bottom Row: Solution Number & Status */}
                  <div className="pt-2.5 border-t border-slate-200/70 mt-2.5 flex items-center justify-between text-[11px] lg:text-[10px] xl:text-[11px]">
                    <span className="font-black text-red-600">Care Solution #{idx + 1}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-200/60"
                    }`}>
                      {isActive ? "Viewing" : "Explore"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Pagination Dots */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-3 mb-1">
          {CAR_CARE_SCENARIOS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === i ? "w-6 bg-red-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to scenario ${i + 1}`}
            />
          ))}
        </div>

        {/* Detailed Spotlight on the Active Scenario */}
        <div
          id={`scenario-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`scenario-tab-${activeTab}`}
          className="mt-4 sm:mt-6 bg-gradient-to-br from-slate-900 via-[#0b1a3d] to-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 lg:p-10 shadow-xl border border-slate-800 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-500/30 px-2.5 py-1 rounded-full">
                  Scenario #{activeTab + 1}: {activeScenario.title}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400">• Professional Doorstep Treatment</span>
              </div>

              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight leading-snug">
                {activeScenario.subtitle}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p>
                  <strong className="text-white">The Challenge:</strong> {activeScenario.situation}
                </p>
                <p>
                  <strong className="text-white">How CarCall Solves It:</strong> {activeScenario.howCarCallHelps}
                </p>
              </div>

              <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{activeScenario.stat}</span>
              </div>
            </div>

            {/* Smart Addon: Dual QR Sticker Synergy */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/15 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                <QrCode className="w-4 h-4 text-red-400 shrink-0" />
                <span>Smart Car Protection Add-On</span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white">
                Protect Your Clean Car from Parking Scratches
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Add CarCall&apos;s dual windshield QR stickers to your wash. Neighbors scan to send instant
                WhatsApp alerts if your car is blocked or bumped—keeping your phone number 100% private.
              </p>

              <button
                onClick={onOpenBooking}
                className="carcall-btn-primary w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[46px] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book Doorstep Wash & Detailing</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Feature Badges from CarCall Service Protocol */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
            <h5 className="text-xs sm:text-sm font-bold text-slate-900">Zero Swirl Marks</h5>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Two-bucket microfiber wash</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
            <h5 className="text-xs sm:text-sm font-bold text-slate-900">100% Self-Sufficient</h5>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">We bring soft water & power</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
            <h5 className="text-xs sm:text-sm font-bold text-slate-900">Apartment Compliant</h5>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Zero basement puddles</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
            <h5 className="text-xs sm:text-sm font-bold text-slate-900">Pay After Inspection</h5>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Cash on Delivery & UPI</p>
          </div>
        </div>
      </div>
    </section>
  );
}
