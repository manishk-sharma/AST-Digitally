"use client";

import SectionHeading from "@/components/ui/SectionHeading";

export default function Integrations() {
  const row1 = [
    { name: "OpenAI", icon: "🧠" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "🟦" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Laravel", icon: "🟥" },
    { name: "WordPress", icon: "📝" },
  ];

  const row2 = [
    { name: "Shopify", icon: "🛍️" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Supabase", icon: "⚡" },
    { name: "Firebase", icon: "🔥" },
    { name: "AWS", icon: "☁️" },
    { name: "Figma", icon: "✏️" },
    { name: "Framer Motion", icon: "🌀" },
  ];

  return (
    <section
      id="ecosystem"
      className="py-20 md:py-28 relative overflow-hidden"
      aria-label="Technology Stack"
    >
      <div className="container-wide mb-12">
        <SectionHeading
          badge="Technology"
          title="Powered by Modern Technologies"
          subtitle="We build high-performance web experiences and AI automations using industry-leading, enterprise-grade technologies."
        />
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* Row 1: Sliding Left */}
        <div className="relative flex overflow-x-hidden w-full select-none">
          <div className="animate-marquee-left flex gap-8 pr-8">
            {[...row1, ...row1, ...row1, ...row1].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.035)]"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="relative flex overflow-x-hidden w-full select-none">
          <div className="animate-marquee-right flex gap-8 pr-8">
            {[...row2, ...row2, ...row2, ...row2].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.035)]"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
