"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/lib/hooks/useInView";

export default function ProcessCode() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Business analysis, competitor research, and market insights to establish clear targets.",
      code: `// Step 1: Discover & Analyze Market Positioning
import { AST } from "@ast/digitally";

const audit = await AST.analyze({
  domain: "client-business.com",
  competitors: ["competitor-a.com", "competitor-b.com"],
  scanDepth: "deep"
});

console.log("Identified SEO & automation opportunities:", audit.score);`,
    },
    {
      num: "02",
      title: "Strategy",
      desc: "Constructing a clear growth roadmap, technology planning, and performance campaign architecture.",
      code: `// Step 2: Formulate Growth & Technical Roadmap
const roadmap = await AST.createRoadmap({
  objectives: ["generate-leads", "improve-load-times"],
  marketingChannels: ["google-ads", "technical-seo"],
  budget: "optimized"
});

console.log("Estimated conversion lift:", roadmap.projectedROI);`,
    },
    {
      num: "03",
      title: "Design",
      desc: "Creating professional UI/UX, high-converting prototypes, brand assets, and content layouts.",
      code: `// Step 3: UI/UX Prototypes & Creative Assets
const brandAssets = await AST.design({
  layout: "minimalist-light-grid",
  components: ["bento-grid", "scroll-marquee", "3d-globe"],
  responsive: true,
  interactiveAnimations: ["framer-motion"]
});`,
    },
    {
      num: "04",
      title: "Build",
      desc: "Developing modern Next.js/React websites, cloud backend workflows, and custom AI agents.",
      code: `// Step 4: Develop Modern Stack & Deploy Workflows
const application = await AST.build({
  framework: "nextjs",
  styling: "tailwind-css",
  database: "postgresql",
  aiIntegrations: ["custom-chatbots", "lead-scoring-agent"]
});

await application.deploy();`,
    },
    {
      num: "05",
      title: "Launch",
      desc: "Executing technical SEO configurations, launching targeted ad accounts, and tracking performance analytics.",
      code: `// Step 5: Live Production Launch & Performance Tracking
const campaign = await AST.launch({
  productionUrl: "https://yourwebsite.com",
  adAccounts: ["google-ads", "meta-ads"],
  analytics: ["conversion-funnels", "user-heatmaps"]
});

await campaign.activateSEOTopicalClusters();`,
    },
    {
      num: "06",
      title: "Scale",
      desc: "Applying continuous enhancements, performance logs audits, and ongoing AI optimizations.",
      code: `// Step 6: Continuous Scalability & Long-Term Retention
await AST.scale({
  monitoring: "24/7-error-logging",
  abTesting: ["headlines", "cta-placements"],
  aiOptimization: {
    adjustBidding: true,
    optimizeCopy: true
  }
});`,
    },
  ];

  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden"
      aria-label="Growth Process and Framework"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Our Process"
          title="A Proven Framework for Digital Growth"
          subtitle="Every project follows a structured process designed to maximize efficiency, reduce risk, and deliver measurable business outcomes."
        />

        <div ref={ref} className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Interactive Step list */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => (
              <button
                key={step.num}
                onMouseEnter={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                className="w-full text-left"
                aria-label={`Show process step ${step.title}`}
              >
                <div
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    activeStep === idx
                      ? "border-neutral-800 bg-neutral-50 shadow-[0_2px_10px_rgba(0,0,0,0.035)] border-l-4 border-l-foreground"
                      : "border-transparent hover:bg-neutral-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold leading-none px-1.5 py-0.5 border rounded ${
                        activeStep === idx
                          ? "bg-primary text-primary-foreground border-primary"
                          : "text-neutral-400 border-border"
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className="text-sm font-extrabold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground pl-9">
                    {step.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: macOS Code editor preview */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <GlassCard
                variant="solid"
                hover={false}
                className="overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_4px_18px_rgba(0,0,0,0.12)]"
              >
                {/* Editor Tab Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-neutral-900/60 border-b border-neutral-800/80">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider select-none">
                    ast-framework.ts
                  </span>
                  <div className="w-12" />
                </div>

                {/* Editor Content Area */}
                <div className="p-6 font-mono text-[12px] leading-relaxed text-neutral-300 overflow-x-auto min-h-[220px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={activeStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <code>{steps[activeStep].code}</code>
                    </motion.pre>
                  </AnimatePresence>
                </div>
              </GlassCard>
              <div className="text-right text-[10px] font-mono text-neutral-500 mt-2.5 uppercase tracking-wider select-none">
                Interactive Growth Pipeline & SDK Execution Sandbox
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
