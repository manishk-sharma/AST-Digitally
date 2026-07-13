import type { Metadata } from "next";
import { db, checkDbConnection } from "@/lib/db";
import TestimonialsClient from "./_client";
import DatabaseWarning from "@/components/admin/DatabaseWarning";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Testimonials" };

async function getTestimonials() {
  try {
    return await db.testimonial.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function TestimonialsPage() {
  const dbStatus = await checkDbConnection();

  if (!dbStatus.isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-sm text-gray-500">Manage customer testimonials and star ratings.</p>
        </div>
        <DatabaseWarning errorType={dbStatus.errorType || "UNKNOWN"} errorMessage={dbStatus.errorMessage} />
      </div>
    );
  }

  const testimonials = await getTestimonials();
  return (
    <Suspense fallback={<div className="text-xs text-gray-400">Loading...</div>}>
      <TestimonialsClient testimonials={testimonials} />
    </Suspense>
  );
}

