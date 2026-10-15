"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import {
  Car,
  QrCode,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Gift,
  Users,
  Star,
  Sparkles,
  ChevronRight,
  Shield,
  ArrowRight,
  Copy,
  Check,
  Phone,
  MessageCircle,
  PlusCircle,
  HelpCircle,
  Camera,
  MapPin,
} from "lucide-react";
import { CARCALL_CONTACT } from "@/data/carwashData";

export default function CustomerPortal() {
  const {
    customerVehicle,
    subscriptionPlans,
    entitlements,
    rescheduleEntitlement,
    skipEntitlement,
    serviceRecords,
    rateServiceRecord,
    serviceCredits,
    createQualityTicket,
    societies,
    addOnServices,
    bookAddOn,
    setCurrentView,
    openSubscribeModal,
    showToast,
  } = useCarCall();

  // Local state for modals & drawers
  const [rescheduleModalId, setRescheduleModalId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("15 Oct 2026");
  const [newSlot, setNewSlot] = useState("08:00 AM - 08:45 AM");

  const [ratingModalRecordId, setRatingModalRecordId] = useState<string | null>(null);
  const [ratingVal, setRatingVal] = useState(5);
  const [ratingFeedback, setRatingFeedback] = useState("");

  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [complaintCategory, setComplaintCategory] = useState<
    "Missed Area" | "Timing" | "Cleaner Conduct" | "Water Spot" | "Other"
  >("Missed Area");
  const [complaintText, setComplaintText] = useState("");

  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const [selectedAddon, setSelectedAddon] = useState<string | null>(null);
  const [addonDate, setAddonDate] = useState("This Sunday (12 Oct)");

  // Derive Plan & Entitlements
  const currentPlan =
    subscriptionPlans.find((p) => p.id === customerVehicle.planId) || subscriptionPlans[2];
  const usedCount = entitlements.filter((e) => e.status === "Used").length;
  const totalCount = entitlements.length;
  const remainingCount = totalCount - usedCount;

  const upcomingVisit = entitlements.find(
    (e) => e.status === "Scheduled" || e.status === "Upcoming"
  );

  const currentSociety =
    societies.find((s) => s.id === customerVehicle.societyId) || societies[0];

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(
      `Join me on CarCall Cleaning! Use code ${customerVehicle.referralCode} for your doorstep car care.`
    );
    setCopiedReferral(true);
    showToast("Referral link copied to clipboard!");
    setTimeout(() => setCopiedReferral(false), 2500);
  };

  const handleRescheduleSubmit = () => {
    if (rescheduleModalId) {
      rescheduleEntitlement(rescheduleModalId, newDate, newSlot);
      setRescheduleModalId(null);
    }
  };

  const handleRatingSubmit = () => {
    if (ratingModalRecordId) {
      rateServiceRecord(ratingModalRecordId, ratingVal, ratingFeedback);
      setRatingModalRecordId(null);
      setRatingFeedback("");
    }
  };

  const handleComplaintSubmit = () => {
    if (!complaintText.trim()) return;
    createQualityTicket(complaintText, complaintCategory, customerVehicle.regNumber);
    setComplaintModalOpen(false);
    setComplaintText("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Banner Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-50 text-red-600 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border border-red-200">
                  Customer Portal
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-600 text-xs font-semibold">
                  North Bengaluru Cluster
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                My Car Dashboard
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm">
                Connected vehicle identity, recurring visit entitlements & persistent service logbook.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurrentView("qr-scan")}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-red-600" />
                <span>Test Windshield QR</span>
              </button>

              <button
                onClick={() => setComplaintModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-rose-600" />
                <span>Report an Issue</span>
              </button>

              <button
                onClick={() => openSubscribeModal()}
                className="carcall-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Change Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* ROW 1: Vehicle Identity & Current Subscription Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vehicle Identity Card (PRD Section 15 & 17) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shadow-md">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                      {customerVehicle.make} {customerVehicle.model}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Color: {customerVehicle.color} • Reg:{" "}
                      <span className="font-bold text-slate-800">
                        {customerVehicle.regNumber}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Subscription Active
                  </span>
                </div>
              </div>

              {/* Society & Parking Bay Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>Society Cluster</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {customerVehicle.societyName}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase mb-0.5">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>Designated Parking Bay</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {customerVehicle.parkingSlot}
                  </p>
                </div>
              </div>

              {/* Windshield QR Token Strip */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-red-400 shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        CarCall Dual Windshield QR
                      </span>
                      <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-black">
                        ZERO PHONE LEAK
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-red-200">
                      Token: {customerVehicle.qrToken}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView("qr-scan")}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-colors shrink-0 cursor-pointer"
                >
                  Test Public Scan →
                </button>
              </div>
            </div>

            {/* Bottom Billing Cycle info */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Billing Cycle:{" "}
                <strong className="text-slate-800">
                  {customerVehicle.billingCycleStart} – {customerVehicle.billingCycleEnd}
                </strong>
              </span>
              <span>
                Monthly Fee:{" "}
                <strong className="text-red-600 font-black text-sm">
                  ₹{customerVehicle.monthlyFee}/mo
                </strong>
              </span>
            </div>
          </div>

          {/* Entitlement Tracker & Hero Plan Cadence (PRD Section 4 & 9) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">
                    Monthly Entitlements
                  </span>
                  <h3 className="text-lg font-black text-slate-950 uppercase">
                    Plan: {currentPlan.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-950">
                    {usedCount}{" "}
                    <span className="text-slate-400 text-base font-semibold">
                      / {totalCount}
                    </span>
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Visits Completed
                  </p>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-red-600 to-rose-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(usedCount / totalCount) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>{remainingCount} visits remaining this cycle</span>
                  <span className="font-bold text-slate-700">{totalCount} Visits Total</span>
                </div>
              </div>

              {/* Service Entitlement Pills */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Cycle Entitlements Breakdown
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50/70 border border-red-100 p-2.5 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-red-700 block">
                      Exterior Waterless
                    </span>
                    <span className="text-base font-black text-red-950">
                      {currentPlan.exteriorVisits} Visits
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Zero swirls, mirror finish
                    </span>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-100 p-2.5 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-blue-700 block">
                      Basic Interior Vacuum
                    </span>
                    <span className="text-base font-black text-blue-950">
                      {currentPlan.interiorVisits} Visits
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Mats, seats & console wipe
                    </span>
                  </div>
                </div>
              </div>

              {/* Cadence explanation */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block mb-0.5">
                  Cadence Protocol:
                </span>
                <p className="text-[11px] leading-relaxed">
                  {currentPlan.cadenceDescription}
                </p>
              </div>
            </div>

            {/* Service Credits Quick Banner */}
            {serviceCredits.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <Gift className="w-4 h-4 shrink-0" />
                  <span>{serviceCredits.length} Replacement Credit Active</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Expires {serviceCredits[0].expiryDate}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ROW 2: Upcoming Scheduled Visit + Reschedule / Skip Controls */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Next Up
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Assigned Route: {customerVehicle.societyName}
                </span>
              </div>

              {upcomingVisit ? (
                <>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Scheduled: {upcomingVisit.scheduledDate} ({upcomingVisit.scheduledSlot})
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-red-400" />
                      <span>
                        Service: <strong>{upcomingVisit.serviceType}</strong>
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>
                        Technician: <strong>Raju M. (Verified ID)</strong>
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Estimated Duration: 35–45 mins</span>
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="text-xl font-bold">All monthly visits completed!</h3>
                  <p className="text-xs text-slate-400">
                    Your next renewal cycle starts on {customerVehicle.billingCycleEnd}.
                  </p>
                </div>
              )}
            </div>

            {upcomingVisit && (
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setRescheduleModalId(upcomingVisit.id)}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                >
                  Reschedule Slot
                </button>

                <button
                  onClick={() => skipEntitlement(upcomingVisit.id)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  Request Skip
                </button>

                <a
                  href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=Hi%20CarCall,%20regarding%20my%20scheduled%20wash%20for%20${customerVehicle.regNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Cleaner</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ROW 3: Digital Service History & Photo Inspection Proof (PRD Section 16 & 17) */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                  Digital Service History & Proof
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Persistent service log book with verified timestamps, checklist items, and inspection photos.
              </p>
            </div>

            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {serviceRecords.length} Completed Records
            </span>
          </div>

          {/* Service Records Timeline */}
          <div className="space-y-6">
            {serviceRecords.map((record) => (
              <div
                key={record.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      {record.status}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      {record.serviceType}
                    </h4>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 font-medium">
                      By {record.cleanerName}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    {record.timestamp}
                  </span>
                </div>

                {/* Checklist Badges */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Verified Checklist ({record.checklistCompleted.length} items completed)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {record.checklistCompleted.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {record.notes && (
                  <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-100">
                    "{record.notes}"
                  </p>
                )}

                {/* Inspection Photographs Gallery */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold">
                    <Camera className="w-3.5 h-3.5 text-red-600" />
                    <span>Completion Inspection Photos ({record.photos.length} Uploaded)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {record.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setActivePhotoModal(photo)}
                        className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-200 group cursor-pointer shadow-xs"
                      >
                        <Image
                          src={photo}
                          alt="Service Inspection Photo"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 opacity-90 group-hover:opacity-100">
                          <span className="text-[10px] font-bold text-white tracking-wide">
                            Photo #{pIdx + 1} • Verified
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating & Feedback Component */}
                <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-semibold">
                      Customer Rating:
                    </span>
                    {record.rating ? (
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < record.rating! ? "fill-amber-400 text-amber-400" : "text-slate-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-1">
                          ({record.rating} / 5)
                        </span>
                        {record.ratingFeedback && (
                          <span className="text-xs text-slate-500 italic ml-2">
                            "{record.ratingFeedback}"
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setRatingModalRecordId(record.id);
                          setRatingVal(5);
                        }}
                        className="text-xs text-red-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>Rate this service</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setComplaintCategory("Missed Area");
                      setComplaintModalOpen(true);
                    }}
                    className="text-xs text-slate-500 hover:text-red-600 font-medium cursor-pointer"
                  >
                    Report spot issue →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 4: Society Density & Referral Engine (PRD Section 13 & 14) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Society Milestone Progress Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                  Society Density Engine
                </span>
                <h3 className="text-lg font-black text-slate-950 uppercase">
                  {currentSociety.name}
                </h3>
                <p className="text-xs text-slate-500">
                  More enrolled cars in your society unlock community discounts & dedicated cleaner rosters.
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  {currentSociety.activeCars} / {currentSociety.milestoneTarget} Cars Enrolled
                </span>
                <span className="text-blue-600 font-bold text-xs">
                  {Math.round((currentSociety.activeCars / currentSociety.milestoneTarget) * 100)}% to Milestone
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (currentSociety.activeCars / currentSociety.milestoneTarget) * 100
                    )}%`,
                  }}
                />
              </div>

              <p className="text-xs text-slate-600 bg-blue-50/70 p-3 rounded-xl border border-blue-200/80">
                🎁 <strong>Next Society Unlock:</strong> {currentSociety.nextBenefit} once{" "}
                {currentSociety.milestoneTarget - currentSociety.activeCars} more cars join!
              </p>
            </div>
          </div>

          {/* Referral Engine Card (PRD Section 14) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">
                  Referral Reward Program
                </span>
                <h3 className="text-lg font-black text-slate-950 uppercase">
                  3 Referrals = 1 FREE Month
                </h3>
                <p className="text-xs text-slate-500">
                  Recommend CarCall to neighbours in your apartment. Unlock 1 free maintenance month.
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  {customerVehicle.referralsCompleted} / {customerVehicle.referralsTarget} Qualifying Referrals
                </span>
                <span className="text-red-600 font-bold text-xs">
                  1 More for Free Month!
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(customerVehicle.referralsCompleted / customerVehicle.referralsTarget) * 100}%`,
                  }}
                />
              </div>

              {/* Referral Code Copy */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <span className="text-xs font-mono font-bold text-slate-800">
                  {customerVehicle.referralCode}
                </span>

                <button
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReferral ? "Copied" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 5: Add-On Marketplace Quick Booking (PRD Section 3.3 & 20) */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                  Add-On Services Catalog
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Need extra detailing? Schedule separately billable add-ons alongside your routine subscription.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {addOnServices.map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {addon.name}
                    </h4>
                    <span className="text-xs font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {addon.indicativePrice}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {addon.description}
                  </p>
                  <span className="inline-block text-[10px] text-slate-400 font-semibold">
                    Duration: ~{addon.duration}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedAddon(addon.id);
                    bookAddOn(addon.id, addonDate);
                  }}
                  className="w-full py-2 rounded-lg bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Book for Upcoming Visit</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL 1: Reschedule Visit Modal */}
      {rescheduleModalId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-950 uppercase">
              Reschedule Service Visit
            </h3>
            <p className="text-xs text-slate-500">
              Pick a new preferred date and morning time slot for your society cluster.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Date
                </label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="15 Oct 2026">Thursday, 15 Oct 2026</option>
                  <option value="16 Oct 2026">Friday, 16 Oct 2026</option>
                  <option value="17 Oct 2026">Saturday, 17 Oct 2026</option>
                  <option value="18 Oct 2026">Sunday, 18 Oct 2026</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Morning Slot
                </label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="06:30 AM - 07:15 AM">Early Morning (06:30 AM - 07:15 AM)</option>
                  <option value="07:30 AM - 08:15 AM">Standard Slot (07:30 AM - 08:15 AM)</option>
                  <option value="08:30 AM - 09:15 AM">Late Morning (08:30 AM - 09:15 AM)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleModalId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleSubmit}
                className="carcall-btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Rate Service Modal */}
      {ratingModalRecordId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-950 uppercase">
              Rate Your Completed Cleaning
            </h3>
            <p className="text-xs text-slate-500">
              Your feedback is linked directly to cleaner performance metrics and supervisor quality audits.
            </p>

            <div className="flex items-center justify-center gap-2 py-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingVal(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= ratingVal
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Optional Feedback / Compliment
              </label>
              <textarea
                value={ratingFeedback}
                onChange={(e) => setRatingFeedback(e.target.value)}
                placeholder="e.g. Great gloss on tyres, windshield was very clean!"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRatingModalRecordId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Skip
              </button>
              <button
                onClick={handleRatingSubmit}
                className="carcall-btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Complaint / Issue Ticket Modal */}
      {complaintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-black uppercase text-slate-950">
                Report an Issue / Quality Ticket
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Every complaint is assigned directly to a North Bengaluru field supervisor with an 8-hour resolution SLA.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Issue Category
                </label>
                <select
                  value={complaintCategory}
                  onChange={(e) => setComplaintCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="Missed Area">Missed Area (e.g. wheels, door jambs)</option>
                  <option value="Water Spot">Water Spot / Streaks left</option>
                  <option value="Timing">Timing / Cleaner Delay</option>
                  <option value="Cleaner Conduct">Cleaner Conduct</option>
                  <option value="Other">Other Operational Issue</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Describe what happened
                </label>
                <textarea
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  placeholder="Please describe the issue so the supervisor can inspect or re-service..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs h-24"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setComplaintModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleComplaintSubmit}
                disabled={!complaintText.trim()}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: High-Res Photo Lightbox */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl w-full h-[70vh] rounded-2xl overflow-hidden">
            <Image
              src={activePhotoModal}
              alt="Full Resolution Inspection Photo"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
