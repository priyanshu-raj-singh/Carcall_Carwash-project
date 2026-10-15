"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HeroBeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function HeroBeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before / Dusty",
  afterLabel = "After / Clean",
  className = "",
}: HeroBeforeAfterSliderProps) {
  const [position, setPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Update slider position based on mouse/touch X coordinate
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const percent = (clampedX / rect.width) * 100;
    // Keep between 2% and 98% for clean handle visibility
    const clampedPercent = Math.max(2, Math.min(98, percent));
    setPosition(clampedPercent);
  }, []);

  // Subtle first-load nudge animation to demonstrate that the slider is interactive
  useEffect(() => {
    if (hasUserInteracted) return;

    let startTime: number | null = null;
    const duration = 1400; // ms
    const initialDelay = 600; // ms

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < duration && !hasUserInteracted) {
          // Sine wave oscillation: 50% -> 42% -> 58% -> 50%
          const progress = elapsed / duration;
          const offset = Math.sin(progress * Math.PI * 2) * 10;
          setPosition(50 + offset);
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          setPosition(50);
        }
      };
      animFrameRef.current = requestAnimationFrame(animate);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasUserInteracted]);

  // Pointer event handlers with pointer capture for seamless desktop & mobile tracking
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setHasUserInteracted(true);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if pointer capture is not supported
    }
    
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setHasUserInteracted(true);
      setPosition((prev) => Math.max(2, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setHasUserInteracted(true);
      setPosition((prev) => Math.min(98, prev + 5));
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`relative select-none overflow-hidden rounded-3xl shadow-2xl border-2 border-slate-200/90 w-full aspect-[3/4] cursor-ew-resize group ${className}`}
      style={{
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      role="slider"
      aria-label="CarCall interactive before and after car wash slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* LAYER 1 (BASE): AFTER / CLEAN IMAGE */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={afterImage}
          alt="CarCall After Wash Clean Finished Car"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
          draggable={false}
        />
      </div>

      {/* LAYER 2 (OVERLAY): BEFORE / DUSTY IMAGE (CLIPPED BASED ON SLIDER POSITION) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt="CarCall Before Wash Dusty Car"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
          draggable={false}
        />
      </div>

      {/* VERTICAL DIVIDER LINE WITH SUBTLE GLOW */}
      <div
        className="absolute top-0 bottom-0 w-[2.5px] bg-white pointer-events-none z-20 shadow-[0_0_12px_rgba(255,255,255,0.95),0_0_24px_rgba(239,68,68,0.6)]"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
        }}
      />

      {/* CIRCULAR HANDLE (MATCHING SCREENSHOT WITH RED CIRCLE & WHITE ARROWS) */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-600 border-[2.5px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.45),0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center z-30 transition-transform ${
          isDragging ? "scale-110 shadow-2xl ring-4 ring-red-500/30" : "group-hover:scale-105"
        }`}
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-0.5 text-white">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
        </div>
      </div>

      {/* BEFORE / DUSTY BADGE (TOP LEFT) */}
      <div className="absolute top-3.5 left-3.5 z-20 bg-slate-950/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-full border border-white/20 shadow-md pointer-events-none tracking-wider">
        {beforeLabel}
      </div>

      {/* AFTER / CLEAN BADGE (TOP RIGHT) */}
      <div className="absolute top-3.5 right-3.5 z-20 bg-red-600/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-full border border-white/20 shadow-md pointer-events-none tracking-wider">
        {afterLabel}
      </div>

      {/* FLOATING DRAG INSTRUCTION PILL (BOTTOM CENTER) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-lg pointer-events-none flex items-center gap-1.5 transition-opacity duration-300 ${
          isDragging ? "opacity-30" : "opacity-90 group-hover:opacity-100"
        }`}
      >
        <span>↔ Drag to compare</span>
      </div>
    </div>
  );
}
