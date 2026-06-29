"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { cn } from "@/utils";

interface FloatingKPIProps {
  icon: string;
  value: string;
  label: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Floating stat badge with glassmorphic background and reveal animation.
 */
export default function FloatingKPI({
  icon,
  value,
  label,
  delay = 0,
  className,
  style,
}: FloatingKPIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.8 + delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn("animate-float", className)}
      style={{ ...style, animationDelay: `${delay * 2}s` }}
    >
      <GlassCard
        variant="frosted"
        hover={false}
        className="flex items-center gap-3 px-4 py-3"
      >
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <div>
          <div className="text-sm font-bold text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
