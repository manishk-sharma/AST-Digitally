import type { Metadata } from "next";
import { db } from "@/lib/db";
import TestimonialsClient from "./_client";

export const metadata: Metadata = { title: "Testimonials" };

async function getTestimonials() {
  try {
    return await db.testimonial.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsClient testimonials={testimonials} />;
}
