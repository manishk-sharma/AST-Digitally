import type { Metadata } from "next";
import { db } from "@/lib/db";
import ContactLeadsClient from "./_client";

export const metadata: Metadata = { title: "Contact Leads" };

async function getLeads() {
  try {
    return await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ContactLeadsPage() {
  const leads = await getLeads();
  return <ContactLeadsClient leads={leads} />;
}
