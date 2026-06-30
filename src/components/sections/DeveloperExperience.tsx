"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

export default function DeveloperExperience() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState("SEO");
  const [copied, setCopied] = useState(false);

  const commands: Record<string, string> = {
    SEO: "npx @ast-digitally/audit --seo https://yourwebsite.com",
    Speed: "npx @ast-digitally/audit --speed https://yourwebsite.com",
    Security: "npx @ast-digitally/audit --security https://yourwebsite.com",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };

  return (
    <section
      id="audit-tool"
      className="section-padding relative overflow-hidden"
      aria-label="Website Audit Tool"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Audit Tool"
          title="Built for Performance"
          subtitle="Test your website's search engine optimizations, speed metrics, and cloud security features instantly using our CLI framework."
        />

        <div ref={ref} className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <GlassCard
              variant="solid"
              hover={false}
              className="overflow-hidden border border-neutral-800 shadow-[0_4px_18px_rgba(0,0,0,0.12)] bg-neutral-950 text-neutral-300"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-5 py-4 bg-neutral-900 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    cli-terminal
                  </span>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2">
                  {Object.keys(commands).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded transition-colors ${
                        activeTab === tab
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal input display */}
              <div className="p-4 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed flex items-center justify-between gap-4 min-w-0 border-t border-neutral-900/50">
                <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none min-w-0 flex-1">
                  <span className="text-neutral-600 select-none">$</span>
                  <span className="select-all whitespace-nowrap text-white">{commands[activeTab]}</span>
                </div>
                
                {/* Copy action */}
                <button
                  onClick={handleCopy}
                  className="text-neutral-500 hover:text-neutral-300 transition-colors p-1.5 rounded hover:bg-neutral-900 shrink-0"
                  aria-label="Copy installation command"
                >
                  {copied ? (
                    <span className="text-[11px] font-bold text-neutral-400">Copied!</span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
