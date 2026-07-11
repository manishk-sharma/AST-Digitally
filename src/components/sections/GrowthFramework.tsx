"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { GROWTH_STEPS } from "@/constants";
import { useInView } from "@/hooks/useInView";
import StatNumber from "@/components/ui/StatNumber";
import {
  Lightbulb,
  ClipboardList,
  Palette,
  Code,
  FlaskConical,
  Rocket,
  Wrench
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  consultation: Lightbulb,
  planning: ClipboardList,
  design: Palette,
  development: Code,
  testing: FlaskConical,
  launch: Rocket,
  support: Wrench,
};

/**
 * Growth Framework section — 7-step journey from Discovery to Support.
 */
export default function GrowthFramework() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="process"
      className="section-padding bg-alternate relative overflow-hidden"
      aria-label="Growth framework process"
    >
      <div className="container-wide relative">
        <SectionHeading
          badge="Our Process"
          title="How We Work"
          subtitle="A proven 7-step process from consultation to ongoing support that ensures your project is delivered on time and exceeds expectations."
        />

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Vertical connection line */}
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-accent/20 md:block" />

          <div className="space-y-8 md:space-y-10">
            {GROWTH_STEPS.map((step, i) => {
              const IconComponent = iconMap[step.id];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative md:pl-24"
                >
                  {/* Step number bubble */}
                  <div className="absolute left-0 top-6 hidden md:flex">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white text-xl font-heading font-black">
                      {step.step}
                    </div>
                  </div>

                  <div className="premium-card p-6 md:p-8 bg-white">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="section-badge text-[11px]">
                            Phase {step.step}
                          </span>
                        </div>
                        <h3 className="mb-2 text-[20px] font-heading font-bold text-foreground flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent className="h-5 w-5 text-accent shrink-0" />
                          )}
                          <span>{step.title}</span>
                        </h3>
                        <p className="text-paragraph text-[15px]">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 lg:gap-5">
                        {step.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex flex-col items-center rounded-lg border border-accent/20 bg-accent/5 px-5 py-4 text-center min-w-[100px]"
                          >
                            <StatNumber
                              value={stat.value}
                              className="text-[22px] font-heading font-extrabold text-accent tracking-tight"
                              duration={1600}
                            />
                            <span className="mt-1 text-label text-secondary-foreground">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
