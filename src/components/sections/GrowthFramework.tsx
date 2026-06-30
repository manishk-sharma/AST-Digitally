"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { GROWTH_STEPS } from "@/constants";
import { useInView } from "@/hooks/useInView";
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
 * Growth Framework section — 6-step journey from Discovery to Optimization.
 * Uses Framer Motion for scroll-driven progression and CSS 3D perspective.
 */
export default function GrowthFramework() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden"
      aria-label="Growth framework process"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent dark:via-white/[0.02]" />

      <div className="container-wide relative">
        <SectionHeading
          badge="Our Process"
          title="How We Work"
          subtitle="A proven 7-step process from consultation to ongoing support that ensures your project is delivered on time and exceeds expectations."
        />

        <div ref={ref} className="relative">
          {/* Vertical connection line */}
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-border md:block" />

          <div className="space-y-8 md:space-y-12">
            {GROWTH_STEPS.map((step, i) => {
              const IconComponent = iconMap[step.id];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative md:pl-20"
                >
                  {/* Step number circle */}
                  <div className="absolute left-0 top-6 hidden md:flex">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-lg border border-border text-2xl font-bold bg-neutral-50 text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.025)]"
                    >
                      {step.step}
                    </div>
                  </div>

                  <GlassCard
                    variant="solid"
                    hover={true}
                    className="p-6 md:p-8"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="md:hidden">
                            {IconComponent && <IconComponent className="h-5 w-5 text-foreground" />}
                          </span>
                          <span
                            className="text-xs font-bold uppercase tracking-wider text-neutral-500"
                          >
                            Phase {step.step}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-foreground flex items-center gap-2">
                          {IconComponent && <IconComponent className="h-5 w-5 text-foreground shrink-0" />}
                          <span>{step.title}</span>
                        </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 lg:gap-6">
                      {step.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex flex-col items-center rounded-lg border border-border bg-neutral-50 px-4 py-3 text-center min-w-[100px] shadow-[0_2px_10px_rgba(0,0,0,0.025)]"
                        >
                          <span
                            className="text-lg font-bold text-foreground"
                          >
                            {stat.value}
                          </span>
                          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
