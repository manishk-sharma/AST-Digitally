"use client";

import { useState, useEffect } from "react";

/**
 * Tracks whether a CSS media query currently matches.
 * Returns `false` on the server / first paint, then updates after mount and on
 * subsequent viewport changes. Useful for gating expensive client-only work
 * (e.g. mounting a WebGL canvas) to the breakpoints where it is actually shown.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
