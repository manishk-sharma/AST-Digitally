import type { Metadata } from "next";
import { db } from "@/lib/db";
import FAQClient from "./_client";

export const metadata: Metadata = { title: "FAQ Manager" };

async function getFAQs() {
  try {
    return await db.fAQ.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs();
  return <FAQClient faqs={faqs} />;
}
