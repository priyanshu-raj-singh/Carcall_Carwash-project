"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCarCall } from "@/context/CarCallContext";
import { Mail, MessageCircle, Heart, MapPin, Phone, ShieldCheck, QrCode } from "lucide-react";
import { CARCALL_CONTACT } from "@/data/carwashData";

export default function Footer() {
  const { setCurrentView, openSubscribeModal } = useCarCall();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs pt-5 sm:pt-6 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-200">
          {/* Brand Info with official CarCall Logo */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-3.5 sm:space-y-4">
            <div
              onClick={() => setCurrentView("landing")}
              className="flex items-center gap-2 group shrink-0 cursor-pointer"
              aria-label="CarCall Home"
            >
              <div className="relative h-7 sm:h-8 w-28 sm:w-34 flex items-center">
                <Image
                  src="/Carcall-logo.png"
                  alt="CarCall"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 112px, 136px"
                />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200 shadow-xs">
                CLEANING v2.0
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              CarCall Cleaning is the recurring doorstep vehicle-maintenance layer of the CarCall platform. Operating across dense apartment communities in North Bengaluru with waterless eco-formulas, simple cleaner workflows, and persistent digital service history.
            </p>

            <div className="pt-1 flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp 24X7: </span>
                <a
                  href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}`}
                  className="font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  {CARCALL_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <span>Voice Support: </span>
                <a
                  href={`tel:${CARCALL_CONTACT.phoneRaw}`}
                  className="font-bold text-slate-900 hover:text-red-600 transition-colors"
                >
                  {CARCALL_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700 min-w-0">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="shrink-0">Email: </span>
                <a
                  href={`mailto:${CARCALL_CONTACT.email}`}
                  className="font-bold text-slate-900 hover:text-red-600 transition-colors break-all"
                >
                  {CARCALL_CONTACT.email}
                </a>
              </div>
              <div className="flex items-start gap-2 text-slate-700 pt-0.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-500 leading-snug break-words">
                  {CARCALL_CONTACT.address}
                </span>
              </div>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider">
              Subscription Plans
            </h4>
            <ul className="space-y-2 text-slate-600 text-xs">
              <li>
                <button
                  onClick={() => openSubscribeModal()}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Basic (₹299/mo • 4 Visits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openSubscribeModal()}
                  className="hover:text-red-600 transition-colors text-left font-bold text-slate-800"
                >
                  CarCall Care ⭐ (₹499/mo • 6 Visits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openSubscribeModal()}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Plus (₹399/mo • 4 Visits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openSubscribeModal()}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Pro (₹599/mo • 8 Visits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openSubscribeModal()}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Premium (₹699/mo • 8 Visits)
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Portals */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider">
              Interactive Portals
            </h4>
            <ul className="space-y-2 text-slate-600 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView("mycar")}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Customer 'My Car'</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("cleaner")}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Cleaner Mobile PWA</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("supervisor")}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Supervisor Operations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("qr-scan")}
                  className="hover:text-red-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Windshield QR Scan</span>
                </button>
              </li>
            </ul>
          </div>

          {/* North BLR Societies & Trust */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider">
              North BLR Network
            </h4>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li>• Sobha City (Thanisandra)</li>
              <li>• Prestige Willow Green (Vidyaranyapura)</li>
              <li>• Brigade Caladium (Hebbal)</li>
              <li>• Godrej Platinum (Hebbal)</li>
              <li>• Mantri Webcity (Hennur)</li>
            </ul>

            <div className="pt-2">
              <a
                href={CARCALL_CONTACT.mainWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Visit CarCall.in Ecosystem →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} CarCall Cleaning (CarCall Technologies Pvt. Ltd.). Version 2.0 | September 2026.</p>
          <p className="flex items-center gap-1">
            <span>Built with care for Bengaluru apartment communities</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
