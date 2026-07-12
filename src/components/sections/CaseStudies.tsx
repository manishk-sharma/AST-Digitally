"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { CASE_STUDIES } from "@/constants";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CaseStudiesProps {
  caseStudies?: Array<{
    id: string;
    title: string;
    client: string;
    industry: string;
    description: string;
    tags: string[];
    metrics: Array<{ label: string; value: string; prefix?: string; suffix?: string }>;
  }>;
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const list = caseStudies || CASE_STUDIES;

  return (
    <section
      id="case-studies"
      className="section-padding bg-alternate relative"
      aria-label="Case studies"
    >
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-badge mb-4 inline-flex">Our Work</span>
            <h2 className="text-section-title mt-4">
              Case Studies
            </h2>
            <p className="text-paragraph max-w-[500px] mt-4">
              Real results from real clients. See how we've helped businesses achieve extraordinary growth.
            </p>
          </div>
          <Link href="/#contact" className="btn-outline-blue self-start md:self-auto shrink-0">
            Start Your Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={ref} className="space-y-8 lg:space-y-10">
          {list.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="premium-card overflow-hidden p-6 lg:p-8 bg-white">
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Left: Info */}
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-accent/20 bg-accent/8 text-[11px] font-mono text-accent font-semibold px-3 py-1 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-2 text-[26px] font-heading font-extrabold text-foreground tracking-tight">
                      {study.title}
                    </h3>
                    <p className="mb-5 text-label text-muted-foreground uppercase font-bold tracking-wider">
                      {study.client} · {study.industry}
                    </p>
                    <p className="text-paragraph text-[15px]">
                      {study.description}
                    </p>
                  </div>

                  {/* Right: Metrics */}
                  <div className="grid grid-cols-2 gap-4">
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
                        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-center">
                          <div className="text-[24px] sm:text-[32px] font-heading font-extrabold text-accent tracking-tight">
                            <AnimatedCounter
                              end={parseFloat(metric.value)}
                              prefix={metric.prefix}
                              suffix={metric.suffix}
                              decimals={metric.value.includes(".") ? 1 : 0}
                              duration={1800}
                              startTrigger={isInView}
                            />
                          </div>
                          <div className="mt-3 text-label text-secondary-foreground">
                            {metric.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
