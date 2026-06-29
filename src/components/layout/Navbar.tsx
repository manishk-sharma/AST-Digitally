"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white border-border shadow-[0_1px_8px_rgba(0,0,0,0.03)] py-0"
          : "bg-white border-border py-1"
      )}
      role="banner"
    >
      <nav
        className="container-wide flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="flex items-center gap-1.5 transition-opacity hover:opacity-90"
          aria-label={`${BRAND.name} - Home`}
        >
          <img 
            src="/AST Logo.png" 
            alt="AST Digitally" 
            className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_12px_rgba(0,0,0,0.12)] dark:hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.25)] transition-all duration-300" 
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 lg:flex" role="menubar">
          {NAV_LINKS.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 transition-colors hover:text-foreground"
                role="menuitem"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA & Login */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="#contact"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            Get Free Website Audit
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-lg bg-primary text-primary-foreground px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-primary/90 hover:scale-[1.01] shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
            )}
          >
            Book Free Consultation
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="relative h-5 w-6">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-full rounded-full bg-foreground transition-all duration-300",
                mobileOpen ? "top-2.5 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2.5 h-0.5 w-full rounded-full bg-foreground transition-all duration-300",
                mobileOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-full rounded-full bg-foreground transition-all duration-300",
                mobileOpen ? "top-2.5 -rotate-45" : "top-5"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-strong overflow-hidden border-t border-border lg:hidden"
          >
            <nav className="container-wide py-6" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 px-4 flex flex-col gap-4">
                <a
                  href="#contact"
                  className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Free Website Audit
                </a>
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                "w-full rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-3.5"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Book Free Consultation
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
