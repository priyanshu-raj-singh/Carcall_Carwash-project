"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import {
  CleanerJob,
  EXTERIOR_STANDARDS,
  INTERIOR_STANDARDS,
} from "@/data/carwashData";
import {
  Wrench,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Car,
  Clock,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  X,
  Plus,
  Check,
  Upload,
} from "lucide-react";

export default function CleanerPWA() {
  const {
    cleanerJobs,
    activeCleanerShift,
    toggleCleanerShiftStatus,
    startCleanerJob,
    completeCleanerJob,
    markCleanerException,
    setCurrentView,
    showToast,
  } = useCarCall();

  // Active Job state
  const [selectedJob, setSelectedJob] = useState<CleanerJob | null>(null);
  const [filterTab, setFilterTab] = useState<"all" | "scheduled" | "completed" | "exception">("all");

  // QR Scanner modal state
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [scannedTokenInput, setScannedTokenInput] = useState("CC-BLR-8492");

  // In-Job Checklist & Photos state
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "/images/carcall-more-foam.jpg",
    "/images/carcall-hand-wash.jpg",
  ]);
  const [jobNotes, setJobNotes] = useState("");

  // Exception modal state
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [exceptionReason, setExceptionReason] = useState("Vehicle Inaccessible (Basement parking gate locked)");

  // Filter jobs
  const filteredJobs = cleanerJobs.filter((job) => {
    if (filterTab === "scheduled") return job.status === "Scheduled" || job.status === "Started";
    if (filterTab === "completed") return job.status === "Completed";
    if (filterTab === "exception") return job.status === "Exception";
    return true;
  });

  const handleSelectJob = (job: CleanerJob) => {
    setSelectedJob(job);
    // Initialize checklist based on serviceType
    const extItems = EXTERIOR_STANDARDS.map((s) => s.title);
    const intItems =
      job.serviceType === "Exterior + Interior" ? INTERIOR_STANDARDS.map((s) => s.title) : [];
    setCheckedItems([...extItems, ...intItems]);
  };

  const handleToggleCheckItem = (itemTitle: string) => {
    if (checkedItems.includes(itemTitle)) {
      setCheckedItems(checkedItems.filter((i) => i !== itemTitle));
    } else {
      setCheckedItems([...checkedItems, itemTitle]);
    }
  };

  const handleSimulateQrScan = () => {
    // Find job matching scanned token
    const matchingJob = cleanerJobs.find(
      (j) => j.qrToken.toLowerCase() === scannedTokenInput.trim().toLowerCase()
    );

    if (matchingJob) {
      showToast(`Vehicle ${matchingJob.vehicleReg} QR Verified!`);
      setIsQrScannerOpen(false);
      handleSelectJob(matchingJob);
    } else {
      showToast("Token not found. Opening first available job.");
      setIsQrScannerOpen(false);
      handleSelectJob(cleanerJobs[0]);
    }
  };

  const handleAddSamplePhoto = () => {
    const samples = [
      "/images/carcall-dusty-to-detailed.jpg",
      "/images/carcall-fresh-again.jpg",
      "/images/carcall-we-come-to-you.jpg",
    ];
    const nextPhoto = samples[uploadedPhotos.length % samples.length];
    setUploadedPhotos([...uploadedPhotos, nextPhoto]);
    showToast("Photo captured & attached!");
  };

  const handleCompleteService = () => {
    if (!selectedJob) return;
    completeCleanerJob(selectedJob.id, checkedItems, uploadedPhotos, jobNotes);
    setSelectedJob(null);
  };

  const handleExceptionSubmit = () => {
    if (!selectedJob) return;
    markCleanerException(selectedJob.id, exceptionReason);
    setIsExceptionModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      {/* Top Mobile-First Cleaner App Bar */}
      <div className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-md">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase text-red-400 tracking-wider">
                  Cleaner PWA
                </span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.2 rounded font-mono">
                  ID: {activeCleanerShift.id}
                </span>
              </div>
              <h2 className="text-sm font-extrabold text-white leading-tight">
                {activeCleanerShift.cleanerName} • {activeCleanerShift.cluster}
              </h2>
            </div>
          </div>

          {/* Shift status button */}
          <button
            onClick={toggleCleanerShiftStatus}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCleanerShift.status === "On Shift"
                ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
                : "bg-amber-600 text-white hover:bg-amber-500"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{activeCleanerShift.status}</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
        {/* VIEW A: IF A JOB IS ACTIVELY OPEN */}
        {selectedJob ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Back button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Today's Jobs</span>
            </button>

            {/* Vehicle & Authorization Card (PRD Section 8) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-emerald-200 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>QR Verified & Authorized</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950 uppercase">
                    {selectedJob.vehicleReg}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    {selectedJob.vehicleModel} • {selectedJob.color}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-slate-500 block">
                    Slot {selectedJob.timeSlot}
                  </span>
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 inline-block mt-1">
                    {selectedJob.serviceType}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{selectedJob.society}</span>
                </div>
                <p className="text-slate-500 font-medium pl-5">
                  Location: {selectedJob.parkingSlot}
                </p>
              </div>

              {selectedJob.status === "Scheduled" && (
                <button
                  onClick={() => startCleanerJob(selectedJob.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Tap to Start Service</span>
                </button>
              )}
            </div>

            {/* Checklist Section: Service Standard Checklist */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  <h4 className="text-sm font-black text-slate-950 uppercase">
                    Service Standard Checklist
                  </h4>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {checkedItems.length} Checked
                </span>
              </div>

              {/* Exterior Items */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Exterior Routine ({EXTERIOR_STANDARDS.length} Items)
                </span>
                <div className="space-y-1.5">
                  {EXTERIOR_STANDARDS.map((item) => {
                    const isChecked = checkedItems.includes(item.title);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleCheckItem(item.title)}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-red-50/70 border-red-300 text-red-950"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center ${
                              isChecked
                                ? "bg-red-600 text-white"
                                : "border border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold">{item.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          Exterior
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interior Items (if included) */}
              {selectedJob.serviceType === "Exterior + Interior" && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block">
                    Basic Interior Vacuum ({INTERIOR_STANDARDS.length} Items)
                  </span>
                  <div className="space-y-1.5">
                    {INTERIOR_STANDARDS.map((item) => {
                      const isChecked = checkedItems.includes(item.title);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleCheckItem(item.title)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                            isChecked
                              ? "bg-blue-50/70 border-blue-300 text-blue-950"
                              : "bg-slate-50 border-slate-200 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center ${
                                isChecked
                                  ? "bg-blue-600 text-white"
                                  : "border border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-bold">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Interior
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Photo Capture Section (PRD Section 8 & 16) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-red-600" />
                  <h4 className="text-sm font-black text-slate-950 uppercase">
                    Completion Photos (Mandatory 2–3)
                  </h4>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {uploadedPhotos.length} / 3 Captured
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {uploadedPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative h-24 rounded-xl overflow-hidden border border-slate-200 group"
                  >
                    <Image
                      src={photo}
                      alt="Captured Photo"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      #{idx + 1}
                    </div>
                  </div>
                ))}

                {uploadedPhotos.length < 4 && (
                  <button
                    onClick={handleAddSamplePhoto}
                    className="h-24 rounded-xl border-2 border-dashed border-slate-300 hover:border-red-400 bg-slate-50 flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Add Photo</span>
                  </button>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cleaner Operational Note
                </label>
                <input
                  type="text"
                  value={jobNotes}
                  onChange={(e) => setJobNotes(e.target.value)}
                  placeholder="e.g. Parked tight next to pillar. Wheels polished."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Submit & Exception Action Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsExceptionModalOpen(true)}
                className="py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Mark Operational Exception</span>
              </button>

              <button
                onClick={handleCompleteService}
                className="carcall-btn-primary py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit & Complete Job</span>
              </button>
            </div>
          </div>
        ) : (
          /* VIEW B: TODAY'S JOBS LIST & QR SCAN BUTTON */
          <div className="space-y-4">
            {/* Quick QR Scanner Banner (PRD Section 8: Cleaner reaches vehicle & scans QR) */}
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-200">
                  Scan to Begin
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Reached Vehicle? Scan Windshield QR
                </h3>
                <p className="text-xs text-red-100">
                  Instant authorization check & auto-loads the correct entitlement checklist.
                </p>
              </div>

              <button
                onClick={() => setIsQrScannerOpen(true)}
                className="px-5 py-3 rounded-xl bg-white text-red-600 hover:bg-red-50 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
              >
                <QrCode className="w-4 h-4" />
                <span>Scan Vehicle QR</span>
              </button>
            </div>

            {/* Shift Summary Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Assigned
                </span>
                <span className="text-lg font-black text-slate-900">
                  {activeCleanerShift.assignedCars} Cars
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                  Completed
                </span>
                <span className="text-lg font-black text-emerald-700">
                  {activeCleanerShift.completedCars} Cars
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-amber-600 block">
                  Rating
                </span>
                <span className="text-lg font-black text-amber-700">
                  {activeCleanerShift.rating} ⭐
                </span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "all", label: "All Today's Jobs" },
                { id: "scheduled", label: "Pending" },
                { id: "completed", label: "Completed" },
                { id: "exception", label: "Exceptions" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                    filterTab === tab.id
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Jobs List */}
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-red-400 hover:shadow-md transition-all cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-slate-950 uppercase">
                          {job.vehicleReg}
                        </h4>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                            job.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : job.status === "Exception"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : job.status === "Started"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">
                        {job.vehicleModel} • {job.color}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-700 block">
                        {job.timeSlot}
                      </span>
                      <span className="text-[10px] text-red-600 font-bold">
                        {job.serviceType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="truncate max-w-[280px]">
                      📍 {job.parkingSlot}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {job.qrToken}
                    </span>
                  </div>

                  {job.exceptionReason && (
                    <div className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium">
                      ⚠️ Exception: {job.exceptionReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR SCANNER SIMULATION MODAL */}
      {isQrScannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black uppercase text-slate-950">
                Scan CarCall QR Sticker
              </h3>
              <button
                onClick={() => setIsQrScannerOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Viewfinder Simulation */}
            <div className="relative h-56 bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white border-2 border-red-500/50">
              <div className="w-36 h-36 border-2 border-red-500 rounded-lg relative flex items-center justify-center">
                <span className="animate-pulse w-full h-0.5 bg-red-500 absolute top-1/2 -translate-y-1/2" />
                <QrCode className="w-16 h-16 text-white/40" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Point camera at front/rear windshield QR
              </p>
            </div>

            {/* Quick Test Token Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 block">
                Or Select Vehicle Token for Simulation:
              </label>
              <select
                value={scannedTokenInput}
                onChange={(e) => setScannedTokenInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold"
              >
                {cleanerJobs.map((j) => (
                  <option key={j.id} value={j.qrToken}>
                    {j.vehicleReg} ({j.qrToken}) - {j.parkingSlot}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSimulateQrScan}
              className="carcall-btn-primary w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Verify & Open Job Checklist</span>
            </button>
          </div>
        </div>
      )}

      {/* OPERATIONAL EXCEPTION MODAL (PRD Section 10) */}
      {isExceptionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-black uppercase text-slate-950">
                Log Operational Exception
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Operational exceptions preserve customer entitlements and trigger automated replacement credits or rescheduling.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Select Reason Code
              </label>
              <select
                value={exceptionReason}
                onChange={(e) => setExceptionReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
              >
                <option value="Vehicle Inaccessible (Car parked with cover locked)">
                  Vehicle Inaccessible (Cover locked / parking gate blocked)
                </option>
                <option value="Customer Requested Skip (WhatsApp request)">
                  Customer Requested Skip
                </option>
                <option value="Weather / Operational Hold (Severe heavy rain)">
                  Weather / Operational Hold (Basement flooded / rain)
                </option>
                <option value="Car Not Parked in Designated Bay">
                  Car Not Parked in Designated Bay
                </option>
                <option value="Cleaner Equipment Issue">
                  Cleaner Equipment / Resource Issue
                </option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsExceptionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleExceptionSubmit}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
              >
                Submit Exception
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
