import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Admin — AST Digitally CMS",
    template: "%s | AST Digitally Admin",
  },
  robots: { index: false, follow: false },
};

/**
 * Admin route group layout.
 * Auth checking is done per-page (dashboard etc.) and via middleware.
 * The login page also lives under this group but has its own layout
 * that doesn't render the sidebar/header shell.
 */
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" richColors />
    </>
  );
}
