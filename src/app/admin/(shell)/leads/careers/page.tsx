import type { Metadata } from "next";
import { db } from "@/lib/db";
import CareersLeadsClient from "./_client";

export const metadata: Metadata = { title: "Career Applications" };

async function getApplications() {
  try {
    return await db.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: { job: { select: { title: true } } },
    });
  } catch {
    return [];
  }
}

export default async function CareerApplicationsPage() {
  const applications = await getApplications();
  return <CareersLeadsClient applications={applications} />;
}
