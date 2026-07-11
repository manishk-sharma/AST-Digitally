"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Core homepage sections
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const Capabilities = dynamic(() => import("@/components/sections/Capabilities"), { ssr: false });
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"), { ssr: false });
const GrowthFramework = dynamic(() => import("@/components/sections/GrowthFramework"), { ssr: false });

// Preview sections linking to dedicated pages
const FeaturedServices = dynamic(() => import("@/components/sections/FeaturedServices"), { ssr: false });

// Social proof & conversion sections
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });
const Integrations = dynamic(() => import("@/components/sections/Integrations"), { ssr: false });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });
const CTA = dynamic(() => import("@/components/sections/CTA"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/layout/ScrollToTop"), { ssr: false });

export default function HomePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeaturedServices />
        <Capabilities />
        <GrowthFramework />
        <WhyUs />
        <CaseStudies />
        <Testimonials />
        <Integrations />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  );
}
