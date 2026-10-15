"use client";

import React from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Camera,
} from "lucide-react";

export default function HeroPlanCadence() {
  const { openSubscribeModal } = useCarCall();

  const cadenceSteps = [
    {
      week: "Week 1",
      service: "Exterior + Interior",
      badge: "Deep Start",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      description: "Full waterless polymer exterior wash + high-suction cabin vacuuming, dashboard & console wipe down.",
    },
    {
      week: "Week 2",
      service: "Exterior Maintenance",
      badge: "Gloss Touch",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      description: "Waterless dirt lift, streak-free glass & windshield wipe, tyre shine & alloy brake dust removal.",
    },
    {
      week: "Week 3",
      service: "Exterior + Interior",
      badge: "Mid-Month Clean",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      description: "Thorough exterior shine + seat crevices vacuumed, 7D floor mats cleaned, and crumb removal.",
    },
    {
      week: "Week 4",
      service: "Exterior Maintenance",
      badge: "Weekend Ready",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      description: "Full body waterless wash, crystal clean mirrors & UV sidewall protection dressing.",
    },
    {
      week: "Flexible +1",
      service: "Mid-Month Exterior",
      badge: "Bonus Entitlement",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Scheduled during high dust or post-commute weekdays to maintain constant showroom gloss.",
    },
    {
      week: "Flexible +2",
      service: "Pre-Weekend Exterior",
      badge: "Bonus Entitlement",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Second flexible exterior visit to ensure your car is spotless for weekend family outings.",
    },
  ];

  return (
    <section id="hero-cadence" className="py-4 sm:py-6 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5 space-y-2 sm:space-y-2.5">


          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
            CarCall Care: <br />
            <span className="text-red-600">6 Monthly Entitlements Cadence.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            “My car is regularly maintained, and I know every time it was serviced.” <br />
            Our scheduling engine tracks visits at the entitlement level, guaranteeing 6 predictable maintenance visits per billing cycle.
          </p>
        </div>

        {/* 6 Entitlements Cadence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {cadenceSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    {step.week}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${step.badgeColor}`}
                  >
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-950">
                  {step.service}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span className="flex items-center gap-1 text-emerald-700">
                  <Camera className="w-3.5 h-3.5" />
                  <span>2–3 Photos Uploaded</span>
                </span>
                <span className="font-bold text-slate-700">Entitlement #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA & Policy reassurance */}
        <div className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">
              Protected by CarCall's Missed Service Credit Policy
            </h4>
            <p className="text-xs text-slate-400">
              Weather hold or inaccessible gate? We never silently delete jobs. A replacement credit is issued automatically.
            </p>
          </div>

          <button
            onClick={() => openSubscribeModal()}
            className="carcall-btn-primary px-6 py-3 rounded-xl font-bold text-xs shrink-0 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Subscribe to Care Plan (₹499)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
