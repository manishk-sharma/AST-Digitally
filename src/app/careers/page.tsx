import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/constants";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the ${BRAND.name} team. Explore career opportunities in digital marketing, web development, design, and technology.`,
};

export default function CareersPage() {
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

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-muted-foreground max-w-2xl mb-12">
          At {BRAND.name}, we are looking for passionate individuals who want to make an impact in digital marketing, web development, design, and technology.
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Open Positions</h2>
            <p className="text-muted-foreground">We don&apos;t have any open positions right now, but we&apos;re always on the lookout for talented people.</p>

            <h2 className="text-xl font-bold mt-10">Why Join Us?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Remote First", desc: "Work from anywhere in the world with our flexible remote culture." },
                { title: "Growth Mindset", desc: "Continuous learning opportunities, workshops, and skill development programs." },
                { title: "Innovative Projects", desc: "Work on cutting-edge projects using the latest technologies and tools." },
                { title: "Great Culture", desc: "Collaborative, inclusive, and supportive team environment." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border p-5">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <ApplyForm />
        </div>
      </div>
    </main>
  );
}
