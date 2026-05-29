import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === "") {
    return null;
  }
  return neon(url);
}

export async function checkAndBootstrapDb() {
  const sql = getDb();
  if (!sql) {
    return { connected: false, error: "Neon PostgreSQL DATABASE_URL is not configured." };
  }

  try {
    await sql`SELECT 1`;

    await sql`
      CREATE TABLE IF NOT EXISTS user_drafts (
        uid VARCHAR(255) PRIMARY KEY,
        pages_json TEXT NOT NULL,
        overrides_json TEXT NOT NULL,
        theme_json TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS published_websites (
        slug VARCHAR(255) PRIMARY KEY,
        uid VARCHAR(255) NOT NULL,
        pages_json TEXT NOT NULL,
        overrides_json TEXT NOT NULL,
        theme_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return { connected: true };
  } catch (err: any) {
    console.error("Neon database bootstrap error:", err);
    return { connected: false, error: err.message || "Failed to connect to Neon PostgreSQL." };
  }
}
