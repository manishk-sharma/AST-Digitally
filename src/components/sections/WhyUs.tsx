"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Target, Palette, MessageSquare, Clock, Users, Rocket } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

const getDiffIcon = (num: string) => {
  switch (num) {
    case "01":
      return Target;
    case "02":
      return Palette;
    case "03":
      return MessageSquare;
    case "04":
      return Clock;
    case "05":
      return Users;
    case "06":
      return Rocket;
    default:
      return Target;
  }
};

export default function WhyUs() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const differentiators = [
    {
      num: "01",
      title: "Tailor-Made Solutions",
      desc: "Every business is unique. We craft custom strategies and solutions that align with your specific goals, industry, and budget.",
    },
    {
      num: "02",
      title: "Creative UI/UX",
      desc: "We design stunning, user-friendly interfaces that captivate your audience and drive higher engagement and conversions.",
    },
    {
      num: "03",
      title: "Transparent Communication",
      desc: "No hidden agendas. We keep you informed at every stage with clear updates, honest feedback, and complete project visibility.",
    },
    {
      num: "04",
      title: "On-Time Delivery",
      desc: "We respect your time. Our structured workflows and dedicated teams ensure every project is delivered on schedule without compromising quality.",
    },
    {
      num: "05",
      title: "Long-Term Support",
      desc: "Our relationship doesn't end at launch. We provide ongoing maintenance, support, and optimization to keep your business growing.",
    },
    {
      num: "06",
      title: "End-to-End Services",
      desc: "From strategy and design to development, marketing, and automation — we handle everything under one roof for a seamless experience.",
    },
  ];

  return (
    <section
      id="why-us"
      className="section-padding relative overflow-hidden"
      aria-label="Why choose us"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Why Choose Us"
          title="Why Businesses Trust AST Digitally"
          subtitle="We deliver tailor-made digital solutions with creativity, transparency, and a commitment to your long-term success."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {differentiators.map((diff, i) => {
            const Icon = getDiffIcon(diff.num);
            return (
              <motion.div
                key={diff.num}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <GlassCard
                  variant="solid"
                  hover={true}
                  className="p-8 h-full flex flex-col justify-between border border-border"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 transition-transform duration-400 group-hover:scale-105">
                        <Icon className="h-5 w-5 stroke-[1.8]" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold border border-border rounded px-1.5 py-0.5 leading-none">
                        {diff.num}
                      </span>
                    </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 font-sans tracking-wide">
                    {diff.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-neutral-600 font-medium">
                    {diff.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
