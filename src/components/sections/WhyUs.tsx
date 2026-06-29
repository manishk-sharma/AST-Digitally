"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/lib/hooks/useInView";

export default function WhyUs() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const differentiators = [
    {
      num: "01",
      title: "AI-First Solutions",
      desc: "Custom intelligent agents, neural interfaces, and task automations built to reduce operational bottlenecks and cut overhead.",
      icon: "🤖",
    },
    {
      num: "02",
      title: "Data-Driven Decision Making",
      desc: "No guessing. We configure precise tracking funnels and predictive lead frameworks to optimize ad budgets and scale ROI.",
      icon: "📊",
    },
    {
      num: "03",
      title: "Conversion-Focused Design",
      desc: "Stunning aesthetic interfaces backed by conversion analytics, heatmaps, and structured SEO-friendly DOM hierarchies.",
      icon: "⚡",
    },
    {
      num: "04",
      title: "Transparent Reporting",
      desc: "Direct access to real-time marketing sheets, weekly metrics audits, and clear analytics dashboards showing real customer growth.",
      icon: "📋",
    },
    {
      num: "05",
      title: "Dedicated Project Managers",
      desc: "A single direct contact point coordinating design, engineering, and advertising channels to deliver on time.",
      icon: "👤",
    },
    {
      num: "06",
      title: "Long-Term Growth Partnership",
      desc: "We scale as you scale. Regular post-launch code audits, campaign adjustments, and AI updates to keep you ahead of competitors.",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="why-us"
      className="section-padding relative overflow-hidden"
      aria-label="Why choose us"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Differentiators"
          title="More Than a Digital Agency"
          subtitle="We combine technology, creativity, and data-driven strategies to build digital experiences that generate measurable business results."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {differentiators.map((diff, i) => (
            <motion.div
              key={diff.num}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <GlassCard
                variant="solid"
                hover={true}
                className="p-8 h-full flex flex-col justify-between border border-border"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl" role="img" aria-hidden="true">
                      {diff.icon}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 font-bold border border-border rounded px-1.5 py-0.5 leading-none">
                      {diff.num}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 font-sans tracking-wide">
                    {diff.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-neutral-600 font-medium">
                    {diff.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
