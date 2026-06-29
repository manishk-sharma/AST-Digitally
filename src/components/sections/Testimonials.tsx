"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/lib/hooks/useInView";

export default function Testimonials() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.02 });

  const testimonials = [
    {
      id: 1,
      name: "Briana Patton",
      role: "Operations Manager",
      avatar: "BP",
      quote: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
      color: "bg-neutral-900 dark:bg-neutral-100",
    },
    {
      id: 2,
      name: "Aliza Khan",
      role: "Business Analyst",
      avatar: "AK",
      quote: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
      color: "bg-neutral-700 dark:bg-neutral-300",
    },
    {
      id: 3,
      name: "Hassan Ali",
      role: "E-commerce Manager",
      avatar: "HA",
      quote: "Our sales pipeline became more visible, and lead times shortened. Very happy with the custom workflows.",
      color: "bg-neutral-800",
    },
    {
      id: 4,
      name: "Farhan Siddiqui",
      role: "Marketing Director",
      avatar: "FS",
      quote: "Our business functions improved with a user-friendly design and positive customer feedback.",
      color: "bg-neutral-700",
    },
    {
      id: 5,
      name: "Aliza Khan",
      role: "Business Analyst",
      avatar: "AK",
      quote: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
      color: "bg-neutral-800 dark:bg-neutral-200",
    },
    {
      id: 6,
      name: "Briana Patton",
      role: "Operations Manager",
      avatar: "BP",
      quote: "The team provided excellent post-launch support. Ongoing campaign optimization has consistently brought in qualified leads.",
      color: "bg-neutral-800",
    },
  ];

  return (
    <section
      id="testimonials"
      className="section-padding bg-white relative overflow-hidden"
      aria-label="What our users say"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Testimonials"
          title="What our users say"
          subtitle="Discover how thousands of teams streamline their operations with our platform."
        />

        {/* Masonry Columns Layout */}
        <div
          ref={ref}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full max-w-6xl mx-auto"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="break-inside-avoid-column mb-6 inline-block w-full"
            >
              <GlassCard
                variant="solid"
                hover={true}
                className="p-6 md:p-7 border border-border bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.035)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.055)] transition-all duration-300"
              >
                {/* Quote Content */}
                <p className="text-sm leading-relaxed text-muted-foreground mb-6 font-sans font-medium">
                  {t.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.color} text-xs font-extrabold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground font-sans">
                      {t.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-sans font-medium">
                      {t.role}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
