"use client";

import React from "react";
import { Car, ShieldCheck, Leaf, Users, Heart, Sparkles, MapPin, Clock } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Trained Professionals",
      desc: "Every cleaner is background-checked, professionally trained, and certified in waterless detailing techniques.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      desc: "We use 100% biodegradable, plant-based formulas that protect your paint and Bengaluru's water supply.",
    },
    {
      icon: Users,
      title: "Community First",
      desc: "Designed for dense apartment communities where parking is shared and water is precious.",
    },
    {
      icon: Heart,
      title: "Built with Care",
      desc: "CarCall is made in India for Indian roads, weather, and car ownership realities.",
    },
  ];

  return (
    <section id="about" className="py-5 sm:py-7 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About CarCall</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase leading-[1.05]">
              Premium Doorstep Car Care, <br />
              <span className="text-red-600">Made for Indian Roads.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              CarCall Cleaning is the recurring doorstep vehicle-maintenance layer of the CarCall platform. 
              Operating across dense apartment communities in North Bengaluru, we deliver professional, 
              waterless car care at your home, apartment, or office — anytime, without the mess.
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Our trained professionals use eco-friendly, biodegradable formulas to deliver a premium gloss finish 
              while conserving water. Every service is tracked digitally, giving you complete visibility into 
              your car's maintenance history.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Flexible Scheduling</h4>
                  <p className="text-xs text-slate-500">Book on your terms, 7 days a week</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Doorstep Service</h4>
                  <p className="text-xs text-slate-500">We come to your parking spot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm mb-1.5">{value.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}