"use client";

import React from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  QrCode,
  Shield,
  EyeOff,
  Wrench,
  Car,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

export default function QrIdentitySection() {
  const { setCurrentView } = useCarCall();

  const scanTypes = [
    {
      role: "Public / Bystander Scan",
      badge: "Zero Phone Leak",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: EyeOff,
      description: "Anyone can notify you about blocked parking, open windows, or headlights without ever seeing your personal mobile number.",
      actionText: "Try Public Scan Demo",
      view: "qr-scan",
    },
    {
      role: "Authenticated Cleaner Scan",
      badge: "Authorized Workflow",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      icon: Wrench,
      description: "Cleaner scans the sticker to instantly verify vehicle identity, auto-load that day's service checklist, and upload photo proof.",
      actionText: "Open Cleaner PWA",
      view: "cleaner",
    },
    {
      role: "Customer / Owner Scan",
      badge: "Live Logbook",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Car,
      description: "Direct access to 'My Car' portal: view upcoming visits, used entitlements, digital service history, and inspection photos.",
      actionText: "Open My Car Portal",
      view: "mycar",
    },
  ];

  return (
    <section id="qr-safety" className="py-5 sm:py-7 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7 space-y-2 sm:space-y-2.5">


          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            One Windshield QR Sticker. <br />
            <span className="text-red-500">Three Intelligent Workflows.</span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            The CarCall QR sticker encodes only a secure opaque token. It never exposes your private phone number to strangers, while empowering authorized technicians to record verified digital maintenance records.
          </p>
        </div>

        {/* 3 Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scanTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-5 hover:border-red-500/40 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase">
                    {item.role}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setCurrentView(item.view as any)}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
