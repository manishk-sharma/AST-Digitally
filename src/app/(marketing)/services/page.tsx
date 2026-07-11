"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import StatNumber from "@/components/ui/StatNumber";
import {
  TrendingUp, Search, Monitor, Palette, Video, Cpu,
  ShoppingCart, Megaphone, Bot, Settings, CheckCircle,
  ArrowRight, ChevronDown, ChevronUp, Zap, Shield, BarChart3, Users
} from "lucide-react";
import { useState } from "react";

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/layout/ScrollToTop"), { ssr: false });

const SERVICES_FULL = [
  {
    id: "website-development",
    icon: Monitor,
    title: "Website Development",
    tagline: "Fast, beautiful websites that convert",
    description:
      "We build custom, high-performance websites tailored to your brand and business goals. From landing pages to complex web applications, every project is engineered for speed, SEO, and conversions.",
    features: [
      "Custom responsive design",
      "Next.js / React / WordPress",
      "PageSpeed 95+ score",
      "SEO-ready architecture",
      "CMS integration",
      "Lifetime maintenance options",
    ],
    benefits: ["5x faster load times", "Higher search rankings", "More conversions"],
    color: "blue",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO",
    tagline: "Rank higher, grow organically",
    description:
      "Our data-driven SEO strategies combine technical excellence, content optimization, and authoritative link building to consistently move your business to the top of search results.",
    features: [
      "Technical SEO audits",
      "On-page optimization",
      "Local SEO & Google Maps",
      "Content strategy",
      "Link building",
      "Monthly ranking reports",
    ],
    benefits: ["3x organic traffic", "Top 3 rankings", "Long-term growth"],
    color: "blue",
  },
  {
    id: "google-ads",
    icon: BarChart3,
    title: "Google Ads",
    tagline: "Reach customers ready to buy",
    description:
      "Laser-targeted Google Ads campaigns that put your business in front of high-intent buyers. We handle keyword research, ad copy, bid management, and continuous optimization.",
    features: [
      "Keyword research & strategy",
      "Search, Display & Shopping ads",
      "Conversion tracking setup",
      "A/B ad copy testing",
      "Bid management & optimization",
      "Transparent ROI reporting",
    ],
    benefits: ["Lower cost per click", "Higher quality leads", "Measurable ROI"],
    color: "blue",
  },
  {
    id: "meta-ads",
    icon: Megaphone,
    title: "Meta Ads",
    tagline: "Scale your brand on Facebook & Instagram",
    description:
      "We create scroll-stopping Meta ad campaigns that drive brand awareness, website traffic, and direct sales using precise audience targeting and creative optimization.",
    features: [
      "Facebook & Instagram ads",
      "Audience research & targeting",
      "Creative design & copywriting",
      "Retargeting campaigns",
      "Lookalike audiences",
      "Performance dashboards",
    ],
    benefits: ["2x ROAS improvement", "Wider brand reach", "Lower CPM"],
    color: "blue",
  },
  {
    id: "social-media",
    icon: Users,
    title: "Social Media Marketing",
    tagline: "Build a loyal online community",
    description:
      "Strategic social media management that turns followers into customers. We handle content creation, posting, community management, and growth across all platforms.",
    features: [
      "Content strategy & calendar",
      "Professional graphic design",
      "Caption writing & posting",
      "Community management",
      "Hashtag & trend research",
      "Monthly analytics reports",
    ],
    benefits: ["5x engagement growth", "Brand authority", "Consistent presence"],
    color: "blue",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Branding",
    tagline: "Build a brand people remember",
    description:
      "From logos and color palettes to brand guidelines and visual identities — we craft cohesive brand systems that communicate your values and make you instantly recognizable.",
    features: [
      "Logo design & variants",
      "Brand color & typography",
      "Brand guidelines document",
      "Business card & stationery",
      "Social media brand kit",
      "Custom illustration",
    ],
    benefits: ["Premium brand image", "Brand consistency", "Stronger recall"],
    color: "blue",
  },
  {
    id: "uiux-design",
    icon: Zap,
    title: "UI/UX Design",
    tagline: "Interfaces that delight and convert",
    description:
      "Human-centered design that makes digital products intuitive, beautiful, and conversion-optimized. We use research, wireframing, and prototyping to ensure every interaction is flawless.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Figma design systems",
      "Interaction design",
      "Usability testing",
      "Design handoff to dev",
    ],
    benefits: ["40% higher conversions", "Reduced bounce rate", "Happier users"],
    color: "blue",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Development",
    tagline: "Online stores that sell around the clock",
    description:
      "Full-featured e-commerce solutions on Shopify, WooCommerce, or custom stacks — optimized for product discovery, fast checkout, and maximum revenue per visitor.",
    features: [
      "Shopify / WooCommerce",
      "Custom cart & checkout",
      "Payment gateway integration",
      "Product catalog management",
      "Inventory & order systems",
      "Mobile-first shopping UX",
    ],
    benefits: ["60% cart completion", "Fast checkout", "Scalable catalog"],
    color: "blue",
  },
  {
    id: "ai-automation",
    icon: Bot,
    title: "AI Automation",
    tagline: "Work smarter with intelligent automation",
    description:
      "We build AI-powered automations that eliminate repetitive tasks, streamline workflows, and give your team superpowers — from chatbots to custom ML pipelines.",
    features: [
      "AI chatbot development",
      "Workflow automation (n8n/Zapier)",
      "Custom AI model integration",
      "CRM automation",
      "Lead scoring systems",
      "API integrations",
    ],
    benefits: ["10x team productivity", "24/7 automation", "Cost reduction"],
    color: "blue",
  },
  {
    id: "maintenance",
    icon: Settings,
    title: "Website Maintenance",
    tagline: "Keep your site fast, secure, and updated",
    description:
      "Proactive maintenance plans to keep your website running at peak performance — security patches, plugin updates, backups, uptime monitoring, and speed optimizations.",
    features: [
      "Regular security updates",
      "Daily/weekly backups",
      "Uptime monitoring",
      "Performance optimization",
      "Content updates",
      "Priority support",
    ],
    benefits: ["99.9% uptime", "Zero security breaches", "Peace of mind"],
    color: "blue",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call", desc: "We understand your goals, audience, and current challenges in a free 30-minute call." },
  { num: "02", title: "Strategy & Proposal", desc: "We craft a tailored proposal with clear scope, timeline, and transparent pricing." },
  { num: "03", title: "Design & Build", desc: "Our team executes with precision — regular updates keep you in the loop." },
  { num: "04", title: "Launch & Grow", desc: "We go live and continue optimizing for lasting results and measurable ROI." },
];

