import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import StatNumber from "@/components/ui/StatNumber";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import type { Metadata } from "next";
import { getSeoConfigByPage } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfigByPage("Services");
  if (!seo) return {};
  return {
    title: seo.metaTitle || undefined,
    description: seo.metaDesc || undefined,
    alternates: { canonical: seo.canonical || undefined },
    keywords: seo.keywords || undefined,
    openGraph: seo.ogImage ? { images: [{ url: seo.ogImage }] } : undefined,
  };
}
import {
  TrendingUp, Search, Monitor, Palette, Video, Cpu,
  ShoppingCart, Megaphone, Bot, Settings, CheckCircle,
  ArrowRight, Zap, Shield, BarChart3, Users
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  getNavbarLinks,
  getFooterData,
  getContactInfo,
  getServicesFull,
  getFAQs
} from "@/lib/cms";

const ICON_MAP: Record<string, any> = {
  Monitor,
  Search,
  Megaphone,
  Palette,
  Video,
  Cpu,
  Bot,
  Settings,
  TrendingUp,
  ShoppingCart,
  Zap,
  Shield,
  BarChart3,
  Users
};

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call", desc: "We understand your goals, audience, and current challenges in a free 30-minute call." },
  { num: "02", title: "Strategy & Proposal", desc: "We craft a tailored proposal with clear scope, timeline, and transparent pricing." },
  { num: "03", title: "Design & Build", desc: "Our team executes with precision — regular updates keep you in the loop." },
  { num: "04", title: "Launch & Grow", desc: "We go live and continue optimizing for lasting results and measurable ROI." },
];

export default async function ServicesPage() {
  const [
    navLinks,
    footerData,
    contactInfo,
    services,
    faqs
  ] = await Promise.all([
    getNavbarLinks(),
    getFooterData(),
    getContactInfo(),
    getServicesFull(),
    getFAQs()
  ]);

  return (
    <SmoothScroll>
      <Navbar navLinks={navLinks} />
      <main id="main-content" className="pt-[80px]">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(to right, #F0F0F0 1px, transparent 1px), linear-gradient(to bottom, #F0F0F0 1px, transparent 1px)`,
            backgroundSize: `60px 60px`
          }} />
          <div className="container-wide relative z-10 text-center">
            <div className="mb-6">
              <span className="section-badge">What We Do</span>
            </div>
            <h1 className="text-hero max-w-[800px] mx-auto mb-8">
              Services Built for{" "}
              <span className="text-accent">Real Growth</span>
            </h1>
            <p className="text-paragraph max-w-[600px] mx-auto mb-12">
              From websites and SEO to AI automation and branding — every service we offer is engineered to deliver measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="btn-primary">
                Book Free Consultation
              </Link>
              <a href="#services-grid" className="btn-secondary">
                Explore Services
              </a>
            </div>

            {/* Trust Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "10+", label: "Services Offered" },
                { value: "24/7", label: "Support Available" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="premium-card !p-6 text-center bg-white"
                >
                  <StatNumber
                    value={s.value}
                    className="text-[28px] font-heading font-extrabold text-accent"
                    duration={1800}
                  />
                  <div className="text-label mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Grid ────────────────────────────────────── */}
        <section id="services-grid" className="section-padding bg-alternate">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="section-badge mb-4 inline-flex">Our Services</span>
              <h2 className="text-section-title mt-4">Everything Your Business Needs</h2>
              <p className="text-paragraph max-w-[560px] mx-auto mt-4">
                A full suite of digital services under one roof — so you never have to juggle multiple agencies.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {services.map((service, i) => {
                const Icon = ICON_MAP[service.icon] || Monitor;
                return (
                  <div
                    key={service.id}
                    className="premium-card group flex flex-col h-full bg-white"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mb-2 text-[20px] font-heading font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-paragraph text-[15px] mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 border-t border-border pt-6">
                      {(service.features || []).slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[13px] text-secondary-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div>
                <span className="section-badge mb-6 inline-flex">Why AST Digitally</span>
                <h2 className="text-section-title mb-6">
                  One Agency.<br />
                  <span className="text-accent">Every Solution.</span>
                </h2>
                <p className="text-paragraph mb-8">
                  Stop juggling 5 different vendors. We're your single point of contact for websites, marketing, design, and automation — ensuring everything works together seamlessly.
                </p>
                <Link href="/#contact" className="btn-primary inline-flex">
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Transparent Pricing", desc: "No hidden fees. Clear proposals with fixed deliverables and timelines." },
                  { icon: Zap, title: "Fast Delivery", desc: "Agile workflows and dedicated teams ensure on-time project delivery." },
                  { icon: BarChart3, title: "Data-Driven Results", desc: "Every decision is backed by analytics, A/B testing, and real business metrics." },
                  { icon: Users, title: "Long-Term Partnership", desc: "We don't disappear after launch. We grow with you — month after month." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 bg-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-[15px] text-foreground mb-1">{item.title}</div>
                      <div className="text-[14px] text-secondary-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────── */}
        <section className="section-padding bg-alternate">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="section-badge mb-4 inline-flex">How It Works</span>
              <h2 className="text-section-title mt-4">From Idea to Results</h2>
              <p className="text-paragraph max-w-[500px] mx-auto mt-4">
                A simple, proven 4-step process to take your project from kickoff to live.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="relative text-center"
                >
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-border" />
                  )}
                  <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white font-heading font-black text-[18px] mb-5">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-[17px] text-foreground mb-2">{step.title}</h3>
                  <p className="text-[14px] text-secondary-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ─────────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-badge mb-4 inline-flex">FAQ</span>
              <h2 className="text-section-title mt-4">Common Questions</h2>
            </div>
            <div className="mx-auto max-w-3xl">
              <Accordion className="space-y-3" defaultValue={["faq-0"]}>
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-border rounded-lg px-6 py-1 data-[state=open]:border-accent/40 data-[state=open]:bg-accent/3 transition-all duration-300 bg-card"
                  >
                    <AccordionTrigger className="text-left text-[15px] font-heading font-bold text-foreground hover:no-underline py-5 hover:text-accent transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-paragraph text-[15px]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 bg-accent">
          <div className="container-wide text-center">
            <div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-heading font-extrabold text-white mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-[18px] text-white/80 mb-10 max-w-[500px] mx-auto">
                Book a free 30-minute consultation and let's map out a strategy that delivers real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="bg-white text-accent font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
                >
                  Book Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer navLinks={navLinks} footerData={footerData} contactInfo={contactInfo} />
      <ScrollToTop />
    </SmoothScroll>
  );
}
