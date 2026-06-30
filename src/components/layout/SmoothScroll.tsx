"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Client component wrapper that initializes Lenis smooth scrolling.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();
  return <>{children}</>;
}
