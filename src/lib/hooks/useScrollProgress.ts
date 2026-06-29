"use client";

import { useState, useEffect } from "react";

/**
 * Returns the current scroll progress (0-1) within the document.
 * Optionally tracks scroll progress within a specific element.
 */
export function useScrollProgress(elementRef?: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current) {
        const el = elementRef.current;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        // Calculate progress: 0 when element enters viewport, 1 when it leaves
        const rawProgress =
          (windowHeight - elementTop) / (windowHeight + elementHeight);
        setProgress(Math.max(0, Math.min(1, rawProgress)));
      } else {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial value
    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return progress;
}
