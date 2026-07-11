"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Target, Palette, MessageSquare, Clock, Users, Rocket } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const getDiffIcon = (num: string) => {
  switch (num) {
    case "01": return Target;
    case "02": return Palette;
    case "03": return MessageSquare;
    case "04": return Clock;
    case "05": return Users;
    case "06": return Rocket;
    default: return Target;
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
      className="section-padding bg-background relative overflow-hidden"
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
                <div className="premium-card p-8 h-full flex flex-col group">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-label text-accent font-mono font-bold">
                        {diff.num}
                      </span>
                    </div>

                    <h3 className="text-[20px] font-heading font-extrabold text-foreground mb-3 tracking-tight">
                      {diff.title}
                    </h3>

                    <p className="text-paragraph text-[15px]">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
