import { Pool } from "pg";
import "dotenv/config";

function assertDatabaseUrl(): void {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
}

assertDatabaseUrl();
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
