import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import StatNumber from "@/components/ui/StatNumber";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import type { Metadata } from "next";
import { getSeoConfigByPage } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfigByPage("About");
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
  getNavbarLinks,
  getFooterData,
  getContactInfo,
  getAboutData
} from "@/lib/cms";

const VALUES = [
  { icon: Target, title: "Results-Focused", desc: "Every strategy we build is anchored in measurable outcomes — not vanity metrics." },
  { icon: Lightbulb, title: "Creative Thinking", desc: "We blend design, technology, and marketing into solutions that stand out." },
  { icon: Heart, title: "Client-First", desc: "Your success is our success. We treat your business like our own." },
  { icon: TrendingUp, title: "Continuous Growth", desc: "We don't rest after launch. We optimize, iterate, and keep pushing forward." },
];

export default async function AboutPage() {
  const [
    navLinks,
    footerData,
    contactInfo,
    aboutData
  ] = await Promise.all([
    getNavbarLinks(),
    getFooterData(),
    getContactInfo(),
    getAboutData()
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
          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              <div className="mb-6">
                <span className="section-badge">About Us</span>
              </div>
              <h1 className="text-hero mb-8">
                We Help Businesses{" "}
                <span className="text-accent">Grow Digitally</span>
              </h1>
              <p className="text-paragraph max-w-[650px] mb-10">
                AST Digitally is a full-service digital agency founded by Asif Siddique. We help startups, SMEs, and enterprises grow through digital marketing, stunning websites, branding, and intelligent automation — all under one roof.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact" className="btn-primary inline-flex">
                  Work With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-secondary inline-flex">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Story ────────────────────────────────────────────── */}
        <section className="section-padding bg-alternate">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-5xl mx-auto">
              <div>
                <span className="section-badge mb-6 inline-flex">{aboutData.storyBadge}</span>
                <h2 className="text-section-title mb-6">
                  {aboutData.storyTitle}
                </h2>
                <p className="text-paragraph mb-4">
                  {aboutData.storyP1}
                </p>
                <p className="text-paragraph mb-4">
                  {aboutData.storyP2}
                </p>
                <p className="text-paragraph">
                  {aboutData.storyP3}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "500+", label: "Projects Delivered" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "5+", label: "Years Experience" },
                  { value: "24/7", label: "Support Available" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="premium-card !p-5 sm:!p-8 text-center bg-white"
                  >
                    <StatNumber
                      value={stat.value}
                      className="text-[32px] sm:text-[42px] font-heading font-extrabold text-accent leading-none mb-2"
                      duration={1800}
                    />
                    <div className="text-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="section-badge mb-4 inline-flex">{aboutData.valuesBadge}</span>
              <h2 className="text-section-title mt-4">{aboutData.valuesTitle}</h2>
              <p className="text-paragraph max-w-[500px] mx-auto mt-4">
                {aboutData.valuesDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="premium-card group text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mx-auto mb-5 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-[18px] text-foreground mb-3">{v.title}</h3>
                  <p className="text-[14px] text-secondary-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 bg-accent">
          <div className="container-wide text-center">
            <div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-heading font-extrabold text-white mb-4">
                Let's Build Something Great
              </h2>
              <p className="text-[16px] sm:text-[18px] text-white/80 mb-10 max-w-[480px] mx-auto">
                Ready to take your business to the next level? We'd love to hear about your goals.
              </p>
              <Link
                href="/#contact"
                className="bg-white text-accent font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer navLinks={navLinks} footerData={footerData} contactInfo={contactInfo} />
      <ScrollToTop />
    </SmoothScroll>
  );
}

