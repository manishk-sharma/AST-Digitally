"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { Star } from "lucide-react";

interface TestimonialsProps {
  testimonials?: Array<{
    id: string | number;
    name: string;
    role: string;
    avatar: string;
    content: string;
  }>;
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.02 });

  const displayList = (testimonials && testimonials.length > 0) ? testimonials.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    avatar: t.avatar || t.name.charAt(0),
    quote: t.content
  })) : [
    {
      id: 1,
      name: "Briana Patton",
      role: "Operations Manager",
      avatar: "BP",
      quote: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    },
    {
      id: 2,
      name: "Aliza Khan",
      role: "Business Analyst",
      avatar: "AK",
      quote: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance significantly.",
    },
    {
      id: 3,
      name: "Hassan Ali",
      role: "E-commerce Manager",
      avatar: "HA",
      quote: "Our sales pipeline became more visible, and lead times shortened dramatically. Very happy with the custom workflows AST built for us.",
    },
    {
      id: 4,
      name: "Farhan Siddiqui",
      role: "Marketing Director",
      avatar: "FS",
      quote: "Our business functions improved with a user-friendly design and positive customer feedback. Highly recommend AST Digitally!",
    },
    {
      id: 5,
      name: "Nadia Ahmed",
      role: "Business Analyst",
      avatar: "NA",
      quote: "AST's seamless integration enhanced our business operations and efficiency. Their intuitive interface is a game-changer.",
    },
    {
      id: 6,
      name: "James Cooper",
      role: "Operations Manager",
      avatar: "JC",
      quote: "The team provided excellent post-launch support. Ongoing campaign optimization has consistently brought in qualified leads every month.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="section-padding bg-alternate relative overflow-hidden"
      aria-label="What our clients say"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="See how businesses across industries have transformed their digital presence and achieved measurable growth with AST Digitally."
        />

        {/* Masonry grid */}
        <div
          ref={ref}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full max-w-6xl mx-auto"
        >
          {displayList.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="break-inside-avoid-column mb-6 inline-block w-full"
            >
              <div className="premium-card p-6 md:p-8 bg-white">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-foreground font-medium leading-[1.7] mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-[12px] font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-[14px] font-heading font-bold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
