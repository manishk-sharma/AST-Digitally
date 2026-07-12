import type { Metadata } from "next";
import { db } from "@/lib/db";
import CareersClient from "./_client";

export const metadata: Metadata = { title: "Careers Manager" };

async function getJobs() {
  try {
    return await db.jobPosting.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobs();
  return <CareersClient jobs={jobs} />;
}
