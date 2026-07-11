"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const tickerStats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Project Support" },
    { value: "99.9%", label: "Platform Reliability" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32 pb-24 bg-background animate-fade-up"
      aria-label="Hero section"
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(to right, #F0F0F0 1px, transparent 1px), linear-gradient(to bottom, #F0F0F0 1px, transparent 1px)`,
        backgroundSize: `60px 60px`
      }} />

      {/* Blue glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Content */}
      <div className="container-wide w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center mt-12">
        <div className="w-full max-w-[1000px] flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="section-badge">Digital Growth Partner</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 text-hero"
          >
            Transform Your Business with Digital Marketing &{" "}
            <span className="text-accent">Smart Technology</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-14 text-paragraph max-w-[640px] mx-auto"
          >
            We design, market, automate, and scale businesses with creative strategies and custom digital solutions that deliver real results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/#contact" className="btn-primary">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-24 md:mt-32 w-full relative z-10 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tickerStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="premium-card flex flex-col items-center justify-center text-center !p-8 group"
              >
                <span className="text-[32px] md:text-[40px] font-heading font-extrabold text-accent mb-2 leading-none group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-label">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
