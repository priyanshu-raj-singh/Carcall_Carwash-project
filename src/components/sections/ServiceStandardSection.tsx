"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EXTERIOR_STANDARDS, INTERIOR_STANDARDS } from "@/data/carwashData";
import {
  Check,
  ShieldCheck,
  Droplets,
  Sparkles,
  Camera,
  Car,
  Layers,
  XCircle,
} from "lucide-react";

export default function ServiceStandardSection() {
  const [activeTab, setActiveTab] = useState<"exterior" | "interior">("exterior");

  return (
    <section id="services" className="py-4 sm:py-6 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7 space-y-2 sm:space-y-2.5">


          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
            Standardized Maintenance. <br />
            <span className="text-red-600">Zero Inconsistent Quality.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Every CarCall technician follows an identical, audited checklist. Low water footprint, zero swirl scratches, and digital photo verification every time.
          </p>

          {/* Toggle between Exterior & Interior standards */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex bg-slate-200/80 p-1.5 rounded-xl gap-1">
              <button
                onClick={() => setActiveTab("exterior")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "exterior"
                    ? "bg-white text-slate-950 shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Exterior Routine
              </button>
              <button
                onClick={() => setActiveTab("interior")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "interior"
                    ? "bg-white text-slate-950 shadow-xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Basic Interior Routine
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] sm:aspect-[4/3] bg-slate-900">
              <Image
                src={
                  activeTab === "exterior"
                    ? "/images/carcall-hand-wash.jpg"
                    : "/images/carcall-fresh-again.jpg"
                }
                alt={activeTab === "exterior" ? "Exterior Waterless Cleaning" : "Interior Basic Vacuuming"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75" />

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-400 block">
                  {activeTab === "exterior" ? "Eco-Polymer Waterless" : "High-Suction Extraction"}
                </span>
                <p className="text-sm font-bold">
                  {activeTab === "exterior"
                    ? "High-lubricity wash lifts road grime without water puddles."
                    : "Floor mats lifted, deep vacuumed and anti-static console wipe."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Standard Checklist Items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(activeTab === "exterior" ? EXTERIOR_STANDARDS : INTERIOR_STANDARDS).map(
              (item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-red-300 hover:shadow-xs transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-8">
                    {item.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
