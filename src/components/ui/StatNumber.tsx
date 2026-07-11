"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

/**
 * StatNumber — parse a raw stat string like "500+", "98%", "24/7", "99.9%",
 * "5+" and render the animated counter with the correct suffix/prefix/decimals.
 *
 * Rules (applied in order):
 *   "24/7"  → animate 24, static "/7"
 *   "99.9%" → animate 99.9 with 1 decimal, suffix "%"
 *   "500+"  → animate 500, suffix "+"
 *   "98%"   → animate 98, suffix "%"
 *   "1,250+"→ animate 1250, separator ",", suffix "+"
 *   anything else → render as plain text
 *
 * Props:
 *   value        — raw string from constants (e.g. "500+")
 *   className    — forwarded to the AnimatedCounter span
 *   duration     — override animation duration (ms)
 *   startTrigger — external inView boolean (skips own observer if provided)
 */
interface StatNumberProps {
  value: string;
  className?: string;
  duration?: number;
  startTrigger?: boolean;
}

interface ParsedStat {
  numeric: number;
  decimals: number;
  prefix: string;
  suffix: string;
  separator: string;
  staticSuffix?: string; // appended after animated span (e.g. "/7")
  isAnimatable: boolean;
}

function parseStat(raw: string): ParsedStat {
  const trimmed = raw.trim();

  // "24/7" pattern — animate first number, show "/7" as static
  const slashMatch = trimmed.match(/^(\d+)\/(\d+)$/);
  if (slashMatch) {
    return {
      numeric: parseInt(slashMatch[1], 10),
      decimals: 0,
      prefix: "",
      suffix: "",
      staticSuffix: `/${slashMatch[2]}`,
      separator: "",
      isAnimatable: true,
    };
  }

  // Strip thousands commas for parsing
  const hasSeparator = trimmed.includes(",");
  const stripped = trimmed.replace(/,/g, "");

  // General pattern: optional prefix, numeric part (int or decimal), optional suffix
  const match = stripped.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { numeric: 0, decimals: 0, prefix: trimmed, suffix: "", separator: "", isAnimatable: false };
  }

  const [, rawPrefix, numStr, rawSuffix] = match;
  const num = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  // Non-animatable if it's not a clean number (e.g. "< 2hrs", "2-3")
  if (isNaN(num) || trimmed.match(/^[\d]+-[\d]+$/)) {
    return { numeric: 0, decimals: 0, prefix: trimmed, suffix: "", separator: "", isAnimatable: false };
  }

  return {
    numeric: num,
    decimals,
    prefix: rawPrefix,
    suffix: rawSuffix,
    separator: hasSeparator ? "," : "",
    isAnimatable: true,
  };
}

export default function StatNumber({
  value,
  className,
  duration = 1800,
  startTrigger,
}: StatNumberProps) {
  const parsed = parseStat(value);

  if (!parsed.isAnimatable) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      <AnimatedCounter
        end={parsed.numeric}
        prefix={parsed.prefix}
        suffix={parsed.suffix}
        decimals={parsed.decimals}
        separator={parsed.separator}
        duration={duration}
        startOnView={startTrigger === undefined}
        startTrigger={startTrigger}
      />
      {parsed.staticSuffix && (
        <span aria-hidden="true">{parsed.staticSuffix}</span>
      )}
    </span>
  );
}
