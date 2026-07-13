import { redirect } from "next/navigation";

export default function CareerNewRedirect() {
  redirect("/admin/content/careers?action=new");
}
