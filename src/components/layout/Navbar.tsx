"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/constants";
import { cn } from "@/utils";

interface NavbarProps {
  navLinks?: readonly { label: string; href: string }[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const links = navLinks || NAV_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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

  const closeMobileMenu = () => {
    document.body.style.overflow = "";
    setMobileOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        scrolled ? "border-b border-border shadow-[0_2px_20px_rgba(0,0,0,0.05)]" : "border-b border-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-wide flex h-[80px] items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 transition-opacity hover:opacity-90"
          aria-label={`${BRAND.name} - Home`}
        >
          <img
            src="/AST Logo.png"
            alt="AST Digitally"
            className="h-[40px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 lg:flex" role="menubar">
          {links.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className={cn(
                  "nav-link px-4 py-2 rounded-md hover:bg-accent/5 transition-all duration-200",
                  isActive(link.href) && "active"
                )}
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/#contact"
            className="btn-primary text-[14px] px-6 py-[12px]"
          >
            Book Free Consultation
          </Link>
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
                "absolute left-0 h-0.5 w-full rounded-full bg-foreground transition-all duration-300 origin-center",
                mobileOpen ? "top-[9px] rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[9px] h-0.5 w-full rounded-full bg-foreground transition-all duration-300",
                mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-full rounded-full bg-foreground transition-all duration-300 origin-center",
                mobileOpen ? "top-[9px] -rotate-45" : "top-[18px]"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[80px] bg-black/30 z-40 lg:hidden backdrop-blur-sm"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-50 bg-white border-t border-divider lg:hidden overflow-y-auto max-h-[calc(100dvh-80px)]"
            >
              <nav className="container-wide py-6" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3.5 text-[15px] font-semibold transition-colors",
                          isActive(link.href)
                            ? "bg-accent/8 text-accent"
                            : "text-foreground hover:bg-foreground/5"
                        )}
                        onClick={closeMobileMenu}
                      >
                        {isActive(link.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        )}
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 px-4 flex flex-col gap-3">
                  <Link
                    href="/#contact"
                    className="btn-primary w-full py-4 justify-center"
                    onClick={closeMobileMenu}
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
