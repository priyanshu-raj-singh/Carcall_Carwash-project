"use client";

import React from "react";
import { useCarCall } from "@/context/CarCallContext";
import { Car, Sparkles, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function StepsProcessSection() {
  const { openSubscribeModal } = useCarCall();

  const steps = [
    {
      number: "01",
      title: "Select Maintenance Plan",
      subtitle: "Basic (₹299), Plus (₹399), Hero Care ⭐ (₹499) or Pro/Premium",
      icon: Car,
    },
    {
      number: "02",
      title: "Mobile OTP and Vehicle Info",
      subtitle: "Instant WhatsApp OTP, link car registration and parking bay",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Gated Society Cluster",
      subtitle: "Assigned to dedicated North Bengaluru society routes",
      icon: MapPin,
    },
    {
      number: "04",
      title: "Digital Proof and Photos",
      subtitle: "Cleaner QR scan, verified checklist and 2–3 inspection photos",
      icon: Calendar,
    },
  ];

  return (
    <section className="py-4 sm:py-6 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 bg-red-600 rounded-full" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-slate-500">
                Simple & Fast
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Book a car wash in <span className="text-red-600">4 simple steps.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xs font-medium">
            Prompt clean, easy and hassle-free. Pick your monthly plan in under 60 seconds.
          </p>
        </div>

        {/* 4 Steps Grid Matching Reference */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                onClick={() => openSubscribeModal()}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-red-400 hover:shadow-lg transition-all duration-300 relative group cursor-pointer flex flex-col justify-between space-y-4"
              >
                {/* Red Circular Number Badge (Top-Left) */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:scale-105 group-hover:border-red-200 transition-transform">
                    <Icon className="w-5 h-5 text-slate-800 group-hover:text-red-600 transition-colors" />
                  </div>

                  <span className="w-7 h-7 rounded-full bg-red-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                    {st.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-950 group-hover:text-red-600 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {st.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-red-600">
                  <span>Configure</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
