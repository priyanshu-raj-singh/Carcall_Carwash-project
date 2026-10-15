"use client";

import React, { useState } from "react";
import { useCarCall } from "@/context/CarCallContext";
import {
  QrCode,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Car,
  Bell,
  MessageCircle,
  PhoneCall,
  Send,
  CheckCircle2,
  Wrench,
  Sun,
  EyeOff,
} from "lucide-react";

export default function PublicQrScanView() {
  const { customerVehicle, addNotification, setCurrentView, showToast } = useCarCall();

  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const quickAlerts = [
    {
      id: "blocking",
      icon: "🚗",
      label: "Blocking My Car / Driveway",
      text: "Hello! Your vehicle is currently parked and blocking my car/exit. Please help move it when possible.",
    },
    {
      id: "window",
      icon: "🪟",
      label: "Window / Sunroof Left Open",
      text: "Notice: Your car window or sunroof has been left partially open. Sharing in case of rain or dust.",
    },
    {
      id: "lights",
      icon: "💡",
      label: "Headlights Left ON",
      text: "Alert: Your vehicle headlights or parking lights are currently ON. Please check to prevent battery drain.",
    },
    {
      id: "flat",
      icon: "🛞",
      label: "Flat / Low Tyre Pressure",
      text: "Friendly alert: Noticed low tyre pressure or puncture on your front/rear tyre.",
    },
    {
      id: "emergency",
      icon: "⚠️",
      label: "Emergency / Car Bumped",
      text: "Urgent: A minor parking contact or security incident involving your vehicle has occurred. Please attend.",
    },
  ];

  const handleSendAlert = (messageContent: string) => {
    addNotification({
      type: "exception",
      title: `🚨 Windshield QR Alert Received (${customerVehicle.regNumber})`,
      message: `A bystander scanned your windshield QR: "${messageContent}". Owner identity stayed 100% private.`,
    });
    setSentSuccess(true);
    showToast("Alert dispatched via CarCall Secure Proxy!");
    setTimeout(() => {
      setSentSuccess(false);
      setSelectedQuickAction(null);
      setCustomMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Top Header Badge */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300">
            <QrCode className="w-3.5 h-3.5 text-red-500" />
            <span>Windshield QR Scanned • Token #{customerVehicle.qrToken}</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            CarCall Contact Owner
          </h1>
          <p className="text-xs text-slate-400">
            Controlled vehicle proxy. Contact the driver without revealing their phone number.
          </p>
        </div>

        {/* Vehicle Identity Card (Zero Phone Leak - PRD Section 15) */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-black shadow-md shrink-0">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                {customerVehicle.make} {customerVehicle.model}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Reg: {customerVehicle.regNumber} • {customerVehicle.color}
              </p>
            </div>
          </div>

          {/* Privacy Guarantee Box */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-emerald-200">
            <EyeOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">
                100% Privacy Protected
              </strong>
              <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                The vehicle owner's personal phone number is never displayed. Messages are routed through CarCall's encrypted dispatch proxy.
              </p>
            </div>
          </div>

          {/* Quick Alert Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              1-Tap Emergency & Parking Notices
            </span>

            <div className="grid grid-cols-1 gap-2">
              {quickAlerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => {
                    setSelectedQuickAction(alert.id);
                    handleSendAlert(alert.text);
                  }}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/50 text-left transition-all flex items-center justify-between gap-2 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{alert.icon}</span>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                      {alert.label}
                    </span>
                  </div>
                  <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Option */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-slate-400 block">
              Or Send a Custom Notice to Owner
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Please call me at 98450... regarding gate block"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                onClick={() => {
                  if (customMessage.trim()) handleSendAlert(customMessage);
                }}
                disabled={!customMessage.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>

          {/* Success message banner */}
          {sentSuccess && (
            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Owner notified instantly via secure proxy alert!</span>
            </div>
          )}
        </div>

        {/* Cleaner Scan Workflow Option (PRD Section 15: Authenticated cleaner scan -> authorized service workflow) */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-slate-300 text-[11px]">
              CarCall Cleaner or Partner?
            </span>
          </div>

          <button
            onClick={() => setCurrentView("cleaner")}
            className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold text-[11px] border border-red-500/30 transition-colors cursor-pointer"
          >
            Authenticate & Start Wash →
          </button>
        </div>
      </div>
    </div>
  );
}
