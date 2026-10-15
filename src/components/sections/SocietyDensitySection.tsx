"use client";

import React from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  Gift,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function SocietyDensitySection() {
  const { societies, openSubscribeModal } = useCarCall();

  return (
    <section id="societies" className="py-4 sm:py-6 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
            Density Drives Economics. <br />
            <span className="text-blue-600">More Cars = Better Perks.</span>
          </h2>
        </div>

        {/* Societies Row: 1 Single Row on Desktop (5 columns), Swipeable Carousel on Tablet/Mobile */}
        <div className="w-full overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-2.5 xl:gap-3.5 w-max lg:w-full min-w-0">
            {societies.map((soc) => {
              const percent = Math.round((soc.activeCars / soc.milestoneTarget) * 100);
              return (
                <div
                  key={soc.id}
                  className="w-[270px] sm:w-[290px] lg:w-auto shrink-0 lg:shrink p-3.5 sm:p-4 lg:p-3 xl:p-4 rounded-2xl xl:rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3 lg:space-y-2.5 xl:space-y-3.5 h-full"
                >
                  <div className="space-y-2.5 lg:space-y-2 xl:space-y-3">
                    {/* Header: Name, Location, Badge */}
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base lg:text-sm xl:text-base font-black text-slate-950 leading-snug">
                          {soc.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs lg:text-[11px] xl:text-xs text-slate-500 font-semibold mt-0.5">
                          <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                          <span className="truncate">{soc.locality}</span>
                        </div>
                      </div>

                      <span className="text-[11px] lg:text-[10px] xl:text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-xl shrink-0 whitespace-nowrap">
                        {soc.activeCars} Cars
                      </span>
                    </div>

                    {/* Progress Bar towards Milestone */}
                    <div className="space-y-1 pt-0.5">
                      <div className="flex justify-between text-xs lg:text-[11px] xl:text-xs font-bold text-slate-700">
                        <span>Milestone Progress</span>
                        <span className="text-blue-600 font-black">
                          {soc.activeCars} / {soc.milestoneTarget} Cars
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-2 xl:h-2.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>

                      <span className="text-[11px] lg:text-[10px] xl:text-[11px] text-slate-500 block leading-tight min-h-[26px] lg:min-h-[28px]">
                        {soc.milestoneTarget - soc.activeCars > 0
                          ? `${soc.milestoneTarget - soc.activeCars} more cars to unlock community perk`
                          : "🎉 Milestone reached! Benefit applied!"}
                      </span>
                    </div>

                    {/* Unlocked / Upcoming Benefit */}
                    <div className="p-2.5 lg:p-2.5 xl:p-3 rounded-xl lg:rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs min-h-[64px] lg:min-h-[66px] xl:min-h-[72px] flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-[11px] lg:text-[10px] xl:text-[11px] font-bold text-slate-500 uppercase">
                        <Gift className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Community Benefit:</span>
                      </div>
                      <p className="text-xs lg:text-[11px] xl:text-xs font-bold text-slate-900 leading-snug">
                        {soc.nextBenefit}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-1.5 lg:pt-1">
                    <button
                      onClick={() => openSubscribeModal()}
                      className="w-full py-2.5 lg:py-2 xl:py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs lg:text-[11px] xl:text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center leading-tight min-h-[38px] xl:min-h-[40px]"
                    >
                      <span>Enroll My Car in {soc.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
