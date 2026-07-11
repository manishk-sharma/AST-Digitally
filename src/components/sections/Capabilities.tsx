"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function Capabilities() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  // Framer Motion variants for staggered container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const teamListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const teamMemberVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100, damping: 12 } },
  };

  return (
    <section
      id="capabilities"
      className="section-padding bg-background relative overflow-hidden"
      aria-label="Features bento grid"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Why AST Digitally"
          title="Built for Performance & Growth"
          subtitle="We combine creativity, technology, and strategy to deliver digital solutions that drive real business results."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3"
        >
          
          {/* Card 1: 100% Customizable */}
          <motion.div variants={itemVariants}>
            <div
              className="premium-card p-6 md:p-7 min-h-[200px] md:h-[320px] flex flex-col items-center justify-center text-center relative overflow-hidden group"
            >
              {/* Hand-drawn oval around 100% */}
              <div className="relative mb-6 flex items-center justify-center">
                <span className="text-4xl font-black text-accent tracking-tight relative z-10">
                  <AnimatedCounter end={100} duration={1200} suffix="%" startTrigger={isInView} />
                </span>
                <svg className="absolute w-40 h-20 text-neutral-200 pointer-events-none" viewBox="0 0 200 100" fill="none">
                  <motion.path
                    d="M10,50 C10,20 190,15 190,50 C190,80 15,85 10,50 Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              <h3 className="text-[22px] font-heading font-extrabold text-foreground tracking-tight">
                Customizable
              </h3>
            </div>
          </motion.div>

          {/* Card 2: Secure by default */}
          <motion.div variants={itemVariants}>
            <div
              className="premium-card p-6 md:p-7 min-h-[200px] md:h-[320px] flex flex-col items-center justify-between text-center group"
            >
              {/* Fingerprint graphic */}
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                <svg className="h-10 w-10 text-inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <motion.path
                    d="M12 2a10 10 0 0 0-10 10c0 1.2.2 2.3.6 3.4M12 2a10 10 0 0 1 10 10c0 1.2-.2 2.3-.6 3.4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  />
                  <motion.path
                    d="M12 6a6 6 0 0 0-6 6c0 1.2.2 2.3.6 3.4M12 6a6 6 0 0 1 6 6c0 1.2-.2 2.3-.6 3.4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  />
                  <motion.path
                    d="M12 10a2 2 0 0 0-2 2c0 .5.1 1 .3 1.5M12 10a2 2 0 0 1 2 2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  />
                  <line x1="8" y1="12" x2="8.01" y2="12" />
                  <line x1="16" y1="12" x2="16.01" y2="12" />
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="text-[22px] font-heading font-extrabold text-foreground tracking-tight">
                  Secure by default
                </h3>
                <p className="text-paragraph text-sm">
                  Custom fingerprint validation and data encryption keep all platform processes isolated.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Faster than light */}
          <motion.div variants={itemVariants}>
            <div
              className="premium-card p-6 md:p-7 min-h-[200px] md:h-[320px] flex flex-col items-center justify-between text-center group"
            >
              {/* Chart/Download graphic */}
              <div className="w-full">
                <div className="flex items-center justify-between text-[11px] text-neutral-600 font-mono mb-2">
                  <span className="flex items-center gap-1 font-bold">
                    <motion.svg 
                      animate={isInView ? { y: [0, 3, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="h-3.5 w-3.5 text-black" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </motion.svg>
                    Download Speed
                  </span>
                  <span className="font-extrabold text-accent">
                    <AnimatedCounter end={14.34} duration={1600} decimals={2} suffix=" mbps" startTrigger={isInView} />
                  </span>
                </div>
                {/* Wavy line */}
                <svg className="w-full h-12 text-foreground" viewBox="0 0 100 30" fill="none">
                  <motion.path
                    d="M0,15 Q15,5 30,12 T60,8 T90,20 T100,5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="text-[22px] font-heading font-extrabold text-foreground tracking-tight">
                  Faster than light
                </h3>
                <p className="text-paragraph text-sm">
                  Optimized Next.js image loading and edge rendering ensure under 0.8s load times.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Perfect PageSpeed (Wide horizontal) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2"
          >
            <div
              className="premium-card p-6 md:p-7 min-h-[220px] flex flex-col md:flex-row items-center justify-between gap-6 group"
            >
              <div className="space-y-4 max-w-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1">
                  <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[22px] font-heading font-extrabold text-foreground tracking-tight">
                    Perfect PageSpeed
                  </h3>
                  <p className="text-paragraph text-sm">
                    Custom compilation yields 99+ PageSpeed scores on all viewport widths.
                  </p>
                </div>
              </div>
              
              {/* Detailed stock sparkline chart with labels */}
              <div className="w-full md:w-1/2 border border-border p-3 bg-card relative overflow-hidden">
                <div className="flex justify-between text-[9px] text-muted-foreground font-bold uppercase tracking-wider mb-2 font-mono">
                  <span>Page Load Time</span>
                  <span className="flex items-center gap-1">
                    LCP: <AnimatedCounter end={0.6} duration={1200} decimals={1} suffix="s" startTrigger={isInView} />
                  </span>
                </div>
                <svg className="w-full h-24 text-foreground" viewBox="0 0 200 80" fill="none">
                  <motion.path
                    d="M10,65 L30,45 L50,55 L70,30 L90,50 L110,35 L130,55 L150,25 L170,40 L190,10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                  {/* Glowing end point indicator */}
                  <motion.circle
                    cx="190"
                    cy="10"
                    r="3.5"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [0, 1.8, 1], opacity: [0, 1, 1] } : { scale: 0 }}
                    transition={{ delay: 1.8, duration: 0.4 }}
                  />
                  <motion.circle
                    cx="190"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { scale: [1, 2, 1], opacity: [0, 0.4, 0] } : { opacity: 0 }}
                    transition={{ delay: 2.2, repeat: Infinity, duration: 2 }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Secure team access (Wide horizontal) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1"
          >
            <div
              className="premium-card p-6 md:p-7 min-h-[220px] flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-accent/10 text-accent shrink-0 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1">
                  <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                
                {/* Users profile stack - staggered slide in from right */}
                <motion.div 
                  variants={teamListVariants}
                  className="flex flex-col gap-1.5 items-end text-[10px] font-mono font-bold uppercase text-foreground"
                >
                  <motion.div 
                    variants={teamMemberVariants}
                    className="flex items-center gap-1.5 bg-card border border-border px-2.5 py-1 transition-colors hover:bg-black hover:text-white cursor-default"
                  >
                    <span>Likeur</span>
                    <span className="h-5 w-5 bg-black flex items-center justify-center text-[8px] text-white">L</span>
                  </motion.div>
                  <motion.div 
                    variants={teamMemberVariants}
                    className="flex items-center gap-1.5 bg-card border border-border px-2.5 py-1 translate-x-2 transition-colors hover:bg-black hover:text-white cursor-default"
                  >
                    <span className="h-5 w-5 bg-black flex items-center justify-center text-[8px] text-white">M</span>
                    <span>M. Irung</span>
                  </motion.div>
                  <motion.div 
                    variants={teamMemberVariants}
                    className="flex items-center gap-1.5 bg-card border border-border px-2.5 py-1 transition-colors hover:bg-black hover:text-white cursor-default"
                  >
                    <span>B. Ng</span>
                    <span className="h-5 w-5 bg-black flex items-center justify-center text-[8px] text-white">B</span>
                  </motion.div>
                </motion.div>
              </div>

              <div className="space-y-3 mt-4">
                <h3 className="text-[22px] font-heading font-extrabold text-foreground tracking-tight">
                  Secure team access
                </h3>
                <p className="text-paragraph text-sm">
                  Configure team governance, permission policies, and secure workspace permissions.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
