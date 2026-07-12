import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminShellClient from "@/components/admin/AdminShellClient";

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <AdminShellClient user={session.user}>
      {children}
    </AdminShellClient>
  );
}

