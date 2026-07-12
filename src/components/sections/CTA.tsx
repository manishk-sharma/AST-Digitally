"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

interface CTAProps {
  ctaData?: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    email: string;
    whatsapp: string;
  };
}

export default function CTA({ ctaData }: CTAProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const badge = ctaData?.badge || "Free Consultation";
  const title = ctaData?.title || "Any questions about growing your business?";
  const description = ctaData?.description || "Feel free to reach out — we'd love to talk strategy.";
  const buttonText = ctaData?.buttonText || "Book a call";
  const buttonUrl = ctaData?.buttonUrl || "/#contact";
  const email = ctaData?.email || "astdigitally@gmail.com";
  const whatsapp = ctaData?.whatsapp || "918084158221";

  return (
    <section className="py-24 relative overflow-hidden bg-background" aria-label="Call to action banner">
      <div ref={ref} className="container-wide max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-foreground text-white p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 relative overflow-hidden"
        >
          {/* Left: Floating service pills */}
          <div className="relative w-full lg:w-[45%] h-[220px] flex items-center justify-center select-none shrink-0">
            {/* Center logo watermark */}
            <img
              src="/AST Logo.png"
              alt=""
              className="h-24 sm:h-28 w-auto object-contain opacity-30 select-none pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating pills with blue accent borders */}
            <div className="absolute hidden sm:block left-4 top-12 px-4 py-2 border border-accent/40 bg-accent/10 text-[12px] font-bold text-accent tracking-wide uppercase rounded-lg">
              Graphic Design
            </div>
            <div className="absolute hidden sm:block left-[38%] top-2 px-4 py-2 border border-accent/40 bg-accent/10 text-[12px] font-bold text-accent tracking-wide uppercase rounded-lg">
              Branding
            </div>
            <div className="absolute hidden sm:block right-4 bottom-[55px] px-4 py-2 border border-accent/40 bg-accent/10 text-[12px] font-bold text-accent tracking-wide uppercase rounded-lg">
              Web Application
            </div>
            <div className="absolute hidden sm:block left-12 bottom-4 px-4 py-2 border border-accent/40 bg-accent/10 text-[12px] font-bold text-accent tracking-wide uppercase rounded-lg">
              UI-UX
            </div>
          </div>

          {/* Right: Headline + CTA */}
          <div className="w-full lg:w-[55%] space-y-5 text-left relative z-10">
            <div className="inline-flex items-center gap-2 text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-[12px] font-mono font-bold tracking-wider uppercase">{badge}</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-heading font-extrabold tracking-tight text-white leading-[1.1]">
              {title}
            </h2>
            <p className="text-[16px] text-white/60">
              {description}
            </p>

            <div className="flex items-center gap-4 pt-2 flex-wrap">
              {/* Primary CTA */}
              <Link href={buttonUrl} className="btn-primary">
                {buttonText} <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
