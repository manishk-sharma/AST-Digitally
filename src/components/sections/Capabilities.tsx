"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/lib/hooks/useInView";

export default function Capabilities() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.02 });

  return (
    <section
      id="services"
      className="section-padding bg-white relative overflow-hidden"
      aria-label="Features bento grid"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Features"
          title="Everything You Need to Grow Digitally"
          subtitle="A complete suite of digital services designed to help businesses build stronger brands, attract qualified customers, and achieve sustainable growth."
        />

        <div ref={ref} className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3">
          
          {/* Card 1: 100% Customizable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <GlassCard
              variant="solid"
              hover={true}
              className="p-6 md:p-7 h-[320px] border border-border bg-white flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              {/* Hand-drawn oval around 100% */}
              <div className="relative mb-6 flex items-center justify-center">
                <span className="text-4xl font-black text-foreground tracking-tight relative z-10">
                  100%
                </span>
                <svg className="absolute w-40 h-20 text-neutral-200 pointer-events-none" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10,50 C10,20 190,15 190,50 C190,80 15,85 10,50 Z" strokeDasharray="3 3" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-foreground font-sans uppercase tracking-wider">
                Customizable
              </h3>
            </GlassCard>
          </motion.div>

          {/* Card 2: Secure by default */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard
              variant="solid"
              hover={true}
              className="p-6 md:p-7 h-[320px] border border-border bg-white flex flex-col items-center justify-between text-center"
            >
              {/* Fingerprint graphic */}
              <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50/50 shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                <svg className="h-10 w-10 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 2a10 10 0 0 0-10 10c0 1.2.2 2.3.6 3.4M12 2a10 10 0 0 1 10 10c0 1.2-.2 2.3-.6 3.4" />
                  <path d="M12 6a6 6 0 0 0-6 6c0 1.2.2 2.3.6 3.4M12 6a6 6 0 0 1 6 6c0 1.2-.2 2.3-.6 3.4" />
                  <path d="M12 10a2 2 0 0 0-2 2c0 .5.1 1 .3 1.5M12 10a2 2 0 0 1 2 2" />
                  <line x1="8" y1="12" x2="8.01" y2="12" />
                  <line x1="16" y1="12" x2="16.01" y2="12" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-foreground font-sans uppercase tracking-wider">
                  Secure by default
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-neutral-600 font-medium">
                  Custom fingerprint validation and data encryption keep all platform processes isolated.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 3: Faster than light */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <GlassCard
              variant="solid"
              hover={true}
              className="p-6 md:p-7 h-[320px] border border-border bg-white flex flex-col items-center justify-between text-center"
            >
              {/* Chart/Download graphic */}
              <div className="w-full">
                <div className="flex items-center justify-between text-[11px] text-neutral-600 font-mono mb-2">
                  <span className="flex items-center gap-1 font-bold">
                    <svg className="h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    Download Speed
                  </span>
                  <span className="font-extrabold">14,34 mbps</span>
                </div>
                {/* Wavy line */}
                <svg className="w-full h-12 text-foreground" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0,15 Q15,5 30,12 T60,8 T90,20 T100,5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-foreground font-sans uppercase tracking-wider">
                  Faster than light
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-neutral-600 font-medium">
                  Optimized Next.js image loading and edge rendering ensure under 0.8s load times.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 4: Faster than light (Wide horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <GlassCard
              variant="solid"
              hover={true}
              className="p-6 md:p-7 min-h-[220px] border border-border bg-white flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-4 max-w-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50/50 shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                  <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-foreground font-sans uppercase tracking-wider">
                    Perfect PageSpeed
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-neutral-600 font-medium">
                    Custom compilation yields 99+ PageSpeed scores on all viewport widths.
                  </p>
                </div>
              </div>
              
              {/* Detailed stock sparkline chart with labels */}
              <div className="w-full md:w-1/2 border border-neutral-100 rounded-lg p-3 bg-neutral-50/20">
                <div className="flex justify-between text-[9px] text-neutral-500 font-bold uppercase tracking-wider mb-2 font-mono">
                  <span>Page Load Time</span>
                  <span>LCP: 0.6s</span>
                </div>
                <svg className="w-full h-24 text-foreground" viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10,65 L30,45 L50,55 L70,30 L90,50 L110,35 L130,55 L150,25 L170,40 L190,10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 5: Keep your loved ones safe (Wide horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-1"
          >
            <GlassCard
              variant="solid"
              hover={true}
              className="p-6 md:p-7 min-h-[220px] border border-border bg-white flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50/50 shadow-[0_2px_10px_rgba(0,0,0,0.025)] shrink-0">
                  <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                
                {/* Users profile stack */}
                <div className="flex flex-col gap-1.5 items-end text-[10px] font-mono font-bold uppercase text-foreground">
                  <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1">
                    <span>Likeur</span>
                    <span className="h-5 w-5 rounded-md bg-neutral-850" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1 translate-x-2">
                    <span className="h-5 w-5 rounded-md bg-neutral-900" />
                    <span>M. Irung</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1">
                    <span>B. Ng</span>
                    <span className="h-5 w-5 rounded-md bg-neutral-700" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 mt-4">
                <h3 className="text-sm font-extrabold text-foreground font-sans uppercase tracking-wider">
                  Secure team access
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-neutral-600 font-medium font-sans">
                  Configure team governance, permission policies, and secure workspace permissions.
                </p>
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
