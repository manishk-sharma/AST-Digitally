"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, X, ChevronDown, ChevronUp, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/utils";

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/layout/ScrollToTop"), { ssr: false });

const PLANS = [
  {
    name: "Starter",
    tagline: "Perfect for small businesses getting started online.",
    monthly: 299,
    yearly: 239,
    popular: false,
    cta: "Get Started",
    color: "",
    features: [
      "1 Website (up to 5 pages)",
      "Basic SEO setup",
      "Mobile responsive design",
      "Contact form integration",
      "Google Analytics setup",
      "1 month free support",
      "SSL Certificate",
      "Basic speed optimization",
    ],
    notIncluded: [
      "Custom web app",
      "E-commerce store",
      "Paid ads management",
      "AI automation",
    ],
  },
  {
    name: "Pro",
    tagline: "For growing businesses ready to scale their digital presence.",
    monthly: 799,
    yearly: 639,
    popular: true,
    cta: "Start Pro",
    color: "border-accent",
    features: [
      "Up to 15-page website",
      "Advanced SEO (on-page + technical)",
      "Google Ads management",
      "Social media marketing (2 platforms)",
      "Custom UI/UX design",
      "CMS integration",
      "3 months priority support",
      "Monthly performance reports",
      "Conversion rate optimization",
      "Speed & PageSpeed optimization",
    ],
    notIncluded: [
      "AI automation pipeline",
      "Custom e-commerce development",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Full-scale digital transformation for ambitious brands.",
    monthly: null,
    yearly: null,
    popular: false,
    cta: "Contact Us",
    color: "",
    features: [
      "Unlimited pages & content",
      "Full e-commerce development",
      "All paid ads channels",
      "AI automation & chatbots",
      "Custom web applications",
      "Dedicated account manager",
      "12 months support & maintenance",
      "Weekly strategy calls",
      "Custom analytics dashboards",
      "White-glove onboarding",
    ],
    notIncluded: [],
  },
];

const COMPARISON_FEATURES = [
  { name: "Website pages", starter: "Up to 5", pro: "Up to 15", enterprise: "Unlimited" },
  { name: "Custom design", starter: "✓", pro: "✓", enterprise: "✓" },
  { name: "SEO optimization", starter: "Basic", pro: "Advanced", enterprise: "Full-scale" },
  { name: "Google Ads", starter: "✗", pro: "✓", enterprise: "✓" },
  { name: "Meta Ads", starter: "✗", pro: "✓", enterprise: "✓" },
  { name: "Social media marketing", starter: "✗", pro: "2 platforms", enterprise: "All platforms" },
  { name: "E-commerce store", starter: "✗", pro: "✗", enterprise: "✓" },
  { name: "AI automation", starter: "✗", pro: "✗", enterprise: "✓" },
  { name: "Support duration", starter: "1 month", pro: "3 months", enterprise: "12 months" },
  { name: "Monthly reports", starter: "✗", pro: "✓", enterprise: "Custom" },
  { name: "Account manager", starter: "✗", pro: "✗", enterprise: "Dedicated" },
];

const PRICING_FAQS = [
  {
    q: "Are there any setup fees?",
    a: "No hidden setup fees. The price you see is what you pay. All plans include onboarding, project setup, and initial consultation.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade your plan at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
  },
  {
    q: "Do you offer custom pricing for specific needs?",
    a: "Yes. If your requirements don't fit neatly into a plan, contact us for a custom quote. We'll scope it out and give you a transparent, fixed-price proposal.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfers, UPI, and all major debit/credit cards. For enterprise projects, we also accept milestone-based payment schedules.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a satisfaction guarantee. If we can't deliver on agreed milestones, we'll revise the work at no extra charge or provide a partial refund.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted transition-colors"
      >
        <span className="font-heading font-bold text-[17px] text-foreground">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-accent shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 text-paragraph text-[15px]">{a}</div>
      )}
    </div>
  );
}

