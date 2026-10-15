"use client";

import React, { useState } from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  SubscriptionPlan,
  ADD_ON_SERVICES,
} from "@/data/carwashData";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Car,
  Tag,
  Star,
  PlusCircle,
} from "lucide-react";

export default function SubscriptionPlansSection() {
  const { subscriptionPlans, openSubscribeModal, setCurrentView } = useCarCall();
  // Standard recurring pricing active

  return (
    <section id="pricing" className="py-4 sm:py-6 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7 space-y-2 sm:space-y-2.5">


          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
            Predictable Monthly Plans. <br />
            <span className="text-red-600">Zero One-Off Hassle.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Choose your monthly maintenance frequency. Each plan guarantees a defined number of scheduled waterless exterior and basic interior vacuum visits with persistent digital records.
          </p>


        </div>

        {/* 5-Tier Subscription Cards Grid */}
        <div className="flex overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 gap-4 lg:gap-3.5 items-stretch w-max lg:w-full snap-x snap-mandatory lg:snap-none">
          {subscriptionPlans.map((plan) => {
            const isHero = plan.isHero;
            const displayPrice = plan.pricePerMonth;

            return (
              <div
                key={plan.id}
                className={`w-[82vw] max-w-[300px] xs:w-[280px] sm:w-[310px] lg:w-auto shrink-0 lg:shrink snap-start rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 relative ${
                  isHero
                    ? "bg-gradient-to-b from-red-50/70 via-white to-red-50/30 border-red-500 shadow-xl ring-2 ring-red-500/20 lg:-translate-y-2 z-20"
                    : "bg-white hover:bg-slate-50/50 border-slate-200 shadow-xs hover:border-slate-300 z-10"
                }`}
              >
                {/* Hero Plan Badge */}
                {isHero && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1 whitespace-nowrap">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Main Hero Plan</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      {plan.positioning}
                    </span>
                    <h3 className="text-xl font-black text-slate-950 uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-950">
                        ₹{displayPrice}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        /month
                      </span>
                    </div>

                    
                  </div>

                  {/* Visit Entitlements Breakdown */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Total Visits:</span>
                      <span className="text-red-600 font-black">{plan.totalVisits} / mo</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>• Waterless Exterior:</span>
                      <span className="font-semibold">{plan.exteriorVisits}×</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>• Basic Interior:</span>
                      <span className="font-semibold">{plan.interiorVisits}×</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-1">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-5">
                  <button
                    onClick={() => openSubscribeModal(plan)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isHero
                        ? "carcall-btn-primary shadow-md"
                        : "bg-slate-900 hover:bg-red-600 text-white"
                    }`}
                  >
                    <span>Subscribe {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Separately Priced Add-Ons Section Teaser (PRD Section 3.3) */}
        <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                Specialized Add-On Care
              </span>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                Explicit Exclusions from Routine Subscription (Available as Add-Ons)
              </h3>
              <p className="text-xs text-slate-600">
                To keep recurring maintenance fast, standardized and scalable, deep restoration is priced separately.
              </p>
            </div>

            <button
              onClick={() => setCurrentView("mycar")}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold shrink-0 cursor-pointer shadow-2xs"
            >
              Order Add-Ons in My Car →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            {ADD_ON_SERVICES.map((addon) => (
              <div
                key={addon.id}
                className="bg-white p-3 rounded-xl border border-slate-200 text-left space-y-1 shadow-2xs"
              >
                <span className="text-xs font-black text-red-600 block">
                  {addon.indicativePrice}
                </span>
                <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                  {addon.name}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-2">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
