"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { SERVICES } from "@/constants";
import { useInView } from "@/hooks/useInView";
import { TrendingUp, Search, Monitor, Palette, Video, Cpu } from "lucide-react";

const getServiceIcon = (id: string) => {
  switch (id) {
    case "digital-marketing":
      return TrendingUp;
    case "seo-services":
      return Search;
    case "website-development":
      return Monitor;
    case "graphic-design":
      return Palette;
    case "video-editing":
      return Video;
    case "app-deployment":
      return Cpu;
    default:
      return Monitor;
  }
};

/**
 * Services section styled for the clean light mode developer aesthetic.
 */
export default function Services() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="services" className="section-padding relative" aria-label="Our services">
      <div className="container-wide">
        <SectionHeading
          badge="Our Services"
          title="Complete Digital Solutions"
          subtitle="From marketing and SEO to web development and design — we provide end-to-end digital services to help your business grow."
        />

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = getServiceIcon(service.id);
            return (
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
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 transition-transform duration-400 group-hover:scale-105">
                      <Icon className="h-5 w-5 stroke-[1.8]" />
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
          );
        })}
        </div>
      </div>
    </section>
  );
}
