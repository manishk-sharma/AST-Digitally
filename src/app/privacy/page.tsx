import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-wide py-20 md:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-semibold"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

        <div className="prose prose-sm max-w-3xl text-muted-foreground space-y-6">
          <p>
            At {BRAND.name}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you fill out a contact form, subscribe to our newsletter, or request a consultation. This may include your name, email address, phone number, and company details.
          </p>
          <p>
            We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar technologies.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, and maintain our services</li>
            <li>To respond to your inquiries, questions, and requests</li>
            <li>To send you marketing and promotional communications (with your consent)</li>
            <li>To improve our website and services based on your feedback</li>
            <li>To comply with legal obligations and protect our rights</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground mt-8">3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">5. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, update, or delete your personal information. You may also have the right to object to or restrict certain processing of your data. To exercise these rights, please contact us using the information below.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href={`mailto:${BRAND.email}`} className="text-foreground underline underline-offset-2 hover:no-underline">
              {BRAND.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${BRAND.phone}`} className="text-foreground underline underline-offset-2 hover:no-underline">
              {BRAND.phone}
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
