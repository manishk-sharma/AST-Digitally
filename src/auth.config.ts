import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) ?? "EDITOR";
        session.user.id = (token.id as string) ?? "";
      }
      return session;
    },
  },
  providers: [], // Providers that require Node APIs (like bcrypt) go in auth.ts
} satisfies NextAuthConfig;
