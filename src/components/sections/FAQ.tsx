"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";

/**
 * FAQ section using shadcn Accordion with smooth expand/collapse.
 */
export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-padding relative"
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
                className="glass rounded-lg border border-border px-5 shadow-[0_2px_10px_rgba(0,0,0,0.025)] data-[state=open]:border-neutral-400 data-[state=open]:bg-neutral-50/50 data-[state=open]:border-l-4 data-[state=open]:border-l-black transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-base font-bold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-neutral-600 leading-relaxed text-sm font-medium">
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
