"use client";

import React, { useState } from "react";
import { CARCALL_CONTACT } from "@/data/carwashData";
import { ChevronDown, MessageCircle } from "lucide-react";

// Exactly 4 essential FAQs with verified existing answers
const FOUR_FAQS = [
  {
    question: "How does CarCall Cleaning differ from a conventional one-off car wash?",
    answer: "CarCall is a recurring society-based vehicle maintenance layer. Instead of waiting in lines or booking one-off washes, customers subscribe to predictable monthly maintenance visits (such as our Hero Plan 'CarCall Care' with 6 visits/month). Every visit creates a verified digital service history with photos.",
    category: "Subscription & Cadence",
  },
  {
    question: "Will our Apartment Association (RWA) or security allow this in our basement?",
    answer: "Yes, 100%! We exclusively use eco-friendly waterless polymer washes and low-moisture misting. There are zero puddles, zero messy floor runoff, and zero water wastage, fully compliant with strict apartment society water guidelines across North Bengaluru.",
    category: "Apartment Rules & Water",
  },
  {
    question: "What is included in the Hero Plan — CarCall Care at ₹499/month?",
    answer: "CarCall Care provides 6 visits per month: 6 exterior waterless cleans and 4 basic cabin vacuums. Cadence: Week 1 (Ext+Int), Week 2 (Ext), Week 3 (Ext+Int), Week 4 (Ext), plus 2 flexible exterior visits scheduled during the month. 2–3 digital inspection photos are uploaded every service.",
    category: "Service Standards",
  },
  {
    question: "Does the CarCall windshield QR sticker expose my personal phone number to strangers?",
    answer: "Never. The QR sticker contains only a unique opaque token. When a bystander or parking guard scans it, they can send you instant 1-tap alerts (such as blocked parking, window open, headlights left on) through CarCall's encrypted proxy without ever seeing your phone number.",
    category: "QR & Digital Records",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Subscription & Cadence",
    "Apartment Rules & Water",
    "Service Standards",
    "QR & Digital Records",
  ];

  const filteredFaqs = activeCategory === "All"
    ? FOUR_FAQS
    : FOUR_FAQS.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faqs" className="py-4 sm:py-6 relative overflow-hidden bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-2 sm:space-y-2.5">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
            Frequently Asked <br />
            <span className="text-red-600">Questions.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base">
            Everything you need to know about our low-water mobile detailing and apartment compliance:
          </p>
        </div>

        {/* Interactive Category Filter Pills (Filtered exclusively within the 4 FAQs) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-4 sm:mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exactly 4 FAQ Accordion Items */}
        <div className="space-y-2.5 sm:space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={faq.question}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-red-400 bg-white shadow-md ring-2 ring-red-500/10"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-4 sm:py-4.5 px-4 sm:px-6 md:px-7 flex items-center justify-between text-left gap-3 sm:gap-4 cursor-pointer min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-base font-bold text-slate-950 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? "rotate-180 bg-red-600 border-red-600 text-white"
                        : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-2.5 text-[10px] sm:text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-5 sm:mt-6 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-slate-950">
            Have a custom apartment or corporate fleet requirement?
          </h4>
          <p className="text-xs text-slate-600">
            Our 24X7 customer team is available on WhatsApp to answer special requests, bulk society discounts, and customized timings.
          </p>
          <a
            href={`https://wa.me/${CARCALL_CONTACT.phoneRaw}?text=Hi%20CarCall,%20I%20have%20a%20question%20about%20your%20Car%20Wash%20service`}
            target="_blank"
            rel="noopener noreferrer"
            className="carcall-btn-whatsapp inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md min-h-[44px] w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
