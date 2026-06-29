"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import SceneLoader from "@/components/ui/SceneLoader";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
  loading: () => <SceneLoader className="absolute inset-0" />,
});

/**
 * Hero section with decorative canvas, floating icons and infinite scrolling stats ticker.
 */
export default function Hero() {
  const tickerStats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Project Support" },
    { value: "99.9%", label: "Platform Reliability" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-32 md:pt-40 pb-12"
      aria-label="Hero section"
    >
      {/* 3D Dotted Globe */}
      <div className="absolute top-0 right-0 w-0 md:w-[58%] h-screen pointer-events-none md:pointer-events-auto">
        <HeroScene />
      </div>

      {/* Content Container */}
      <div className="container-wide relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Heading and description */}
          <div className="lg:col-span-7 max-w-3xl">
            {/* Monospace Badge Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground uppercase mb-6"
            >
              <span className="h-px w-8 bg-muted-foreground/30" />
              Digital Marketing & Smart Technology Solutions
            </motion.div>

            {/* Stark Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] max-w-2xl"
            >
              Transform Your Business with Digital Marketing &{" "}
              <span className="underline-highlight">Smart Technology Solutions</span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg font-normal"
            >
              We design, market, automate, and scale businesses with creative strategies and custom digital solutions that deliver real results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-lg bg-primary text-primary-foreground px-6 py-4 text-sm font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-[1.01] shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center gap-2"
                )}
              >
                Book Free Consultation
                <span className="text-base">→</span>
              </a>
              <a
                href="#services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-lg border-border bg-white text-foreground px-6 py-4 text-sm font-semibold transition-all duration-300 hover:bg-secondary/20 hover:scale-[1.01] shadow-[0_2px_10px_rgba(0,0,0,0.035)]"
                )}
              >
                Explore Services
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Fold: Infinite Scrolling Stats Ticker */}
        <div className="mt-24 md:mt-32 border-t border-border pt-10 relative overflow-hidden select-none w-full">
          <div className="animate-marquee-left flex gap-12 items-center pr-12">
            {[...tickerStats, ...tickerStats, ...tickerStats, ...tickerStats].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 whitespace-nowrap">
                <span className="text-3xl md:text-4xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-xs md:text-sm text-neutral-700 uppercase tracking-wider font-bold">
                  {stat.label}
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-300 mx-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
