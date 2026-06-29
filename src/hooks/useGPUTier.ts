"use client";

import { useState, useEffect } from "react";
import type { GPUTier } from "@/types";

/**
 * Detects the GPU capability tier of the current device.
 * Returns "high", "medium", or "low" based on WebGL capabilities.
 */
export function useGPUTier(): GPUTier {
  const [tier, setTier] = useState<GPUTier>("medium");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");

      if (!gl) {
        setTier("low");
        return;
      }

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
        : "";

      // Check for known high-end GPUs
      const highEnd = [
        "nvidia",
        "geforce rtx",
        "radeon rx",
        "radeon pro",
        "apple m",
        "apple gpu",
      ];
      const lowEnd = [
        "intel hd",
        "intel uhd",
        "mesa",
        "swiftshader",
        "llvmpipe",
        "software",
      ];

      if (highEnd.some((g) => renderer.includes(g))) {
        setTier("high");
      } else if (lowEnd.some((g) => renderer.includes(g))) {
        setTier("low");
      } else {
        // Check device pixel ratio and screen size as additional signals
        const dpr = window.devicePixelRatio || 1;
        const isMobile = window.innerWidth < 768;

        if (isMobile && dpr < 2) {
          setTier("low");
        } else if (isMobile) {
          setTier("medium");
        } else {
          setTier("high");
        }
      }

      canvas.remove();
    } catch {
      setTier("low");
    }
  }, []);

  return tier;
}
