import { redirect } from "next/navigation";

export default function TestimonialNewRedirect() {
  redirect("/admin/content/testimonials?action=new");
}
