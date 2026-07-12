import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import WhyUs from "@/components/sections/WhyUs";
import GrowthFramework from "@/components/sections/GrowthFramework";
import FeaturedServices from "@/components/sections/FeaturedServices";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import Integrations from "@/components/sections/Integrations";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import type { Metadata } from "next";
import { getSeoConfigByPage } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfigByPage("Homepage");
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
  getHomepageData,
  getServicesFull,
  getCaseStudies,
  getTestimonials,
  getFAQs
} from "@/lib/cms";

export default async function HomePage() {
  // Fetch all CMS content from database with fallback constants
  const [
    navLinks,
    footerData,
    contactInfo,
    homepage,
    services,
    caseStudies,
    testimonials,
    faqs
  ] = await Promise.all([
    getNavbarLinks(),
    getFooterData(),
    getContactInfo(),
    getHomepageData(),
    getServicesFull(),
    getCaseStudies(),
    getTestimonials(),
    getFAQs()
  ]);

  return (
    <SmoothScroll>
      <Navbar navLinks={navLinks} />
      <main id="main-content">
        <Hero heroData={homepage.hero} statsData={homepage.statistics} />
        <FeaturedServices services={services} />
        <Capabilities />
        <GrowthFramework />
        <WhyUs />
        <CaseStudies caseStudies={caseStudies} />
        <Testimonials testimonials={testimonials} />
        <Integrations />
        <FAQ faqs={faqs} />
        <CTA ctaData={homepage.cta} />
        <Contact contactInfo={contactInfo} />
      </main>
      <Footer navLinks={navLinks} footerData={footerData} contactInfo={contactInfo} />
      <ScrollToTop />
    </SmoothScroll>
  );
}

