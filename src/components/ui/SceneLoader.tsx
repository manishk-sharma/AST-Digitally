"use client";

import { cn } from "@/utils";

interface SceneLoaderProps {
  className?: string;
}

/**
 * Loading fallback for WebGL scenes with shimmer skeleton effect.
 */
export default function SceneLoader({ className }: SceneLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-border bg-card/50 shadow-[0_2px_10px_rgba(0,0,0,0.035)]",
        className
      )}
      role="status"
      aria-label="Loading 3D scene"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing orb */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-black/10 dark:bg-white/10" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-br from-black/20 to-black/40 dark:from-white/20 dark:to-white/40" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading experience...
        </p>
      </div>
    </div>
  );
}
