"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Dynamically import client-heavy sections to optimize performance and prevent hydration mismatch
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });

const ProcessCode = dynamic(() => import("@/components/sections/ProcessCode"), { ssr: false });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: false });
const DeveloperExperience = dynamic(() => import("@/components/sections/DeveloperExperience"), { ssr: false });
const Industries = dynamic(() => import("@/components/sections/Industries"), { ssr: false });
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"), { ssr: false });
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
        <Services />
        <ProcessCode />
        <WhyUs />
        <Industries />
        <DeveloperExperience />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  );
}
