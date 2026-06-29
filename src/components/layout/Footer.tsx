"use client";

import { useState, useEffect } from "react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // The inline script in <head> has already applied the right class before paint;
    // sync local state to it so the toggle reflects the current theme.
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${emailInput}`);
    setEmailInput("");
  };

  return (
    <footer className="relative z-[41] border-t border-border bg-white py-16" role="contentinfo">
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Stay Connected (Newsletter) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 font-sans">
              Stay Connected
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-sans font-medium">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-white py-3 pl-4 pr-12 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black font-sans"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Subscribe"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 font-sans">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground font-sans font-semibold">
                  Home
                </a>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground font-sans font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 font-sans">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground font-sans font-semibold">
              <li>{BRAND.address}</li>
              <li>
                Phone:{" "}
                <a href={`tel:${BRAND.phone}`} className="transition-colors hover:text-foreground">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-foreground">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us (Socials + Theme Toggle) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 font-sans">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-6">
              {[
                { 
                  label: "Facebook", 
                  href: "https://facebook.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )
                },
                { 
                  label: "Twitter", 
                  href: "https://x.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  )
                },
                { 
                  label: "Instagram", 
                  href: "https://instagram.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                { 
                  label: "LinkedIn", 
                  href: "https://linkedin.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
              ].map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-black hover:text-foreground hover:bg-neutral-50 shadow-[0_2px_10px_rgba(0,0,0,0.025)]"
                    aria-label={social.label}
                  >
                    {social.svg}
                  </a>
                );
              })}
            </div>

            {/* Theme Toggle switch */}
            <div className="flex items-center gap-3 select-none mt-2">
              {/* Sun icon */}
              <svg className="h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>

              {/* Toggle track */}
              <button
                onClick={toggleTheme}
                className="relative h-8 w-14 rounded-full bg-neutral-200 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                aria-label="Toggle theme"
              >
                <span
                  className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              {/* Moon icon */}
              <svg className="h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </div>

        </div>

        <Separator className="my-10 bg-border" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-neutral-600 font-medium font-sans">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans">
            {["Privacy Policy", "Terms & Conditions", "Cookie Settings"].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm text-neutral-600 transition-colors hover:text-foreground font-semibold"
                >
                  {label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
