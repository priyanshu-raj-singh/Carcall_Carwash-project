"use client";

import React, { useState } from "react";
import { useCarCall } from "@/context/CarCallContext";
import { SOCIETIES_NORTH_BLR } from "@/data/carwashData";
import { Building2, Sparkles, Car, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function QuickBookingBar() {
  const { subscriptionPlans, openSubscribeModal } = useCarCall();

  const [selectedSocietyId, setSelectedSocietyId] = useState(
    SOCIETIES_NORTH_BLR[0]?.id || "sobha-city"
  );
  const [selectedPlanId, setSelectedPlanId] = useState("care");
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    "HATCHBACK" | "SEDAN" | "SUV" | "LUXURY"
  >("SEDAN");
  const [selectedSlot, setSelectedSlot] = useState("6:00 AM - 7:30 AM");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenPlan =
      subscriptionPlans.find((p) => p.id === selectedPlanId) ||
      subscriptionPlans.find((p) => p.id === "care") ||
      subscriptionPlans[0];
    openSubscribeModal(chosenPlan);
  };

  const selectedPlan =
    subscriptionPlans.find((p) => p.id === selectedPlanId) || subscriptionPlans[0];

  return (
    <section className="py-4 sm:py-6 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 bg-red-600 rounded-full" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-slate-500">
                Instant Estimate
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              Let&apos;s get your <br />
              <span className="text-red-600">car clean.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-medium leading-relaxed">
              Choose your car, wash package, society location and preferred morning time slot in a few simple steps.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant confirmation • Cancel or pause anytime</span>
            </div>
          </div>

          {/* Right Column: 2x2 Selector Grid & Submit Button Matching Reference */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleBookingSubmit}
              className="bg-slate-50/80 rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Field 1: Society / Locality */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <Building2 className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Society / Locality
                    </label>
                    <select
                      value={selectedSocietyId}
                      onChange={(e) => setSelectedSocietyId(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden truncate cursor-pointer"
                    >
                      {SOCIETIES_NORTH_BLR.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.locality})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 2: Wash Package */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Wash Package
                    </label>
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden truncate cursor-pointer"
                    >
                      {subscriptionPlans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.id === "care" ? "⭐ (Hero Plan)" : ""} — ₹{p.pricePerMonth}/mo
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 3: Vehicle Type */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <Car className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Vehicle Type
                    </label>
                    <select
                      value={selectedVehicleType}
                      onChange={(e) =>
                        setSelectedVehicleType(
                          e.target.value as "HATCHBACK" | "SEDAN" | "SUV" | "LUXURY"
                        )
                      }
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden truncate cursor-pointer"
                    >
                      <option value="HATCHBACK">Hatchback (Swift, i20, Altroz)</option>
                      <option value="SEDAN">Sedan (City, Verna, Slavia, Dzire)</option>
                      <option value="SUV">Compact / Mid SUV (Creta, Nexon, Brezza)</option>
                      <option value="LUXURY">Luxury / Large SUV (BMW, Audi, Fortuner)</option>
                    </select>
                  </div>
                </div>

                {/* Field 4: Preferred Slot */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Date & Preferred Slot
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden truncate cursor-pointer"
                    >
                      <option value="6:00 AM - 7:30 AM">Tomorrow: 6:00 AM - 7:30 AM (Early)</option>
                      <option value="7:30 AM - 9:00 AM">Tomorrow: 7:30 AM - 9:00 AM (Prime)</option>
                      <option value="9:00 AM - 10:30 AM">Tomorrow: 9:00 AM - 10:30 AM (Regular)</option>
                      <option value="10:30 AM - 12:00 PM">Tomorrow: 10:30 AM - 12:00 PM (Late)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Wide Red Submit Button Matching Reference */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer active:scale-95 min-h-[48px]"
              >
                <span>Book My Wash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