const SERVICE_FAQS = [
  {
    q: "How long does a website project take?",
    a: "A standard brochure website takes 2–4 weeks. E-commerce or custom web apps typically take 6–12 weeks depending on complexity.",
  },
  {
    q: "Do you offer packages or custom quotes?",
    a: "We offer both. You can choose from our Pricing plans or request a custom quote tailored to your specific requirements.",
  },
  {
    q: "Can you manage both SEO and Paid Ads together?",
    a: "Absolutely. Our integrated approach combines SEO for long-term organic growth with paid ads for immediate results — maximizing your overall ROI.",
  },
  {
    q: "What platforms do you build websites on?",
    a: "We build on Next.js/React for high-performance sites, WordPress for easy content management, and Shopify/WooCommerce for e-commerce.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. All projects include 30 days of complimentary post-launch support. We also offer ongoing maintenance plans.",
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

export default function ServicesPage() {
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
              <span className="section-badge">What We Do</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-hero max-w-[800px] mx-auto mb-8"
            >
              Services Built for{" "}
              <span className="text-accent">Real Growth</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-paragraph max-w-[600px] mx-auto mb-12"
            >
              From websites and SEO to AI automation and branding — every service we offer is engineered to deliver measurable results for your business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/#contact" className="btn-primary">
                Book Free Consultation
              </Link>
              <a href="#services-grid" className="btn-secondary">
                Explore Services
              </a>
            </motion.div>

            {/* Trust Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "10+", label: "Services Offered" },
                { value: "24/7", label: "Support Available" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="premium-card !p-6 text-center"
                >
                  <StatNumber
                    value={s.value}
                    className="text-[28px] font-heading font-extrabold text-accent"
                    duration={1800}
                  />
                  <div className="text-label mt-1">{s.label}</div>
                </motion.div>
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
              {SERVICES_FULL.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="premium-card group flex flex-col h-full bg-white"
                  >
                    {/* Icon */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mb-2 text-[20px] font-heading font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-label text-accent mb-4">{service.tagline}</p>
                    <p className="text-paragraph text-[15px] mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 border-t border-border pt-6">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[13px] text-secondary-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
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
              </motion.div>

              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Transparent Pricing", desc: "No hidden fees. Clear proposals with fixed deliverables and timelines." },
                  { icon: Zap, title: "Fast Delivery", desc: "Agile workflows and dedicated teams ensure on-time project delivery." },
                  { icon: BarChart3, title: "Data-Driven Results", desc: "Every decision is backed by analytics, A/B testing, and real business metrics." },
                  { icon: Users, title: "Long-Term Partnership", desc: "We don't disappear after launch. We grow with you — month after month." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 bg-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-[15px] text-foreground mb-1">{item.title}</div>
                      <div className="text-[14px] text-secondary-foreground">{item.desc}</div>
                    </div>
                  </motion.div>
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

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
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
                </motion.div>
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
            <div className="space-y-3">
              {SERVICE_FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 bg-accent">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[48px] font-heading font-extrabold text-white mb-4">
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
                <Link href="/pricing" className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2">
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  );
}
