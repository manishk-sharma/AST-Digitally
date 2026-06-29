"use client";

import { cn } from "@/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "frosted" | "solid";
  glowColor?: "blue" | "purple" | "cyan" | "none";
  hover?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable glassmorphic and clean container adjusted for light mode.
 */
export default function GlassCard({
  variant = "glass",
  glowColor = "none",
  hover = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card shadow-[0_2px_10px_rgba(0,0,0,0.035)] transition-all duration-300",
        // Variant styles
        variant === "glass" && "glass",
        variant === "frosted" && "glass-strong",
        variant === "solid" && "bg-white",
        // Hover effects
        hover && [
          "hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.055)] hover:border-neutral-300",
          glowColor !== "none" && "hover:border-neutral-500",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
