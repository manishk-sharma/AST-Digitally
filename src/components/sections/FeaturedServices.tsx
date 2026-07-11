"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Monitor, Search, Megaphone, ArrowRight, CheckCircle } from "lucide-react";

const FEATURED = [
  {
    icon: Monitor,
    title: "Website Development",
    desc: "High-performance, SEO-ready websites built with modern frameworks that convert visitors into customers.",
    highlights: ["Custom responsive design", "PageSpeed 95+ score", "CMS integration"],
  },
  {
    icon: Search,
    title: "SEO & Digital Marketing",
    desc: "Data-driven strategies to grow your organic reach, run profitable paid ads, and dominate your market.",
    highlights: ["Technical SEO audits", "Google & Meta Ads", "Monthly reports"],
  },
  {
    icon: Megaphone,
    title: "Branding & Design",
    desc: "Visual identities, UI/UX design, and marketing creatives that make your brand instantly recognizable.",
    highlights: ["Logo & brand kit", "UI/UX design", "Social media creatives"],
  },
];

export default function FeaturedServices() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="services" className="section-padding bg-alternate" aria-label="Featured services">
      <div className="container-wide">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-badge mb-4 inline-flex">Our Services</span>
            <h2 className="text-section-title mt-4">
              What We Do<br />
              <span className="text-accent">Best</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="btn-outline-blue self-start md:self-auto shrink-0"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {FEATURED.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="premium-card group flex flex-col bg-white h-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[20px] font-heading font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-paragraph text-[15px] mb-6 flex-1">{service.desc}</p>
                <ul className="space-y-2 border-t border-border pt-5">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[13px] text-secondary-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-secondary-foreground mb-4">
            We offer 10+ services including AI automation, e-commerce, and more.
          </p>
          <Link href="/services" className="text-accent font-semibold hover:underline inline-flex items-center gap-1">
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
