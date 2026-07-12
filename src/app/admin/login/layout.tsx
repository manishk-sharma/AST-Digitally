import { Suspense } from "react";
import AdminLoginPage from "./page";

// This layout is intentionally minimal — login doesn't use the admin shell
export default function LoginLayout() {
  return (
    <Suspense>
      <AdminLoginPage />
    </Suspense>
  );
}
