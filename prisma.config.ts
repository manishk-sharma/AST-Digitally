import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

// Load Next.js local environment variables for Prisma CLI
dotenv.config({ path: ".env.local" });

// Prisma 7: connection URL goes in datasource config here, not in schema.prisma
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
