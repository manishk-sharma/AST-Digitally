"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants";

/**
 * FAQ section using shadcn Accordion with smooth expand/collapse.
 */
export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-padding bg-background relative"
      aria-label="Frequently asked questions"
    >
      <div className="container-wide">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with AST Digitally."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion className="space-y-3" defaultValue={["faq-0"]}>
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-lg px-6 py-1 data-[state=open]:border-accent/40 data-[state=open]:bg-accent/3 transition-all duration-300 bg-card"
              >
                <AccordionTrigger className="text-left text-[15px] font-heading font-bold text-foreground hover:no-underline py-5 hover:text-accent transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-paragraph text-[15px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
