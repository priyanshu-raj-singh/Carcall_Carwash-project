"use client";

import React, { useState } from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  Building2,
  DollarSign,
  CheckCircle2,
  Wrench,
  Search,
  Filter,
  Layers,
  Settings,
  Star,
  Plus,
} from "lucide-react";

export default function SupervisorAdminDashboard() {
  const {
    cleanerJobs,
    cleanerShifts,
    qualityTickets,
    updateTicketStatus,
    societies,
    incrementSocietyCar,
    subscriptionPlans,
    updatePlanPrice,
    issueServiceCredit,
    showToast,
  } = useCarCall();

  const [activeTab, setActiveTab] = useState<
    "kpi" | "roster" | "tickets" | "societies" | "pricing"
  >("kpi");

  // Local state for ticket resolution note input
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [resolutionNoteInput, setResolutionNoteInput] = useState("");

  // Local state for pricing update modal
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [newPlanPrice, setNewPlanPrice] = useState<number>(499);

  // Stats calculation
  const totalJobs = cleanerJobs.length;
  const completedJobs = cleanerJobs.filter((j) => j.status === "Completed").length;
  const exceptionJobs = cleanerJobs.filter((j) => j.status === "Exception").length;
  const openTickets = qualityTickets.filter((t) => t.status !== "Resolved" && t.status !== "Closed").length;

  const handleResolveTicket = (ticketId: string) => {
    updateTicketStatus(
      ticketId,
      "Resolved",
      resolutionNoteInput || "Supervisor verified and resolved."
    );
    setSelectedTicketId(null);
    setResolutionNoteInput("");
  };

  const handleSavePrice = () => {
    if (editingPlanId && newPlanPrice > 0) {
      updatePlanPrice(editingPlanId, newPlanPrice);
      setEditingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-slate-900 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Operations & Admin
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live North Bengaluru Society Network
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                Supervisor Operations Dashboard
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm">
                Society density tracking, cleaner attendance, quality SLA queue & configurable plan pricing.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              {[
                { id: "kpi", label: "KPIs & Jobs" },
                { id: "roster", label: "Cleaners Roster" },
                { id: "tickets", label: `Tickets (${openTickets})` },
                { id: "societies", label: "Society Density" },
                { id: "pricing", label: "Pricing Config" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-slate-950 shadow-xs font-black"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Summary Cards (PRD Section 21 & 30) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">
              Active Enrolled Cars
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-950">
                148
              </span>
              <span className="text-xs font-bold text-emerald-600">
                +14 this week
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Across 5 North Bengaluru societies
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">
              Monthly Recurring (MRR)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-red-600">
                ₹73,852
              </span>
              <span className="text-xs font-bold text-slate-500">
                Hero: Care ⭐ (54%)
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Avg revenue per car: ₹499/mo
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">
              Service Completion Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                96.4%
              </span>
              <span className="text-xs font-bold text-slate-500">
                ({completedJobs}/{totalJobs} Jobs)
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              2 exceptions recorded & credited
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">
              Cleaner Productivity
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-600">
                14.2
              </span>
              <span className="text-xs font-bold text-slate-500">
                Cars / Cleaner / Day
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Avg service cycle: 28 mins
            </p>
          </div>
        </div>

        {/* TAB 1: KPIS & LIVE JOBS */}
        {activeTab === "kpi" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                    Today's Field Jobs Board
                  </h3>
                  <p className="text-xs text-slate-500">
                    Clustered service dispatch for North Bengaluru societies.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {totalJobs} Jobs Assigned Today
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                      <th className="py-3 px-3">Vehicle Plate</th>
                      <th className="py-3 px-3">Car Model</th>
                      <th className="py-3 px-3">Society & Slot</th>
                      <th className="py-3 px-3">Time Slot</th>
                      <th className="py-3 px-3">Entitlement Type</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {cleanerJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-3 font-bold text-slate-900 font-mono">
                          {job.vehicleReg}
                        </td>
                        <td className="py-3 px-3 text-slate-700">
                          {job.vehicleModel}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {job.society} ({job.parkingSlot})
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-800">
                          {job.timeSlot}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            {job.serviceType}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                              job.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : job.status === "Exception"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLEANERS ROSTER & ATTENDANCE */}
        {activeTab === "roster" && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                  Cleaner Attendance & Productivity Roster
                </h3>
                <p className="text-xs text-slate-500">
                  Daily shifts, check-in timestamps, assigned vs completed cars, and quality ratings.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cleanerShifts.map((cleaner) => (
                <div
                  key={cleaner.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        {cleaner.cleanerName}
                      </h4>
                      <p className="text-xs text-slate-500">{cleaner.cluster}</p>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        cleaner.status === "On Shift"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {cleaner.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Check-in</span>
                      <span className="font-bold text-slate-800">{cleaner.checkInTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Customer Rating</span>
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{cleaner.rating} / 5</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Assigned Cars</span>
                      <span className="font-bold text-slate-800">{cleaner.assignedCars}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Completed</span>
                      <span className="font-bold text-emerald-600">{cleaner.completedCars}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Phone: {cleaner.phone}</span>
                    <button
                      onClick={() => showToast(`Contacting supervisor for ${cleaner.cleanerName}`)}
                      className="text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Direct Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUALITY CONTROL & COMPLAINTS SLA (PRD Section 12) */}
        {activeTab === "tickets" && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                  Quality Control & Complaints Queue
                </h3>
                <p className="text-xs text-slate-500">
                  SLA tracking, root-cause categorization, and supervisor resolution audit log.
                </p>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                {openTickets} Actionable Tickets
              </span>
            </div>

            <div className="space-y-3">
              {qualityTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        #{ticket.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {ticket.vehicleReg} ({ticket.society})
                      </span>
                      <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded border border-red-200">
                        {ticket.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          ticket.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : ticket.status === "In progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                      {ticket.slaHoursRemaining > 0 && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{ticket.slaHoursRemaining}h SLA</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    "{ticket.issue}"
                  </p>

                  {ticket.resolutionNote && (
                    <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      <strong>Resolution Note:</strong> {ticket.resolutionNote}
                    </div>
                  )}

                  {ticket.status !== "Resolved" && (
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500">
                        Assigned Cleaner: {ticket.cleanerName}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            issueServiceCredit(
                              `Quality issue resolution: ${ticket.category}`,
                              "1× Free Replacement Exterior + Interior Wash"
                            );
                            updateTicketStatus(
                              ticket.id,
                              "Resolved",
                              "Supervisor issued 1 replacement service credit."
                            );
                          }}
                          className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 font-bold text-xs cursor-pointer"
                        >
                          Issue Free Service Credit
                        </button>

                        <button
                          onClick={() => setSelectedTicketId(ticket.id)}
                          className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-red-600 text-white font-bold text-xs cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SOCIETY DENSITY & MILESTONES (PRD Section 13) */}
        {activeTab === "societies" && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                  Society Management & Density Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Society density drives unit economics. Dynamic benefit triggers unlock at 20, 40, 60+ active cars.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {societies.map((soc) => {
                const percent = Math.round((soc.activeCars / soc.milestoneTarget) * 100);
                return (
                  <div
                    key={soc.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-slate-950">
                            {soc.name}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {soc.locality}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {soc.gateLocation} • {soc.cleanersAssigned} Assigned Cleaners
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-900">
                          {soc.activeCars} / {soc.milestoneTarget} Cars
                        </span>

                        <button
                          onClick={() => incrementSocietyCar(soc.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Simulate +1 Car Joining</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                        <span>Milestone Progress: {percent}%</span>
                        <span className="text-blue-700">
                          {soc.milestoneTarget - soc.activeCars > 0
                            ? `${soc.milestoneTarget - soc.activeCars} cars to next unlock`
                            : "🎉 Milestone Unlocked!"}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                      🎁 <strong>Community Benefit:</strong> {soc.nextBenefit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: PRICING & BENEFIT CONFIGURATION (PRD Section 19) */}
        {activeTab === "pricing" && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                  Configurable Pricing & Benefits Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Data-driven subscription pricing. Prices are never hard-coded in individual client screens.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    plan.isHero
                      ? "bg-red-50/50 border-red-300 ring-2 ring-red-500/20"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-slate-900">
                        {plan.name}
                      </h4>
                      {plan.isHero && (
                        <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded">
                          HERO PLAN
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{plan.tagline}</p>
                    <div className="text-2xl font-black text-slate-950">
                      ₹{plan.pricePerMonth}
                      <span className="text-xs font-normal text-slate-500">
                        /month
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-0.5 pt-1">
                      <p>• {plan.exteriorVisits}x Waterless Exterior visits</p>
                      <p>• {plan.interiorVisits}x Basic Interior vacuum visits</p>
                      <p>• {plan.totalVisits} Total visits per cycle</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setEditingPlanId(plan.id);
                      setNewPlanPrice(plan.pricePerMonth);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Adjust Monthly Price
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RESOLVE TICKET MODAL */}
      {selectedTicketId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-black uppercase text-slate-950">
              Resolve Ticket #{selectedTicketId}
            </h3>
            <p className="text-xs text-slate-500">
              Provide resolution notes to be recorded in the persistent audit log.
            </p>

            <textarea
              value={resolutionNoteInput}
              onChange={(e) => setResolutionNoteInput(e.target.value)}
              placeholder="e.g. Supervisor conducted spot check and buffed the window streaks at 11:30 AM."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs h-24"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedTicketId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolveTicket(selectedTicketId)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Confirm Resolution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PLAN PRICE MODAL */}
      {editingPlanId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-black uppercase text-slate-950">
              Adjust Plan Price
            </h3>
            <p className="text-xs text-slate-500">
              Updates the global recurring subscription fee across all UI calculations.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                New Price (₹ / month)
              </label>
              <input
                type="number"
                value={newPlanPrice}
                onChange={(e) => setNewPlanPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-base font-black text-slate-900"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingPlanId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrice}
                className="carcall-btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Save Price
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
