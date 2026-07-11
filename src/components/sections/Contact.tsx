"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/constants";
import { useInView } from "@/hooks/useInView";

export default function Contact() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = {
      firstName: (form.querySelector("#first-name") as HTMLInputElement).value,
      lastName: (form.querySelector("#last-name") as HTMLInputElement).value,
      email: (form.querySelector("#email") as HTMLInputElement).value,
      subject: (form.querySelector("#subject") as HTMLInputElement).value,
      message: (form.querySelector("#message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // fall through
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-background relative overflow-hidden"
      aria-label="Contact us"
    >
      <div className="container-wide max-w-6xl">
        <div ref={ref} className="flex flex-col lg:flex-row lg:gap-16 xl:gap-20 gap-12 items-start">
          
          {/* Left Side: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[42%] xl:w-[40%] shrink-0 space-y-10"
          >
            <div>
              <h2
                className="font-heading font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", wordBreak: "normal", overflowWrap: "normal" }}
              >
                Contact Us
              </h2>
              <p className="text-paragraph">
                We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-heading font-bold text-foreground">
                Contact Details
              </h3>
              <ul className="space-y-4 text-[15px] text-secondary-foreground font-medium list-none pl-0">
                <li>
                  <span className="text-foreground font-bold">Founder:</span>{" "}
                  {BRAND.founder}
                </li>
                <li>
                  <span className="text-foreground font-bold">Phone:</span>{" "}
                  <a href={`tel:${BRAND.phone}`} className="hover:text-accent transition-colors">
                    {BRAND.phone}
                  </a>
                </li>
                <li>
                  <span className="text-foreground font-bold">Email:</span>{" "}
                  <a href={`mailto:${BRAND.email}`} className="hover:text-accent transition-colors">
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <span className="text-foreground font-bold">Web:</span>{" "}
                  <a href="https://astdigitally.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
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
            className="w-full lg:flex-1 min-w-0"
          >
            <div className="premium-card p-6 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="mb-3 text-[22px] font-heading font-extrabold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-paragraph text-sm">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-label text-secondary-foreground block">
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        required
                        placeholder="First Name"
                        className="bg-card border border-border rounded-lg h-12 px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-label text-secondary-foreground block">
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        required
                        placeholder="Last Name"
                        className="bg-card border border-border rounded-lg h-12 px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-label text-secondary-foreground block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="Email"
                      className="bg-card border border-border rounded-lg h-12 px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-label text-secondary-foreground block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      required
                      placeholder="Subject"
                      className="bg-card border border-border rounded-lg h-12 px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-label text-secondary-foreground block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Type your message here."
                      className="bg-card border border-border rounded-lg px-4 py-4 text-[15px] focus-visible:ring-2 focus-visible:ring-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center py-4"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
