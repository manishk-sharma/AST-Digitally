"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

interface AdminShellClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  children: React.ReactNode;
}

export default function AdminShellClient({ user, children }: AdminShellClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll, manage focus, and handle Escape key to close drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      // Focus the close button inside the drawer
      setTimeout(() => {
        document.getElementById("mobile-menu-close")?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
          // Return focus to hamburger toggle
          setTimeout(() => {
            document.getElementById("mobile-menu-toggle")?.focus();
          }, 50);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Desktop sidebar — always visible on lg+ */}
      <div className="hidden lg:flex">
        <AdminSidebar user={user} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById("mobile-menu-toggle")?.focus();
                }, 50);
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative z-10 h-full w-64 shadow-2xl bg-white"
            >
              <AdminSidebar
                user={user}
                onClose={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById("mobile-menu-toggle")?.focus();
                  }, 50);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader
          user={user}
          onMenuToggle={() => setMobileMenuOpen((o) => !o)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
