"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { Sparkles, Code, Terminal, Cpu, FileText, ShoppingBag, Database, Flame, Cloud, PenTool, Activity, Braces, Wind } from "lucide-react";

export default function Integrations() {
  const row1 = [
    { name: "OpenAI", Icon: Sparkles },
    { name: "React", Icon: Code },
    { name: "Next.js", Icon: Terminal },
    { name: "Node.js", Icon: Braces },
    { name: "TypeScript", Icon: Code },
    { name: "Tailwind CSS", Icon: Wind },
    { name: "Laravel", Icon: Cpu },
    { name: "WordPress", Icon: FileText },
  ];

  const row2 = [
    { name: "Shopify", Icon: ShoppingBag },
    { name: "MongoDB", Icon: Database },
    { name: "PostgreSQL", Icon: Database },
    { name: "Supabase", Icon: Flame },
    { name: "Firebase", Icon: Flame },
    { name: "AWS", Icon: Cloud },
    { name: "Figma", Icon: PenTool },
    { name: "Framer Motion", Icon: Activity },
  ];

  return (
    <section
      id="ecosystem"
      className="section-padding bg-background relative overflow-hidden"
      aria-label="Technology Stack"
    >
      <div className="container-wide mb-12">
        <SectionHeading
          badge="Technology"
          title="Powered by Modern Technologies"
          subtitle="We build high-performance web experiences and AI automations using industry-leading, enterprise-grade technologies."
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Row 1: Sliding Left */}
        <div className="relative flex overflow-x-hidden w-full select-none">
          <div className="animate-marquee-left flex gap-4 pr-4">
            {[...row1, ...row1, ...row1, ...row1].map((item, index) => {
              const Icon = item.Icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3.5 text-[13px] font-semibold text-foreground hover:border-accent/40 hover:text-accent transition-colors duration-200 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 text-accent shrink-0" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="relative flex overflow-x-hidden w-full select-none">
          <div className="animate-marquee-right flex gap-4 pr-4">
            {[...row2, ...row2, ...row2, ...row2].map((item, index) => {
              const Icon = item.Icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3.5 text-[13px] font-semibold text-foreground hover:border-accent/40 hover:text-accent transition-colors duration-200 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 text-accent shrink-0" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
