"use client";

import React from "react";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PreFooterDarkBanner() {
  const { openSubscribeModal } = useCarCall();

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-[260px] sm:min-h-[300px] flex items-center">
      {/* Background Cinematic Image */}
      <Image
        src="/images/carcall-more-foam.jpg"
        alt="CarCall More Foam A Cleaner Tomorrow"
        fill
        className="object-cover object-center opacity-60"
        sizes="100vw"
        priority
      />

      {/* Gradient Overlays for optimal text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-l from-red-950/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 relative z-10 w-full">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 bg-red-600 rounded-full" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-red-500">
              A Clean Car, A Better Life
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              Clean car. <br />
              <span className="text-red-500">Zero hassle.</span>
            </h2>
            <p className="text-base sm:text-xl font-bold text-slate-300">
              Get back your sundays.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => openSubscribeModal()}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-7 py-3.5 sm:py-4 rounded-full shadow-xl shadow-red-600/40 flex items-center justify-center gap-2.5 group cursor-pointer transition-all active:scale-95"
            >
              <span>Book a Wash</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
