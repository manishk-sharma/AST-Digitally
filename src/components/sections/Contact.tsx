"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/lib/constants";
import { useInView } from "@/lib/hooks/useInView";

export default function Contact() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-white relative overflow-hidden"
      aria-label="Contact us"
    >
      <div className="container-wide max-w-6xl">
        <div ref={ref} className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Side: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4 font-sans">
                Contact Us
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium font-sans">
                We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground font-sans">
                Contact Details
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground font-sans font-semibold list-disc list-inside pl-1">
                <li>
                  <span className="text-foreground font-bold">Phone:</span>{" "}
                  <a href={`tel:${BRAND.phone}`} className="hover:underline">
                    {BRAND.phone}
                  </a>
                </li>
                <li>
                  <span className="text-foreground font-bold">Email:</span>{" "}
                  <a href={`mailto:${BRAND.email}`} className="hover:underline">
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <span className="text-foreground font-bold">Web:</span>{" "}
                  <a href="https://astdigitally.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    astdigitally.com
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Side: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-lg border border-border bg-white p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.035)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-neutral-100 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground font-sans">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans font-medium">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-lg border border-border bg-white text-xs font-bold text-foreground px-6 py-2.5 hover:bg-neutral-50 transition-colors font-sans"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="first-name" className="text-xs font-bold text-foreground font-sans">
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        required
                        placeholder="First Name"
                        className="border-border bg-white text-foreground focus:border-black focus:ring-0 rounded-lg h-10 px-3 text-sm font-sans"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="last-name" className="text-xs font-bold text-foreground font-sans">
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        required
                        placeholder="Last Name"
                        className="border-border bg-white text-foreground focus:border-black focus:ring-0 rounded-lg h-10 px-3 text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-bold text-foreground font-sans">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="Email"
                      className="border-border bg-white text-foreground focus:border-black focus:ring-0 rounded-lg h-10 px-3 text-sm font-sans"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs font-bold text-foreground font-sans">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      required
                      placeholder="Subject"
                      className="border-border bg-white text-foreground focus:border-black focus:ring-0 rounded-lg h-10 px-3 text-sm font-sans"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-bold text-foreground font-sans">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Type your message here."
                      className="border-border bg-white text-foreground focus:border-black focus:ring-0 rounded-lg p-3 text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 font-sans"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
