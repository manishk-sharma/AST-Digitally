"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";

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
      className="section-padding bg-card relative overflow-hidden"
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
                  className={`p-5 border transition-all duration-300 ${
                    activeStep === idx
                      ? "border-accent bg-background"
                      : "border-transparent hover:bg-background"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-[11px] font-mono font-bold leading-none px-2 py-1 border ${
                        activeStep === idx
                          ? "bg-accent text-white border-accent"
                          : "text-muted-foreground border-border bg-card"
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className="text-base font-heading font-bold text-foreground tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-label leading-relaxed text-secondary-foreground pl-0 sm:pl-[44px] break-words">
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
              <div
                className="border border-border bg-background"
              >
                {/* Editor Tab Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider select-none">
                      ast-framework.ts
                    </span>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Editor Content Area */}
                <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[12px] leading-relaxed text-foreground overflow-x-auto min-h-[140px] md:min-h-[220px] block min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={activeStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <code className="whitespace-pre-wrap break-all sm:break-normal sm:whitespace-pre">{steps[activeStep].code}</code>
                    </motion.pre>
                  </AnimatePresence>
                </div>
              </div>
              <div className="text-right text-[9px] sm:text-[10px] font-mono text-neutral-500 mt-2.5 uppercase tracking-wider select-none break-words">
                Interactive Growth Pipeline & SDK Execution Sandbox
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
