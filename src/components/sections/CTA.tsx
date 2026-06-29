"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";

export default function CTA() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="py-20 bg-white relative overflow-hidden" aria-label="Call to action banner">
      <div ref={ref} className="container-wide max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 relative overflow-hidden"
        >

          {/* Left Side: Floating service pills around a large "D" */}
          <div className="relative w-full lg:w-[45%] h-[220px] flex items-center justify-center select-none shrink-0">

            {/* Center "D" letterform — soft decorative watermark */}
            <div
              className="text-[120px] font-black text-neutral-300/40 leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              D
            </div>

            {/* Floating Pill: Graphic Design — top-left */}
            <div className="absolute left-4 md:left-6 top-12 px-4 py-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 shadow-sm">
              Graphic Design
            </div>

            {/* Floating Pill: Branding — top-center with red cursor */}
            <div className="absolute left-[38%] top-2 md:top-4 px-4 py-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 shadow-sm">
              Branding
            </div>
            {/* Red mouse cursor pointer next to Branding */}
            <svg
              className="absolute left-[55%] top-[52px] md:top-[56px] h-4 w-3 text-red-500 pointer-events-none"
              viewBox="0 0 12 18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0v18l4.5-4.5L8 18l2.5-1L7 12.5 12 12z" />
            </svg>

            {/* Floating Pill: Web Application — right-center */}
            <div className="absolute right-2 md:right-6 bottom-[55px] px-4 py-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 shadow-sm">
              Web Application
            </div>

            {/* Floating Pill: UI-UX — bottom-left */}
            <div className="absolute left-10 md:left-16 bottom-4 px-4 py-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 shadow-sm">
              UI-UX
            </div>
          </div>

          {/* Right Side: Headline + CTA buttons */}
          <div className="w-full lg:w-[55%] space-y-5 text-left relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[42px] leading-[1.15]">
              Any questions about{" "}
              <br className="hidden sm:block" />
              Design?
            </h2>
            <p className="text-base text-neutral-500 font-medium">
              Feel free to reach out to me!
            </p>

            <div className="flex items-center gap-3 pt-1">
              {/* Primary CTA */}
              <a
                href="#contact"
                className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-bold transition-all hover:bg-primary/90 hover:scale-[1.01] shadow-sm"
              >
                Book a call
              </a>

              {/* Mail icon button */}
              <a
                href="mailto:hr@astdigitally.com"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors shadow-sm"
                aria-label="Email us"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              {/* WhatsApp / Chat icon button */}
              <a
                href="https://wa.me/918084158221"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-green-500 hover:bg-neutral-50 transition-colors shadow-sm"
                aria-label="WhatsApp us"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
