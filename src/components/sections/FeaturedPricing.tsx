"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/utils";

const PREVIEW_PLANS = [
  {
    name: "Starter",
    price: "₹299",
    period: "/mo",
    desc: "For small businesses getting started online.",
    features: ["1 website (5 pages)", "Basic SEO setup", "Mobile responsive", "1 month support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹799",
    period: "/mo",
    desc: "For growing businesses ready to scale.",
    features: ["15-page website", "Advanced SEO", "Google & Meta Ads", "3 months support"],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full-scale digital transformation.",
    features: ["Unlimited pages", "All ad channels", "AI automation", "12 months support"],
    cta: "Contact Us",
    popular: false,
  },
];

export default function FeaturedPricing() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="pricing" className="section-padding bg-background" aria-label="Pricing preview">
      <div className="container-wide">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-badge mb-4 inline-flex">Pricing</span>
            <h2 className="text-section-title mt-4">
              Simple, Transparent<br />
              <span className="text-accent">Pricing</span>
            </h2>
          </div>
          <Link href="/pricing" className="btn-outline-blue self-start md:self-auto shrink-0">
            See Full Pricing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Preview Cards */}
        <div ref={ref} className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {PREVIEW_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={cn(
                  "relative rounded-xl border-2 bg-white p-7 h-full flex flex-col transition-all duration-300",
                  plan.popular
                    ? "border-accent shadow-[0_8px_40px_rgba(59,91,255,0.15)]"
                    : "border-border hover:border-accent/30 hover:shadow-md"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      <Zap className="h-3 w-3" /> Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-[22px] font-heading font-extrabold text-foreground mb-1">{plan.name}</h3>
                <p className="text-[13px] text-muted-foreground mb-5">{plan.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[38px] font-heading font-extrabold text-foreground leading-none">{plan.price}</span>
                  {plan.period && <span className="text-[14px] text-muted-foreground">{plan.period}</span>}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px] text-foreground">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/pricing"
                  className={cn(
                    "w-full text-center py-3 rounded-lg font-bold text-[14px] transition-all duration-300",
                    plan.popular
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "bg-muted text-foreground hover:bg-foreground hover:text-white"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-secondary-foreground text-[14px]">
            All plans include free consultation.{" "}
            <Link href="/pricing" className="text-accent font-semibold hover:underline">
              Compare full features →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
