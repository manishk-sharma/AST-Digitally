"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import SceneLoader from "@/components/ui/SceneLoader";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero section with decorative canvas, floating icons and infinite scrolling stats ticker.
 */
export default function Hero() {
  // The decorative globe is only visible at lg+ (it's `w-0` below). Gate the
  // WebGL canvas to that breakpoint so mobile/tablet don't spin up a hidden
  // Three.js scene.
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const tickerStats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Project Support" },
    { value: "99.9%", label: "Platform Reliability" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[auto] sm:min-h-[100svh] flex-col justify-between overflow-hidden pt-20 sm:pt-28 md:pt-40 pb-8 sm:pb-12"
      aria-label="Hero section"
    >
      {/* 3D Dotted Globe — only mounted at lg+ where it's actually visible */}
      <div className="absolute top-0 right-0 w-0 lg:w-[58%] h-[100svh] pointer-events-none">
        {isDesktop && <HeroScene />}
      </div>

      {/* Content Container */}
      <div className="container-wide w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 items-center">
          {/* Left: Heading and description */}
          <div className="lg:col-span-7 w-full min-w-0">
            {/* Monospace Badge Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono tracking-wider text-muted-foreground uppercase mb-4 sm:mb-6"
            >
              <span className="h-px w-6 sm:w-8 bg-muted-foreground/30 shrink-0" />
              <span className="leading-relaxed">Digital Marketing & Smart Technology Solutions</span>
            </motion.div>

            {/* Stark Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 sm:mb-6 md:mb-8 text-[clamp(1.5rem,5.5vw,4.5rem)] font-extrabold tracking-tight text-foreground leading-[1.15] break-words"
            >
              Transform Your Business with Digital Marketing &{" "}
              <span className="underline-highlight">Smart Technology Solutions</span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed text-neutral-600 md:text-lg max-w-xl"
            >
              We design, market, automate, and scale businesses with creative strategies and custom digital solutions that deliver real results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-lg bg-primary text-primary-foreground px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-primary/90 shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 w-full sm:w-auto"
                )}
              >
                Book Free Consultation
                <span className="text-base">→</span>
              </a>
              <a
                href="#services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-lg border-border bg-white text-foreground px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-secondary/20 shadow-[0_2px_10px_rgba(0,0,0,0.035)] text-center w-full sm:w-auto"
                )}
              >
                Explore Services
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Fold: Infinite Scrolling Stats Ticker */}
        <div className="mt-10 sm:mt-20 md:mt-28 border-t border-border pt-6 sm:pt-8 md:pt-10 relative overflow-hidden select-none w-full">
          <div className="animate-marquee-left flex gap-8 sm:gap-12 items-center pr-8 sm:pr-12">
            {[...tickerStats, ...tickerStats, ...tickerStats, ...tickerStats].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                <span className="text-xl sm:text-2xl md:text-4xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-neutral-700 uppercase tracking-wider font-bold">
                  {stat.label}
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-300 mx-1 sm:mx-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
