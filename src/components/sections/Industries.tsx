"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";

const industries = [
  { name: "Healthcare", icon: "🏥", desc: "Digital solutions for hospitals, clinics, and health-tech startups." },
  { name: "Education", icon: "📚", desc: "E-learning platforms, school websites, and educational tools." },
  { name: "Fashion", icon: "👗", desc: "Branding, e-commerce, and digital marketing for fashion brands." },
  { name: "Real Estate", icon: "🏢", desc: "Property portals, virtual tours, and real estate marketing." },
  { name: "Travel", icon: "✈️", desc: "Travel booking platforms, tourism websites, and destination marketing." },
  { name: "BPO/KPO", icon: "📞", desc: "Business process automation and customer support solutions." },
  { name: "E-commerce", icon: "🛒", desc: "Online stores, marketplaces, and shopping experiences." },
  { name: "Finance", icon: "💰", desc: "Fintech apps, dashboards, and financial advisory websites." },
  { name: "Manufacturing", icon: "🏭", desc: "Industrial websites, supply chain portals, and B2B platforms." },
  { name: "Startups & SMEs", icon: "🚀", desc: "Scalable MVPs, growth marketing, and digital transformation." },
];

import { HeartPulse, GraduationCap, Shirt, Building2, Compass, PhoneCall, ShoppingBag, DollarSign, Factory, Rocket } from "lucide-react";

const getIndustryIcon = (name: string) => {
  switch (name) {
    case "Healthcare":
      return HeartPulse;
    case "Education":
      return GraduationCap;
    case "Fashion":
      return Shirt;
    case "Real Estate":
      return Building2;
    case "Travel":
      return Compass;
    case "BPO/KPO":
      return PhoneCall;
    case "E-commerce":
      return ShoppingBag;
    case "Finance":
      return DollarSign;
    case "Manufacturing":
      return Factory;
    case "Startups & SMEs":
      return Rocket;
    default:
      return Rocket;
  }
};

export default function Industries() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="industries"
      className="section-padding bg-card relative overflow-hidden"
      aria-label="Industries we serve"
    >
      <div className="container-wide">
        <SectionHeading
          badge="Industries We Serve"
          title="Across Every Sector"
          subtitle="From healthcare to e-commerce, we deliver tailored digital solutions for businesses of all sizes and industries."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {industries.map((item, i) => {
            const Icon = getIndustryIcon(item.name);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="h-full"
              >
                <div
                  className="premium-card p-6 text-center h-full flex flex-col items-center justify-center group"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-border bg-background transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-black group-hover:text-white mb-6">
                    <Icon className="h-5 w-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[13px] text-secondary-foreground leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
