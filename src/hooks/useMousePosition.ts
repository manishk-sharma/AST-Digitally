"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  /** Normalized X position (-1 to 1, 0 = center) */
  x: number;
  /** Normalized Y position (-1 to 1, 0 = center) */
  y: number;
  /** Raw pixel X */
  clientX: number;
  /** Raw pixel Y */
  clientY: number;
}

/**
 * Tracks normalized mouse position across the viewport.
 * X and Y values range from -1 to 1, with (0,0) being viewport center.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
