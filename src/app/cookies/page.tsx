import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: "Cookie Settings",
  description: `Cookie Policy for ${BRAND.name}. Learn how we use cookies and how to manage your preferences.`,
};

export default function CookiesPage() {
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

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookie Settings</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

        <div className="prose prose-sm max-w-3xl text-muted-foreground space-y-6">
          <p>
            This Cookie Policy explains how {BRAND.name} uses cookies and similar technologies on our website. Cookies are small text files stored on your device that help us improve your browsing experience.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">2. Types of Cookies We Use</h2>

          <h3 className="text-base font-bold text-foreground mt-6">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.
          </p>

          <h3 className="text-base font-bold text-foreground mt-6">Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting anonymous information about pages visited, time spent, and error messages. This helps us improve our website.
          </p>

          <h3 className="text-base font-bold text-foreground mt-6">Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites to display relevant advertisements and measure the effectiveness of marketing campaigns.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">3. How to Manage Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, but this may affect the functionality of our website.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Chrome:</strong> Settings &rarr; Privacy and Security &rarr; Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Options &rarr; Privacy & Security &rarr; Cookies and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Cookies and website data
            </li>
            <li>
              <strong>Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Cookies and site data
            </li>
          </ul>

          <h2 className="text-lg font-bold text-foreground mt-8">4. Third-Party Cookies</h2>
          <p>
            We may use third-party services such as Google Analytics, Meta Pixel, and other analytics tools that set their own cookies. These third-party services have their own privacy policies governing the use of your information.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">5. Contact</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at{" "}
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
