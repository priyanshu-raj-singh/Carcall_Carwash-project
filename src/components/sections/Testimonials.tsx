"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "@/data/carwashData";
import { Star, Quote, MapPin, Building, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update scroll boundaries & active dot index on scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate nearest card index
    const firstCard = scrollRef.current.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 20; // width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(TESTIMONIALS.length - 1, index)));
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to a specific card index
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 20;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement;
    const step = firstCard ? firstCard.offsetWidth + 20 : 320;
    scrollRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement;
    const step = firstCard ? firstCard.offsetWidth + 20 : 320;
    scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  // Mouse Drag-to-Scroll support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 5) setHasMoved(true);
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-4 sm:py-6 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title & Desktop Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 sm:mb-7">
          <div className="text-center md:text-left max-w-2xl space-y-1.5 sm:space-y-2">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase">
              Trusted in 80+ <br className="hidden sm:inline" />
              <span className="text-red-600">Apartment Communities.</span>
            </h2>

            <p className="text-slate-600 text-xs sm:text-base">
              Read what luxury and daily car drivers say about our doorstep foam care and interior hygiene:
            </p>
          </div>

          {/* Left/Right Arrows for Navigation */}
          <div className="flex items-center justify-center md:justify-end gap-2.5">
            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? "bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm hover:scale-105 active:scale-95"
                  : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? "bg-slate-900 hover:bg-red-600 border-slate-900 hover:border-red-600 text-white shadow-md hover:scale-105 active:scale-95"
                  : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Reviews Carousel Track (Strictly One Row on Desktop, Never Wraps) */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex flex-nowrap gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth no-scrollbar ${
            isDragging ? "cursor-grabbing select-none scroll-auto" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: isDragging ? "none" : "x mandatory",
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              style={{ scrollSnapAlign: "start" }}
              className="w-[84vw] max-w-[320px] xs:max-w-[340px] sm:w-[360px] md:w-[380px] lg:w-[calc(25%-15px)] lg:min-w-[280px] shrink-0 bg-slate-50/70 hover:bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between border border-slate-200/90 hover:border-red-400/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="space-y-3">
                {/* Header: Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 group-hover:text-red-400/60 transition-colors shrink-0" />
                </div>

                {/* Comment */}
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed italic line-clamp-4 font-normal">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Package Tag */}
                <div className="pt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-red-600 shadow-2xs">
                    Package: {t.packageUsed}
                  </span>
                </div>
              </div>

              {/* Author & Society Info */}
              <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-white text-xs border-2 border-white shadow-xs shrink-0">
                  {t.avatarText}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-950 truncate">
                    {t.name}
                  </h4>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                    <p className="text-slate-800 font-semibold truncate">{t.car}</p>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="flex items-center gap-0.5 text-blue-700 font-medium truncate">
                        <Building className="w-3 h-3 shrink-0" />
                        <span className="truncate">{t.society}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-500 shrink-0">
                        <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                        <span>{t.location.split(',')[0]}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Interactive Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-7 bg-red-600 shadow-sm shadow-red-600/40"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
