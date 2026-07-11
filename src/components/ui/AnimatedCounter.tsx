"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AnimatedCounterProps {
  /** Target number to count up to */
  end: number;
  /** Animation duration in ms (default: 1800) */
  duration?: number;
  /** Text prepended before the number (e.g. "$", "~") */
  prefix?: string;
  /** Text appended after the number (e.g. "+", "%", "x") */
  suffix?: string;
  /** Number of decimal places (default: 0) */
  decimals?: number;
  /** Thousands separator character (default: "") */
  separator?: string;
  /** Whether to start on scroll-into-view (default: true) */
  startOnView?: boolean;
  /** External trigger — pass isInView from a parent observer */
  startTrigger?: boolean;
  /** Optional className on the wrapping span */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Ease-out cubic — slow deceleration for premium feel */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Format a number with optional decimal places and thousands separator */
function formatNumber(value: number, decimals: number, separator: string): string {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;
  const [int, dec] = fixed.split(".");
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return dec !== undefined ? `${formatted}.${dec}` : formatted;
}

/** Detect prefers-reduced-motion */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * AnimatedCounter — counts from 0 to `end` when scrolled into view (or on
 * `startTrigger`). Respects `prefers-reduced-motion`. Fires only once.
 */
export default function AnimatedCounter({
  end,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = "",
  startOnView = true,
  startTrigger,
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasStarted = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Own IntersectionObserver — only used when startOnView=true and no external trigger
  const [ownRef, ownInView] = useInView<HTMLSpanElement>({
    threshold: 0.3,
    once: true,
  });

  // Resolve which trigger to use
  const shouldStart =
    startTrigger !== undefined ? startTrigger : startOnView ? ownInView : true;

  const runAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Respect prefers-reduced-motion — jump to end immediately
    if (prefersReducedMotion()) {
      setDisplayValue(end);
      return;
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplayValue(eased * end);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end); // snap to exact final value
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [end, duration]);

  useEffect(() => {
    if (shouldStart) runAnimation();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldStart, runAnimation]);

  const rendered = formatNumber(displayValue, decimals, separator);

  return (
    <span
      ref={startTrigger === undefined && startOnView ? ownRef : undefined}
      className={className}
      aria-label={`${prefix}${end.toFixed(decimals)}${suffix}`}
    >
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}
