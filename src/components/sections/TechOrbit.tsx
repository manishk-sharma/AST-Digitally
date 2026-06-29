"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import SceneLoader from "@/components/ui/SceneLoader";
import { TECH_NODES } from "@/lib/constants";
import { useGPUTier } from "@/lib/hooks/useGPUTier";
import { useInView } from "@/lib/hooks/useInView";

const OrbitScene = dynamic(() => import("@/components/canvas/OrbitScene"), {
  ssr: false,
  loading: () => <SceneLoader className="h-full w-full" />,
});

/**
 * Technology ecosystem section with interactive orbital visualization.
 * Falls back to a grid on low-end devices.
 */
export default function TechOrbit() {
  const gpuTier = useGPUTier();
  const show3D = gpuTier !== "low";
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const selectedTech = TECH_NODES.find((n) => n.id === selectedNode);

  return (
    <section
      id="technology"
      className="section-padding relative overflow-hidden"
      aria-label="Technology ecosystem"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Our Technology"
          title="Technology Ecosystem"
          subtitle="A unified platform where AI, cloud, web, and marketing technologies orbit around your business goals."
        />

        <div ref={ref} className="relative">
          {show3D ? (
            <div className="mx-auto aspect-square max-w-2xl">
              <OrbitScene />
            </div>
          ) : null}

          {/* Technology grid (visible on low-end or as supplementary) */}
          <div
            className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${show3D ? "mt-12" : ""}`}
          >
            {TECH_NODES.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <button
                  onClick={() =>
                    setSelectedNode(selectedNode === node.id ? null : node.id)
                  }
                  className="w-full text-left"
                  aria-expanded={selectedNode === node.id}
                >
                  <GlassCard
                    variant="solid"
                    hover={true}
                    className={`cursor-pointer p-5 transition-all duration-300 ${
                      selectedNode === node.id
                        ? "border-neutral-800 bg-neutral-50 shadow-[0_2px_10px_rgba(0,0,0,0.035)]"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="text-sm font-bold text-foreground">
                        {node.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {node.description}
                    </p>
                  </GlassCard>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Selected Node Detail Panel */}
          <AnimatePresence>
            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 overflow-hidden"
              >
                <GlassCard variant="frosted" className="p-6 border-neutral-400">
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1.5 h-3 w-3 rounded-full"
                      style={{ backgroundColor: selectedTech.color }}
                    />
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {selectedTech.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {selectedTech.description}
                      </p>
                      <div className="mt-6 grid gap-6 sm:grid-cols-2 border-t border-border pt-6">
                        <div>
                          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
                            Use Cases
                          </h4>
                          <ul className="space-y-2">
                            {selectedTech.useCases.map((uc) => (
                              <li
                                key={uc}
                                className="text-xs text-muted-foreground font-medium"
                              >
                                • {uc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTech.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-lg border border-border bg-neutral-50 px-2.5 py-1 text-xs text-muted-foreground font-semibold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accessible list for screen readers */}
        <ul className="sr-only" aria-label="Technologies">
          {TECH_NODES.map((node) => (
            <li key={node.id}>
              {node.label}: {node.description}. Technologies:{" "}
              {node.technologies.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
