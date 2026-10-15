"use client";

import React from "react";
import { Leaf, ShieldCheck, Sparkles, CalendarCheck, QrCode } from "lucide-react";

export default function FeaturePillarsBar() {
  const pillars = [
    {
      icon: Leaf,
      title: "Eco-friendly products",
      description: "Waterless formula, safe for paint and environment",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: ShieldCheck,
      title: "Zero-swirl wash",
      description: "Color-coded microfibers prevent clearcoat scratches",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Sparkles,
      title: "Premium finish",
      description: "Showroom gloss, glass clarity & tyre dressing",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: CalendarCheck,
      title: "Flexible scheduling",
      description: "Pause, skip or reschedule anytime with zero penalty",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: QrCode,
      title: "Hassle-free QR",
      description: "Windshield contact with zero phone number leakage",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <section className="py-3.5 sm:py-4 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isLastOnMobile = idx === 4;
            return (
              <div
                key={idx}
                className={`flex flex-col items-start space-y-2 group transition-transform ${
                  isLastOnMobile ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-2xs group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
