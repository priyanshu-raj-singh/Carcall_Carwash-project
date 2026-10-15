"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { CARCALL_CONTACT } from "@/data/carwashData";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Doorstep Car Wash",
    city: "Bengaluru",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct a prefilled WhatsApp message to immediately connect with CarCall support
    const text =
      `*📬 New Website Inquiry - CarCall*%0A%0A` +
      `• *Name:* ${formData.name.trim() || "Not specified"}%0A` +
      `• *Phone:* ${formData.phone.trim() || "Not specified"}%0A` +
      `• *Email:* ${formData.email.trim() || "Not specified"}%0A` +
      `• *Inquiry Type:* ${formData.serviceType}%0A` +
      `• *City / Area:* ${formData.city}%0A` +
      `• *Message:* ${encodeURIComponent(formData.message.trim() || "I would like more information about your doorstep car wash and QR services.")}`;

    const whatsappUrl = `https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=${text}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-4 sm:py-6 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7 space-y-2 sm:space-y-2.5">


          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase leading-tight">
            We&apos;re Here to Help. <br />
            <span className="text-red-600">Connect With Us Anytime.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base lg:text-lg">
            Have questions regarding apartment society wash permissions, corporate fleet booking,
            or emergency vehicle support? Reach out directly via WhatsApp, call, or message.
          </p>
        </div>

        {/* Contact Cards Grid (from carcall.in/contact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-5 sm:mb-7">
          {/* Card 1: WhatsApp 24x7 */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block">
                Fastest Response (~2 min)
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-950">WhatsApp 24X7</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                Direct chat with our concierge for bookings, slot re-scheduling, or immediate alerts.
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-slate-100">
              <a
                href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=Hi%20CarCall,%20I%20have%20an%20inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
              >
                <span>{CARCALL_CONTACT.phone}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone Support */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-red-700 bg-red-100/70 px-2 py-0.5 rounded-full inline-block">
                Voice Helpline
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-950">Phone Support</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                Speak directly with our operations team for bulk society partnerships and fleet queries.
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-slate-100">
              <a
                href={`tel:${CARCALL_CONTACT.phoneRaw}`}
                className="text-xs font-bold text-slate-900 hover:text-red-600 flex items-center gap-1.5 transition-colors"
              >
                <span>{CARCALL_CONTACT.phone}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email Support */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full inline-block">
                Official Inquiries
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-950">Email Support</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                Send formal proposals, RWA agreements, or partnership documents to our team.
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-slate-100">
              <a
                href={`mailto:${CARCALL_CONTACT.email}`}
                className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 transition-colors break-all"
              >
                <span>{CARCALL_CONTACT.email}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 4: Operating Hub & Office */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full inline-block">
                Registered Office
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-950">Bengaluru Hub</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-3 break-words">
                {CARCALL_CONTACT.address}
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>6:00 AM – 8:00 PM</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dual Column: Interactive Send a Message Form + Society Trust Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
            <div className="space-y-1.5 mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-950 tracking-tight">
                Send a Message or Query
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill out the details below. We will immediately coordinate via WhatsApp or call you back.
              </p>
            </div>

            {submitted ? (
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950">Message Sent to WhatsApp</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your inquiry has been compiled and opened in WhatsApp with our support desk. If WhatsApp didn’t open automatically, click below:
                </p>
                <div className="pt-1">
                  <a
                    href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=Hi%20CarCall,%20following%20up%20on%20my%20inquiry`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carcall-btn-whatsapp px-5 sm:px-6 py-3 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-xs min-h-[46px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 min-h-[46px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 min-h-[46px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 min-h-[46px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 min-h-[46px]"
                    >
                      <option value="Doorstep Car Wash">Doorstep Car Wash & Detailing</option>
                      <option value="Apartment Society Wash Pilot">Apartment Society / RWA Wash Pilot</option>
                      <option value="CarCall Dual QR Sticker">CarCall Dual Windshield QR Sticker</option>
                      <option value="Corporate Fleet Care">Corporate Fleet & Office Care</option>
                      <option value="General Support">General Support / Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your City / Apartment Complex
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, Prestige Lakeside or Mumbai, Powai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 min-h-[46px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message / Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your car, society wash rules, or preferred appointment day..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="carcall-btn-primary w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer min-h-[46px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to WhatsApp 24X7</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    🔒 Your contact details are never shared with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Society Partnership & Instant Contact Highlight */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="bg-gradient-to-br from-[#0b1a3d] via-slate-900 to-slate-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4 sm:space-y-5 border border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-[10px] sm:text-[11px] font-bold text-red-300">
                <Building className="w-3.5 h-3.5 text-red-400" />
                <span>RWA & Society Partnerships</span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight">
                Want CarCall in Your Apartment Complex?
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We partner with RWA committees and facility managers to provide certified,
                water-saving doorstep wash days and society QR emergency protection.
              </p>

              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified, police-cleared detailing technicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero basement puddles or water-run off guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Exclusive resident discounted bundle rates</span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=Hi%20CarCall,%20we%20want%20to%20discuss%20an%20Apartment%20Society%20Wash%20Partnership`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carcall-btn-whatsapp w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Society Demo / Pilot</span>
                </a>
              </div>
            </div>

            {/* Quick Operating Cities Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2.5 sm:space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Active Service Coverage Areas
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] sm:text-xs font-semibold">
                  Bengaluru (All Zones)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] sm:text-xs font-semibold">
                  Mumbai & Navi Mumbai
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] sm:text-xs font-semibold">
                  Delhi-NCR & Gurugram
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] sm:text-xs font-semibold">
                  Pune & Hyderabad
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Expanding to more tier-1 cities every month. Contact us for upcoming locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
