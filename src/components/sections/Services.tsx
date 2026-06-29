"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { SERVICES } from "@/lib/constants";
import { useInView } from "@/lib/hooks/useInView";

/**
 * Services section styled for the clean light mode developer aesthetic.
 */
export default function Services() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="services" className="section-padding relative" aria-label="Our services">
      <div className="container-wide">
        <SectionHeading
          badge="What We Do"
          title="Services That Drive Growth"
          subtitle="End-to-end digital solutions powered by AI, designed to transform your business and deliver measurable results."
        />

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <GlassCard
                variant="solid"
                hover={true}
                className="group relative h-full p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-xl transition-transform duration-400 group-hover:scale-105">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-base font-bold text-foreground">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 border-t border-border pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80"
                    >
                      <span className="h-1 w-1 rounded-full bg-neutral-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
