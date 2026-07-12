"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

interface FooterProps {
  navLinks?: readonly { label: string; href: string }[];
  footerData?: {
    copyright: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
  };
}

export default function Footer({ navLinks, footerData, contactInfo }: FooterProps) {
  const links = navLinks || NAV_LINKS;
  const contact = contactInfo || { email: BRAND.email, phone: BRAND.phone, address: BRAND.address };
  
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${emailInput}`);
    setEmailInput("");
  };

  return (
    <footer className="relative border-t border-divider bg-card py-12 md:py-16 lg:py-[100px]" role="contentinfo">
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand + Newsletter */}
          <div>
            <Link href="/">
              <img
                src="/AST Logo.png"
                alt="AST Digitally"
                className="h-[36px] w-auto object-contain mb-6 transition-opacity hover:opacity-80"
              />
            </Link>
            <p className="text-[15px] text-secondary-foreground mb-6 leading-relaxed">
              A full-service digital agency helping businesses grow through marketing, websites, branding, and automation.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full border-b border-border bg-transparent py-3 pr-10 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-2 flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-accent transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-label text-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] font-medium text-secondary-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/careers"
                  className="text-[15px] font-medium text-secondary-foreground transition-colors hover:text-accent"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-label text-foreground mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="text-[15px] text-secondary-foreground">{contact.address}</li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-[15px] text-secondary-foreground transition-colors hover:text-accent"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[15px] text-secondary-foreground transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h3 className="text-label text-foreground mb-6">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-6 flex-wrap">
              {[
                {
                  label: "Facebook",
                  href: footerData?.facebook || "https://facebook.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )
                },
                {
                  label: "Twitter",
                  href: footerData?.twitter || "https://x.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  )
                },
                {
                  label: "Instagram",
                  href: footerData?.instagram || "https://instagram.com",
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
                  href: footerData?.linkedin || "https://linkedin.com",
                  svg: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
                  aria-label={social.label}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-divider" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-[14px] text-secondary-foreground">
            © {currentYear} {footerData?.copyright || `${BRAND.name}. All rights reserved.`}
          </p>
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center md:justify-start">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Cookie Settings", href: "/cookies" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] text-secondary-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
