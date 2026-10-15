"use client";

import React from "react";
import { useCarCall } from "@/context/CarCallContext";
import { X, MessageCircle, CheckCheck, Sparkles, ExternalLink } from "lucide-react";
import { CARCALL_CONTACT } from "@/data/carwashData";

export default function WhatsAppNotificationModal() {
  const {
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    notifications,
    setCurrentView,
  } = useCarCall();

  if (!isNotificationsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#efeae2] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-300 flex flex-col max-h-[85vh]">
        {/* WhatsApp App Header Bar */}
        <div className="bg-[#008069] text-white p-3.5 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              CC
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold leading-tight">
                  CarCall Verified Care
                </h3>
                <span className="bg-[#25d366] text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  OFFICIAL
                </span>
              </div>
              <p className="text-[11px] text-white/80">
                Automated Notification Stream
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationsModalOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-center my-2">
            <span className="bg-[#ffffff]/80 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-2xs">
              MESSAGES ARE END-TO-END ENCRYPTED
            </span>
          </div>

          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-white rounded-xl rounded-tl-xs p-3.5 shadow-xs max-w-[90%] space-y-2 border border-slate-200/60 ml-0 animate-in fade-in"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-black text-slate-900 leading-snug">
                  {notif.title}
                </h4>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {notif.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {notif.message}
              </p>

              {notif.linkText && (
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => {
                      if (notif.linkAction) {
                        setCurrentView(notif.linkAction as any);
                        setIsNotificationsModalOpen(false);
                      }
                    }}
                    className="text-xs font-bold text-[#008069] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{notif.linkText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex justify-end items-center gap-1 text-[10px] text-slate-400 pt-0.5">
                <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom WhatsApp bar */}
        <div className="bg-[#f0f2f5] p-2.5 px-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Replies handled 24/7 by CarCall Support</span>
          <a
            href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#008069] hover:underline"
          >
            Open Real WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
