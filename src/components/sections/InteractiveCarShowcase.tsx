"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import { Check, Star, ArrowRight, Sparkles } from "lucide-react";

export default function InteractiveCarShowcase() {
  const { subscriptionPlans, openSubscribeModal } = useCarCall();
  const [activeTab, setActiveTab] = useState<"monthly" | "onetime">("monthly");

  // Get the 3 representative plans matching Essential, Premium (Hero), and Luxury
  const basicPlan = subscriptionPlans.find((p) => p.id === "basic") || subscriptionPlans[0];
  const carePlan = subscriptionPlans.find((p) => p.id === "care") || subscriptionPlans[2];
  const luxuryPlan = subscriptionPlans.find((p) => p.id === "premium") || subscriptionPlans[4];

  return (
    <section id="pricing" className="py-4 sm:py-6 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 bg-red-600 rounded-full" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-slate-500">
                Our Wash Packages
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight">
              What does your car need today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-medium">
              Professional cleaning systems designed to keep your car looking showroom new.
            </p>
          </div>

          {/* Filter Pills Matching Reference */}
          <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-full border border-slate-200 gap-1 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === "monthly"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-700 hover:text-slate-950"
              }`}
            >
              MONTHLY PLANS
            </button>
            <button
              onClick={() => setActiveTab("onetime")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === "onetime"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              ONE-TIME WASH
            </button>
          </div>
        </div>

        {/* CarCall Showcase Visual Frame Matching Reference */}
        <div className="relative rounded-3xl bg-slate-50/70 border border-slate-200 p-3 sm:p-5 md:p-6 mb-5 sm:mb-6 flex flex-col items-center justify-center overflow-hidden">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-md w-full max-w-4xl lg:max-w-5xl mx-auto aspect-[16/9] xs:aspect-[18/9] sm:aspect-[2.1/1] md:aspect-[2.35/1] lg:aspect-[1024/410] bg-slate-900">
            <Image
              src="/images/carcall-packages-showcase.png"
              alt="CarCall Professional Doorstep Detailing and Interior Maintenance"
              fill
              priority
              className="object-cover object-[52%_center] sm:object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            />
          </div>
        </div>

        {/* 3 Package Cards Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Essential Wash (Basic) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950 uppercase">
                    Essential Wash
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Basic upkeep for parked cars (2 visits/mo)
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-950">
                    ₹{basicPlan.pricePerMonth}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">/month</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Reliable bi-weekly exterior gloss & dust prevention
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>2× Waterless exterior wash visits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Door jambs & glass cleaning</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Tyre gloss dressing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>2–3 Service inspection photos</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openSubscribeModal(basicPlan)}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>SELECT PACKAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Premium Wash (CarCall Care ⭐ Hero Plan Highlighted Matching Reference) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-red-500 shadow-xl shadow-red-500/10 transition-all flex flex-col justify-between space-y-6 relative md:-translate-y-2">
            {/* Top Ribbon Matching Reference */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-[10px] uppercase px-4 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              <span>MOST POPULAR</span>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950 uppercase">
                    Premium Wash (Care ⭐)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Main recurring plan (6 visits/mo)
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-950">
                    ₹{carePlan.pricePerMonth}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">/month</span>
                </div>
                <p className="text-[11px] text-red-600 font-bold">
                  “My car is regularly maintained, and I know every service.”
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Everything in Essential</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>6× Waterless exterior maintenance visits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>4× Basic cabin vacuums & console wipes</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>High-resolution photo proof on completion</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Automated WhatsApp completion reports</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Missed service credit protection</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openSubscribeModal(carePlan)}
              className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95"
            >
              <span>CHOOSE PREMIUM</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>

          {/* Card 3: Luxury Wash (Premium/Pro) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950 uppercase">
                    Luxury Wash
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Maximum frequency (8 visits/mo)
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-950">
                    ₹{luxuryPlan.pricePerMonth}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">/month</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Twice-a-week showroom gloss & cabin freshness
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Everything in Premium</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>8× Waterless exterior cleaning visits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>8× Basic cabin vacuuming visits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Dedicated senior cleaner assignment</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-red-600 shrink-0" />
                  <span>VIP supervisor audits every 2 weeks</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openSubscribeModal(luxuryPlan)}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>SELECT PACKAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