function CellValue({ value }: { value: string }) {
  if (value === "✓") return <CheckCircle className="h-5 w-5 text-accent mx-auto" />;
  if (value === "✗") return <X className="h-5 w-5 text-border mx-auto" />;
  return <span className="text-[14px] font-medium text-foreground">{value}</span>;
}

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content" className="pt-[80px]">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(to right, #F0F0F0 1px, transparent 1px), linear-gradient(to bottom, #F0F0F0 1px, transparent 1px)`,
            backgroundSize: `60px 60px`
          }} />
          <div className="container-wide relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="section-badge">Pricing</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-hero max-w-[800px] mx-auto mb-6"
            >
              Transparent Pricing.<br />
              <span className="text-accent">Real Value.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-paragraph max-w-[560px] mx-auto"
            >
              No hidden fees. No surprises. Choose the plan that matches your growth goals — upgrade or downgrade anytime.
            </motion.p>
          </div>
        </section>

        {/* ── Pricing Cards ────────────────────────────────────── */}
        <section className="pb-[120px] bg-background">
          <div className="container-wide">

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={cn("text-[14px] font-semibold transition-colors", billing === "monthly" ? "text-foreground" : "text-muted-foreground")}>
                Monthly
              </span>
              <button
                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                className={cn(
                  "relative h-7 w-14 rounded-full transition-colors duration-300",
                  billing === "yearly" ? "bg-accent" : "bg-border"
                )}
                aria-label="Toggle billing"
              >
                <span
                  className={cn(
                    "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300",
                    billing === "yearly" ? "translate-x-8" : "translate-x-1"
                  )}
                />
              </button>
              <span className={cn("text-[14px] font-semibold flex items-center gap-2 transition-colors", billing === "yearly" ? "text-foreground" : "text-muted-foreground")}>
                Yearly
                <span className="text-[11px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </span>
            </div>

            {/* Cards */}
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
              {PLANS.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex"
                >
                  <div
                    className={cn(
                      "flex flex-col w-full rounded-xl border-2 bg-white overflow-hidden transition-all duration-300",
                      plan.popular
                        ? "border-accent shadow-[0_8px_40px_rgba(59,91,255,0.15)]"
                        : "border-border hover:border-accent/30 hover:shadow-lg"
                    )}
                  >
                    {plan.popular && (
                      <div className="bg-accent text-white text-center py-2.5 text-[12px] font-bold tracking-wider uppercase">
                        ⚡ Most Popular
                      </div>
                    )}
                    <div className="p-8 flex flex-col flex-1">
                      {/* Plan name */}
                      <h3 className="text-[28px] font-heading font-extrabold text-foreground mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-[14px] text-muted-foreground mb-6">{plan.tagline}</p>

                      {/* Price */}
                      <div className="mb-8">
                        {plan.monthly === null ? (
                          <div>
                            <span className="text-[42px] font-heading font-extrabold text-foreground">Custom</span>
                            <p className="text-[14px] text-muted-foreground mt-1">Tailored to your needs</p>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-[14px] font-medium text-muted-foreground">₹</span>
                            <span className="text-[48px] font-heading font-extrabold text-foreground leading-none">
                              {billing === "monthly" ? plan.monthly.toLocaleString() : plan.yearly?.toLocaleString()}
                            </span>
                            <span className="text-[14px] text-muted-foreground">/mo</span>
                          </div>
                        )}
                        {plan.yearly && billing === "yearly" && (
                          <p className="text-[12px] text-accent font-medium mt-1">
                            You save ₹{((plan.monthly! - plan.yearly) * 12).toLocaleString()}/year
                          </p>
                        )}
                      </div>

                      {/* CTA */}
                      <Link
                        href="/#contact"
                        className={cn(
                          "w-full text-center py-3.5 rounded-lg font-bold text-[15px] transition-all duration-300 mb-8",
                          plan.popular
                            ? "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:-translate-y-0.5"
                            : "bg-muted text-foreground hover:bg-foreground hover:text-white"
                        )}
                      >
                        {plan.cta}
                      </Link>

                      {/* Features */}
                      <div className="flex-1">
                        <p className="text-[12px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4">
                          What&apos;s included
                        </p>
                        <ul className="space-y-3">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-[14px] text-foreground">
                              <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                              {f}
                            </li>
                          ))}
                          {plan.notIncluded.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-[14px] text-muted-foreground">
                              <X className="h-4 w-4 text-border shrink-0 mt-0.5" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enterprise note */}
            <p className="text-center text-[14px] text-muted-foreground mt-8">
              Need something custom?{" "}
              <Link href="/#contact" className="text-accent font-semibold hover:underline">
                Contact us
              </Link>{" "}
              for a tailored proposal.
            </p>
          </div>
        </section>

        {/* ── Comparison Table ─────────────────────────────────── */}
        <section className="section-padding bg-alternate">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="section-badge mb-4 inline-flex">Compare Plans</span>
              <h2 className="text-section-title mt-4">Feature Comparison</h2>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl border border-border">
              <table className="w-full bg-white">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-5 font-heading font-bold text-[15px] text-muted-foreground w-[40%]">Feature</th>
                    {PLANS.map((plan) => (
                      <th
                        key={plan.name}
                        className={cn(
                          "p-5 text-center font-heading font-bold text-[15px]",
                          plan.popular ? "text-accent" : "text-foreground"
                        )}
                      >
                        {plan.name}
                        {plan.popular && <span className="ml-2 text-[10px] bg-accent text-white px-2 py-0.5 rounded-full">Popular</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((row, i) => (
                    <tr
                      key={row.name}
                      className={cn(
                        "border-b border-border last:border-0",
                        i % 2 === 0 ? "bg-white" : "bg-muted/40"
                      )}
                    >
                      <td className="p-5 text-[14px] font-medium text-foreground">{row.name}</td>
                      <td className="p-5 text-center"><CellValue value={row.starter} /></td>
                      <td className="p-5 text-center bg-accent/5"><CellValue value={row.pro} /></td>
                      <td className="p-5 text-center"><CellValue value={row.enterprise} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQs ─────────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-badge mb-4 inline-flex">FAQ</span>
              <h2 className="text-section-title mt-4">Pricing Questions</h2>
            </div>
            <div className="space-y-3">
              {PRICING_FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 bg-foreground">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-accent mb-6">
                <Zap className="h-4 w-4" />
                <span className="text-[13px] font-mono font-bold tracking-wider uppercase">Free Consultation</span>
              </div>
              <h2 className="text-[48px] font-heading font-extrabold text-white mb-4">
                Not sure which plan is right?
              </h2>
              <p className="text-[18px] text-white/60 mb-10 max-w-[500px] mx-auto">
                Book a free 30-minute call and we'll recommend the best solution for your business goals and budget.
              </p>
              <Link
                href="/#contact"
                className="btn-primary text-[16px] px-10 py-5"
              >
                Book Free Call <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  );
}
