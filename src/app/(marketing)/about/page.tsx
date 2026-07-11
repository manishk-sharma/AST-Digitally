"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/layout/ScrollToTop"), { ssr: false });

const VALUES = [
  { icon: Target, title: "Results-Focused", desc: "Every strategy we build is anchored in measurable outcomes — not vanity metrics." },
  { icon: Lightbulb, title: "Creative Thinking", desc: "We blend design, technology, and marketing into solutions that stand out." },
  { icon: Heart, title: "Client-First", desc: "Your success is our success. We treat your business like our own." },
  { icon: TrendingUp, title: "Continuous Growth", desc: "We don't rest after launch. We optimize, iterate, and keep pushing forward." },
];

export default function AboutPage() {
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
          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="section-badge">About Us</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-hero mb-8"
              >
                We Help Businesses{" "}
                <span className="text-accent">Grow Digitally</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-paragraph max-w-[650px] mb-10"
              >
                AST Digitally is a full-service digital agency founded by Asif Siddique. We help startups, SMEs, and enterprises grow through digital marketing, stunning websites, branding, and intelligent automation — all under one roof.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/#contact" className="btn-primary inline-flex">
                  Work With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-secondary inline-flex">
                  Our Services
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Story ────────────────────────────────────────────── */}
        <section className="section-padding bg-alternate">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-badge mb-6 inline-flex">Our Story</span>
                <h2 className="text-section-title mb-6">
                  Born from a passion<br />
                  <span className="text-accent">for digital excellence</span>
                </h2>
                <p className="text-paragraph mb-4">
                  AST Digitally was founded with a simple belief: every business deserves access to world-class digital services — not just the ones with enterprise-sized budgets.
                </p>
                <p className="text-paragraph mb-4">
                  We started as a small team of designers and developers, and grew into a full-service agency covering everything from SEO and paid ads to AI automation and custom web applications.
                </p>
                <p className="text-paragraph">
                  Today, we've delivered 500+ projects and maintained a 98% client satisfaction rate — built on transparency, creativity, and an obsession with results.
                </p>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "500+", label: "Projects Delivered" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "5+", label: "Years Experience" },
                  { value: "24/7", label: "Support Available" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="premium-card !p-8 text-center bg-white"
                  >
                    <div className="text-[42px] font-heading font-extrabold text-accent leading-none mb-2">
                      {stat.value}
                    </div>
                    <div className="text-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="section-badge mb-4 inline-flex">Our Values</span>
              <h2 className="text-section-title mt-4">What We Stand For</h2>
              <p className="text-paragraph max-w-[500px] mx-auto mt-4">
                These principles guide every project, every decision, and every client relationship.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {VALUES.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="premium-card group text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mx-auto mb-5 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-[18px] text-foreground mb-3">{v.title}</h3>
                  <p className="text-[14px] text-secondary-foreground">{v.desc}</p>
                </motion.div>
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
            >
              <h2 className="text-[48px] font-heading font-extrabold text-white mb-4">
                Let's Build Something Great
              </h2>
              <p className="text-[18px] text-white/80 mb-10 max-w-[480px] mx-auto">
                Ready to take your business to the next level? We'd love to hear about your goals.
              </p>
              <Link
                href="/#contact"
                className="bg-white text-accent font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Start a Conversation <ArrowRight className="h-4 w-4" />
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
