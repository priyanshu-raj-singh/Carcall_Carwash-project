"use client";

import React, { useState } from "react";
import Image from "next/image";
import HeroBeforeAfterSlider from "@/components/sections/HeroBeforeAfterSlider";
import { useCarCall } from "@/context/CarCallContext";
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Sparkles,
  Home,
  Building2,
  Briefcase
} from "lucide-react";
import { CARCALL_CONTACT } from "@/data/carwashData";

export default function Hero() {
  const { openSubscribeModal, setCurrentView } = useCarCall();
  const [activeLocation, setActiveLocation] = useState<"home" | "apartment" | "office">("apartment");

  return (
    <section className="relative pt-3 pb-4 sm:pt-5 sm:pb-5 md:pt-6 md:pb-6 overflow-hidden bg-white">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[500px] bg-red-600/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-20 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-blue-600/5 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Headlines, Trust Bullets, CTAs & Location Pills (Matching Reference) */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-4 sm:space-y-6">
            {/* Overline Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 bg-red-600 rounded-full" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-red-600">
                Premium Doorstep Car Wash & Maintenance
              </span>
            </div>

            {/* Main Bold Headline Matching Reference */}
            <div className="space-y-1">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-950 uppercase leading-[1.05]">
                Your car. <br />
                <span className="text-red-600">We come</span> to you.
              </h1>
              <p className="text-base sm:text-xl font-bold text-slate-700 leading-snug pt-1">
                Professional recurring car care at your home, apartment or office.
              </p>
            </div>

            {/* 3 Horizontal Trust Bullets Matching Reference */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-slate-700 pt-0.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Trained Professionals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eco-Friendly Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                <span>Premium Gloss Finish</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
              <button
                onClick={() => openSubscribeModal()}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-full shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 group cursor-pointer transition-all active:scale-95"
              >
                <span>Book a Wash</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              <button
                onClick={() => setCurrentView("mycar")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-6 py-3.5 sm:py-4 rounded-full transition-colors cursor-pointer border border-slate-200"
              >
                Explore 'My Car' Portal
              </button>
            </div>

            {/* 3 Location Quick Tabs Matching Reference */}
            <div className="pt-2 w-full">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
                <button
                  onClick={() => setActiveLocation("home")}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    activeLocation === "home"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Home className={`w-4 h-4 ${activeLocation === "home" ? "text-red-400" : "text-slate-600"}`} />
                  <span className="text-xs font-bold">Home</span>
                </button>

                <button
                  onClick={() => setActiveLocation("apartment")}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    activeLocation === "apartment"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${activeLocation === "apartment" ? "text-red-400" : "text-slate-600"}`} />
                  <span className="text-xs font-bold">Apartment</span>
                </button>

                <button
                  onClick={() => setActiveLocation("office")}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    activeLocation === "office"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Briefcase className={`w-4 h-4 ${activeLocation === "office" ? "text-red-400" : "text-slate-600"}`} />
                  <span className="text-xs font-bold">Office</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Genuinely Interactive Before/After Comparison Slider (Size reduced 8–12%) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[430px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[500px] mx-auto">
              <HeroBeforeAfterSlider
                beforeImage="/images/hero-slider-before.jpg"
                afterImage="/images/hero-slider-after.jpg"
                beforeLabel="Before / Dusty"
                afterLabel="After / Clean"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
