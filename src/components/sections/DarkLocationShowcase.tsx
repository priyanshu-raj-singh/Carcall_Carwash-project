"use client";

import React from "react";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import { ArrowRight, Home, Building2, Briefcase, CheckCircle2 } from "lucide-react";

export default function DarkLocationShowcase() {
  const { openSubscribeModal } = useCarCall();

  const locations = [
    {
      id: "home",
      title: "At your home",
      subtitle: "Driveway hand wash and shine",
      image: "/images/carcall-we-come-to-you.jpg",
      icon: Home,
      tag: "Driveways & Villas",
    },
    {
      id: "apartment",
      title: "At your apartment",
      subtitle: "Basement & podium friendly",
      image: "/images/carcall-fresh-again.jpg",
      icon: Building2,
      tag: "Gated Communities",
    },
    {
      id: "office",
      title: "At your office",
      subtitle: "Cleaned while you work",
      image: "/images/carcall-hand-wash.jpg",
      icon: Briefcase,
      tag: "Tech Parks & Corporates",
    },
  ];

  return (
    <section className="py-5 sm:py-7 bg-[#070d18] text-white relative overflow-hidden border-t border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading and Call to Action */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 bg-red-600 rounded-full" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-red-500">
                Versatile Service
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              We come <br />
              <span className="text-red-500">to you.</span>
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
              You don&apos;t have to drive anywhere or wait in long queues. Our mobile team brings everything needed directly to your home, apartment basement or corporate office.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openSubscribeModal()}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-full shadow-lg shadow-red-600/30 flex items-center gap-2.5 group cursor-pointer transition-all active:scale-95"
              >
                <span>Book a Wash</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Vertical Image Cards Matching Reference Screenshot */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {locations.map((loc) => {
                const Icon = loc.icon;
                return (
                  <div
                    key={loc.id}
                    onClick={() => openSubscribeModal()}
                    className="group relative rounded-3xl overflow-hidden aspect-[16/11] xs:aspect-[4/5] sm:aspect-[3/4.5] border border-slate-800 hover:border-red-500/60 shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-end p-5 bg-slate-900"
                  >
                    {/* Background Image */}
                    <Image
                      src={loc.image}
                      alt={loc.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                    {/* Content on bottom */}
                    <div className="relative z-10 space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-slate-200">
                        <Icon className="w-3 h-3 text-red-400" />
                        <span>{loc.tag}</span>
                      </div>

                      <div className="space-y-0.5">
                        <h3 className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors">
                          {loc.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {loc.subtitle}
                        </p>
                      </div>

                      <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-red-400 group-hover:text-red-300">
                        <span>Select location</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
