"use client";

import React, { useState } from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  SubscriptionPlan,
  SUBSCRIPTION_PLANS,
  SOCIETIES_NORTH_BLR,
  ADD_ON_SERVICES,
} from "@/data/carwashData";
import {
  X,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Car,
  MapPin,
  ShieldCheck,
  CreditCard,
  Phone,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function SubscribeModal() {
  const {
    isSubscribeModalOpen,
    setIsSubscribeModalOpen,
    selectedPlanForModal,
    subscriptionPlans,
    updateCustomerVehicle,
    setCurrentView,
    addNotification,
    showToast,
  } = useCarCall();

  // 5 Step flow: 1: Plan -> 2: OTP -> 3: Vehicle -> 4: Society -> 5: Summary/Success
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    selectedPlanForModal?.id || "care"
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [mobileNumber, setMobileNumber] = useState("8970007467");
  const [otpCode, setOtpCode] = useState("8492");
  const [regNumber, setRegNumber] = useState("KA 04 MN 4821");
  const [carMake, setCarMake] = useState("Hyundai");
  const [carModel, setCarModel] = useState("Creta SX(O)");
  const [carColor, setCarColor] = useState("Polar White");
  const [selectedSocietyId, setSelectedSocietyId] = useState("sobha-city");
  const [parkingSlot, setParkingSlot] = useState("Basement 2, Slot #104");

  if (!isSubscribeModalOpen) return null;

  const currentPlan =
    subscriptionPlans.find((p) => p.id === selectedPlanId) || subscriptionPlans[2];
  const currentSociety =
    SOCIETIES_NORTH_BLR.find((s) => s.id === selectedSocietyId) || SOCIETIES_NORTH_BLR[0];

  const handleToggleAddon = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  const handleFinishOnboarding = () => {
    // 1. Update global customer vehicle
    updateCustomerVehicle({
      regNumber: regNumber.toUpperCase(),
      make: carMake,
      model: carModel,
      color: carColor,
      societyId: selectedSocietyId,
      societyName: currentSociety.name,
      parkingSlot: parkingSlot || "Designated Basement Bay",
      planId: currentPlan.id,
      monthlyFee: currentPlan.pricePerMonth,
      qrToken: `CC-BLR-${Math.floor(1000 + Math.random() * 9000)}`,
      billingCycleStart: "01 Oct 2026",
      billingCycleEnd: "31 Oct 2026",
    });

    // 2. Add welcome notification
    addNotification({
      type: "welcome",
      title: `🎉 Welcome to CarCall ${currentPlan.name}!`,
      message: `Your vehicle ${regNumber.toUpperCase()} is enrolled at ${currentSociety.name}. ${currentPlan.totalVisits} monthly maintenance visits are generated for October 2026.`,
      linkText: "View My Car Dashboard",
      linkAction: "mycar",
    });

    // 3. Close modal & navigate to "My Car"
    setIsSubscribeModalOpen(false);
    setStep(1);
    setCurrentView("mycar");
    showToast(`Welcome! CarCall ${currentPlan.name} activated for ${regNumber.toUpperCase()}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-7 space-y-5 shadow-2xl border border-slate-200 relative my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsSubscribeModalOpen(false);
            setStep(1);
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="uppercase tracking-wider text-red-600">
              Step {step} of 5:{" "}
              {step === 1 && "Select Plan"}
              {step === 2 && "Mobile OTP Verification"}
              {step === 3 && "Vehicle Profile"}
              {step === 4 && "Society & Parking"}
              {step === 5 && "Entitlement Activation"}
            </span>
            <span>{step * 20}%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 to-rose-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${step * 20}%` }}
            />
          </div>
        </div>

        {/* STEP 1: SELECT PLAN & OPTIONAL ADDONS */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                Choose Your Recurring Maintenance Plan
              </h3>
              <p className="text-xs text-slate-500">
                Monthly predictable car care with persistent digital service history.
              </p>
            </div>

            {/* Plans List */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {subscriptionPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-red-50/80 border-red-500 ring-2 ring-red-500/20 shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">
                          {plan.name}
                        </span>
                        {plan.isHero && (
                          <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded">
                            HERO ⭐
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-semibold">
                          ({plan.positioning})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {plan.exteriorVisits}× Exterior Waterless • {plan.interiorVisits}× Basic Interior ({plan.totalVisits} Visits/mo)
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-black text-slate-950">
                        ₹{plan.pricePerMonth}
                      </span>
                      <span className="text-[10px] text-slate-500 block">/month</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                className="carcall-btn-primary px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MOBILE OTP VERIFICATION */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                Verify Your Mobile Number
              </h3>
              <p className="text-xs text-slate-500">
                We use secure mobile OTP to link your subscription and send WhatsApp completion proofs.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 bg-white px-3 py-2.5 rounded-xl border border-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    4-Digit Verification Code
                  </label>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    Demo OTP: 8492
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-center font-mono font-black text-lg tracking-widest text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="carcall-btn-primary px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Verify & Add Vehicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: VEHICLE PROFILE */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                Add Your Vehicle Details
              </h3>
              <p className="text-xs text-slate-500">
                The vehicle is the central operational object connecting cleaning, identity, and future care.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Registration Number (e.g. KA 04 MN 4821)
                </label>
                <input
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="KA 04 XX 1234"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold text-slate-900 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Car Make
                  </label>
                  <input
                    type="text"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    placeholder="Hyundai, Honda, Tata..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Car Model
                  </label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="Creta, City, Nexon..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Vehicle Color
                </label>
                <input
                  type="text"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  placeholder="White, Grey, Black..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(4)}
                className="carcall-btn-primary px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Select Society</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SOCIETY & PARKING BAY */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                Society & Designated Parking Bay
              </h3>
              <p className="text-xs text-slate-500">
                Our cleaners operate in dense locality clusters in North Bengaluru for fast arrival.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Select Society (North Bengaluru Cluster)
                </label>
                <select
                  value={selectedSocietyId}
                  onChange={(e) => setSelectedSocietyId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  {SOCIETIES_NORTH_BLR.map((soc) => (
                    <option key={soc.id} value={soc.id}>
                      {soc.name} ({soc.locality}) — {soc.activeCars} active cars
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Parking Slot / Basement Details
                </label>
                <input
                  type="text"
                  value={parkingSlot}
                  onChange={(e) => setParkingSlot(e.target.value)}
                  placeholder="e.g. Basement 2, Slot #104 or Tower 3 Bay 12"
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                ℹ️ <strong>RWA Water-Ban Compliant:</strong> Our waterless cleaning system creates zero floor puddles and is approved by apartment security.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(5)}
                className="carcall-btn-primary px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Review & Activate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & ACTIVATE ENTITLEMENTS */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                Confirm & Activate Subscription
              </h3>
              <p className="text-xs text-slate-500">
                Your monthly service entitlements will be generated instantly.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    CarCall {currentPlan.name} Plan
                  </span>
                  <span className="text-slate-500">
                    {currentPlan.totalVisits} visits/month ({currentPlan.exteriorVisits}x Ext + {currentPlan.interiorVisits}x Int)
                  </span>
                </div>
                <span className="text-base font-black text-red-600">
                  ₹{currentPlan.pricePerMonth}/mo
                </span>
              </div>

              <div className="space-y-1 text-slate-600">
                <p>
                  <strong>Vehicle:</strong> {regNumber.toUpperCase()} ({carMake} {carModel}, {carColor})
                </p>
                <p>
                  <strong>Society:</strong> {currentSociety.name}
                </p>
                <p>
                  <strong>Parking Bay:</strong> {parkingSlot}
                </p>
                <p>
                  <strong>Dual QR Protection:</strong> Front + Rear windshield identity included
                </p>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  First cycle entitlement generation: 6 scheduled visits for October 2026.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleFinishOnboarding}
                className="carcall-btn-primary px-7 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activate Subscription & Open My Car</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
