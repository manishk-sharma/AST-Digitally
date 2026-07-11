"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section id="services" className="section-padding relative bg-background" aria-label="Our services">
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
                <div
                  className="premium-card group relative h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <div className="mb-8 text-foreground transition-transform duration-400 group-hover:-translate-y-1">
                      <Icon className="h-5 w-5 stroke-[1.75]" />
                    </div>

                  {/* Title */}
                  <h3 className="mb-3 text-[22px] font-heading font-bold text-foreground">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 text-paragraph">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 border-t border-border pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-[14px] text-secondary-foreground font-mono"
                    >
                      <span className="text-accent">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
