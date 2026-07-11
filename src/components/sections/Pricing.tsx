"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Pricing() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      desc: "For individual projects and local development.",
      price: { monthly: 0, annual: 0 },
      features: [
        "1 organization member",
        "Up to 3 active pipelines",
        "Local testing runner",
        "Community forum support",
      ],
      cta: "Start for free",
      popular: false,
    },
    {
      name: "Pro",
      desc: "For production platforms and growing teams.",
      price: { monthly: 24, annual: 19 },
      features: [
        "Unlimited organization members",
        "Unlimited active pipelines",
        "Dedicated cloud runner",
        "14-day log retention history",
        "Prioritized support (Slack & Email)",
      ],
      cta: "Start Pro trial",
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "For organizations requiring custom compliance and scale.",
      price: { monthly: "Custom", annual: "Custom" },
      features: [
        "SAML SSO & custom RBAC rules",
        "Isolated runner networks",
        "Unlimited log retention archives",
        "Dedicated success engineer",
        "99.99% uptime SLA contracts",
      ],
      cta: "Contact sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="section-padding bg-card relative overflow-hidden"
      aria-label="Pricing Plans"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Pricing"
          title="Simple, transparent pricing"
          subtitle="Choose the tier that matches your project scale. Cancel or upgrade at any time."
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider transition-colors",
              billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")
            }
            className="relative h-6 w-11 border border-border bg-neutral-100 transition-colors focus:outline-none"
            aria-label="Toggle annual billing"
            aria-pressed={billingPeriod === "annual"}
          >
            <span
              className={cn(
                "absolute left-0.5 top-0.5 h-4 w-4 bg-black transition-transform",
                billingPeriod === "annual" ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5",
              billingPeriod === "annual" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Annual
            <span className="text-[9px] font-bold text-foreground border border-border bg-background px-1 py-0.5 uppercase leading-none font-mono">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div ref={ref} className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className={cn(
                  "premium-card p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden",
                  plan.popular ? "border-2 border-foreground bg-background z-10" : "bg-card"
                )}
              >
                {/* Popular Tag */}
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-background bg-foreground border border-foreground px-3 py-1">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <h3 className="text-[28px] font-heading font-extrabold text-foreground tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-paragraph text-sm min-h-[40px]">
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="my-8">
                    {typeof plan.price[billingPeriod] === "number" ? (
                      <div className="flex items-baseline">
                        <span className="text-[42px] font-heading font-extrabold text-foreground tracking-tight">
                          ${plan.price[billingPeriod]}
                        </span>
                        <span className="text-label text-secondary-foreground ml-2">
                          / month
                        </span>
                      </div>
                    ) : (
                      <div className="text-[42px] font-heading font-extrabold text-foreground tracking-tight">
                        {plan.price[billingPeriod]}
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 border-t border-border pt-8 mt-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-label text-secondary-foreground">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="h-4 w-4 text-accent shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button */}
                <div className="mt-10">
                  <a
                    href="#contact"
                    className={cn(
                      plan.popular ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"
                    )}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
