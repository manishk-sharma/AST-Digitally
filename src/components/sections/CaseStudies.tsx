"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { CASE_STUDIES } from "@/constants";
import { useInView } from "@/hooks/useInView";

/**
 * Case studies section with floating dashboard aesthetic and animated metrics.
 */
export default function CaseStudies() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="case-studies"
      className="section-padding relative"
      aria-label="Case studies"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Our Work"
          title="Case Studies"
          subtitle="Real results from real clients. See how we've helped businesses achieve extraordinary growth."
        />

        <div ref={ref} className="space-y-8 lg:space-y-12">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <GlassCard
                variant="solid"
                hover={true}
                className="overflow-hidden p-6 lg:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Left: Info */}
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="border-border bg-neutral-100 text-neutral-800 font-semibold"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-foreground lg:text-xl">
                      {study.title}
                    </h3>
                    <p className="mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {study.client} • {study.industry}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {study.description}
                    </p>
                  </div>

                  {/* Right: Metrics Dashboard */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {study.metrics.map((metric, j) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.15 + j * 0.08 + 0.2,
                        }}
                      >
                        <div className="rounded-lg border border-border bg-neutral-50 p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                          <div className="text-2xl font-extrabold text-foreground lg:text-3xl">
                            <AnimatedCounter
                              value={parseFloat(metric.value)}
                              prefix={metric.prefix}
                              suffix={metric.suffix}
                              decimals={metric.value.includes(".") ? 1 : 0}
                            />
                          </div>
                          <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
