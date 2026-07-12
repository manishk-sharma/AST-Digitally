import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // If DATABASE_URL is missing, return a standard PrismaClient without the Neon adapter
    // so it doesn't throw during creation.
    return new PrismaClient({
      log: ["error"],
    });
  }

  try {
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({
      adapter,
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  } catch (error) {
    console.error("Failed to initialize Prisma with Neon adapter:", error);
    return new PrismaClient({
      log: ["error"],
    });
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export async function checkDbConnection(): Promise<{
  isConnected: boolean;
  errorType?: "MISSING_URL" | "CONNECTION_FAILED" | "MIGRATION_MISSING" | "UNKNOWN";
  errorMessage?: string;
}> {
  if (!process.env.DATABASE_URL) {
    return {
      isConnected: false,
      errorType: "MISSING_URL",
      errorMessage: "DATABASE_URL environment variable is not set.",
    };
  }

  try {
    // Run a quick query to test connection
    await db.$queryRaw`SELECT 1`;
    
    // Check if migration exists by checking if the users table exists
    try {
      await db.$queryRaw`SELECT id FROM users LIMIT 1`;
    } catch (migError: any) {
      if (migError.message?.includes("does not exist") || migError.code === "P2021" || String(migError).includes("does not exist")) {
        return {
          isConnected: false,
          errorType: "MIGRATION_MISSING",
          errorMessage: "Database schema not found. You need to run migrations.",
        };
      }
    }

    return { isConnected: true };
  } catch (error: any) {
    return {
      isConnected: false,
      errorType: "CONNECTION_FAILED",
      errorMessage: error.message || "Could not connect to database server.",
    };
  }
}

