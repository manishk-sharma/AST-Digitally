"use client";

import { useState, useEffect } from "react";

/**
 * Tracks whether dark mode is active by observing the `dark` class on the
 * <html> element (the same class the theme toggle in the Footer flips).
 * Useful for non-CSS consumers such as the Three.js canvas scenes that need
 * to react to theme changes at runtime.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
