import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${BRAND.name}. Please read these terms carefully before using our services.`,
};

export default function TermsPage() {
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

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

        <div className="prose prose-sm max-w-3xl text-muted-foreground space-y-6">
          <p>
            Welcome to {BRAND.name}. By accessing or using our website and services, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please do not use our services.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">1. Services</h2>
          <p>
            {BRAND.name} provides digital marketing, web development, design, and technology solutions. All services are delivered based on the scope defined in the project agreement between {BRAND.name} and the client.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">2. Intellectual Property</h2>
          <p>
            All content, design, code, graphics, and materials created by {BRAND.name} for a client project remain the intellectual property of {BRAND.name} until full payment is received. Upon full payment, the client receives full ownership of the delivered work, excluding any third-party assets, libraries, or frameworks used.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">3. Payment Terms</h2>
          <p>
            Payment terms are outlined in the project proposal and agreement. A deposit may be required before work begins. Invoices are due within the timeframe specified in the agreement. Late payments may result in project delays or suspension of services.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">4. Revisions and Changes</h2>
          <p>
            Revisions and change requests are handled according to the terms specified in the project agreement. Additional work outside the original scope may incur extra charges.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">5. Limitation of Liability</h2>
          <p>
            {BRAND.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of our services. Our total liability shall not exceed the total amount paid by the client for the specific project.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">6. Termination</h2>
          <p>
            Either party may terminate the agreement with written notice as specified in the project contract. Upon termination, the client shall pay for all work completed up to the date of termination.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-8">7. Contact</h2>
          <p>
            For questions about these Terms &amp; Conditions, please contact us at{" "}
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
