"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Label } from "@/components/ui/label";
import { ROI_DEFAULTS } from "@/lib/constants";
import { useInView } from "@/lib/hooks/useInView";

/**
 * Interactive ROI Calculator with slider inputs and animated results.
 */
export default function ROICalculator() {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(ROI_DEFAULTS.monthlyRevenue);
  const [marketingSpend, setMarketingSpend] = useState<number>(ROI_DEFAULTS.marketingSpend);
  const [teamSize, setTeamSize] = useState<number>(ROI_DEFAULTS.teamSize);
  const [conversionRate, setConversionRate] = useState<number>(ROI_DEFAULTS.conversionRate);

  const results = useMemo(() => {
    const revenueGrowth = monthlyRevenue * 0.35; // 35% improvement
    const costSavings = (teamSize * 5000 * 0.25); // 25% efficiency gain
    const marketingROI = marketingSpend * 2.5; // 2.5x ROAS improvement
    const newConversion = conversionRate * 1.8; // 80% conversion lift

    return {
      additionalRevenue: Math.round(revenueGrowth),
      annualSavings: Math.round(costSavings * 12),
      marketingReturn: Math.round(marketingROI),
      newConversionRate: parseFloat(newConversion.toFixed(1)),
    };
  }, [monthlyRevenue, marketingSpend, teamSize, conversionRate]);

  interface SliderConfig {
    label: string;
    value: number;
    setValue: (val: number) => void;
    min: number;
    max: number;
    step: number;
    format: (v: number) => string;
  }

  const sliders: SliderConfig[] = [
    {
      label: "Monthly Revenue",
      value: monthlyRevenue,
      setValue: setMonthlyRevenue,
      min: 10000,
      max: 1000000,
      step: 10000,
      format: (v: number) => `$${(v / 1000).toFixed(0)}K`,
    },
    {
      label: "Marketing Spend",
      value: marketingSpend,
      setValue: setMarketingSpend,
      min: 1000,
      max: 200000,
      step: 1000,
      format: (v: number) => `$${(v / 1000).toFixed(0)}K`,
    },
    {
      label: "Team Size",
      value: teamSize,
      setValue: setTeamSize,
      min: 1,
      max: 100,
      step: 1,
      format: (v: number) => `${v} people`,
    },
    {
      label: "Current Conversion Rate",
      value: conversionRate,
      setValue: setConversionRate,
      min: 0.5,
      max: 10,
      step: 0.1,
      format: (v: number) => `${v.toFixed(1)}%`,
    },
  ];

  return (
    <section
      id="roi"
      className="section-padding relative overflow-hidden"
      aria-label="ROI calculator"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ast-blue)]/[0.02] to-transparent" />

      <div className="container-wide relative">
        <SectionHeading
          badge="ROI Calculator"
          title="Calculate Your Growth Potential"
          subtitle="See the projected impact of partnering with AST Digitally on your business metrics."
        />

        <div ref={ref} className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <GlassCard variant="solid" hover={false} className="p-6 lg:p-8">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">
                  Your Business Metrics
                </h3>
                <div className="space-y-6">
                  {sliders.map((slider) => (
                    <div key={slider.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {slider.label}
                        </Label>
                        <span className="text-sm font-bold text-foreground">
                          {slider.format(slider.value)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={slider.value}
                        onChange={(e) =>
                          slider.setValue(parseFloat(e.target.value))
                        }
                        className="w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 h-1.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                        aria-label={slider.label}
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard
                variant="solid"
                hover={true}
                className="relative overflow-hidden p-6 lg:p-8"
              >
                <div className="relative">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">
                    Projected Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Additional Monthly Revenue",
                        value: results.additionalRevenue,
                        prefix: "$",
                        icon: "📈",
                      },
                      {
                        label: "Annual Cost Savings",
                        value: results.annualSavings,
                        prefix: "$",
                        icon: "💰",
                      },
                      {
                        label: "Marketing ROI",
                        value: results.marketingReturn,
                        prefix: "$",
                        icon: "🎯",
                      },
                      {
                        label: "New Conversion Rate",
                        value: results.newConversionRate,
                        suffix: "%",
                        icon: "🚀",
                        decimals: 1,
                      },
                    ].map((result, j) => (
                      <motion.div
                        key={result.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + j * 0.08 }}
                        className="rounded-lg border border-border bg-neutral-50 p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.025)]"
                      >
                        <div className="mb-1 text-lg animate-float" aria-hidden="true">
                          {result.icon}
                        </div>
                        <div className="text-xl font-extrabold text-foreground lg:text-2xl">
                          <AnimatedCounter
                            value={result.value}
                            prefix={result.prefix}
                            suffix={result.suffix}
                            decimals={"decimals" in result ? result.decimals : 0}
                          />
                        </div>
                        <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                          {result.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-neutral-50 border border-border p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Estimated Annual Impact
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-foreground">
                      $
                      {(
                        (results.additionalRevenue * 12 +
                          results.annualSavings) /
                        1000000
                      ).toFixed(1)}
                      M+
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
