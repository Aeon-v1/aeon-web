import { NextResponse } from "next/server";
import { getDb, checkAndBootstrapDb } from "@/lib/db";

function generateSlug() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, pages, elementOverrides, globalTheme } = body;

    if (!uid) {
      return NextResponse.json({ error: "Missing uid in body" }, { status: 400 });
    }

    const sql = getDb();
    if (!sql) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    await checkAndBootstrapDb();

    let slug = generateSlug();
    let isUnique = false;
    let attempts = 0;

    // Ensure unique slug
    while (!isUnique && attempts < 10) {
      const existing = await sql`SELECT slug FROM published_websites WHERE slug = ${slug}`;
      if (existing.length === 0) {
        isUnique = true;
      } else {
        slug = generateSlug();
        attempts++;
      }
    }

    if (!isUnique) {
      return NextResponse.json({ error: "Could not generate a unique slug" }, { status: 500 });
    }

    const pagesJson = JSON.stringify(pages || []);
    const overridesJson = JSON.stringify(elementOverrides || {});
    const themeJson = JSON.stringify(globalTheme || {});

    await sql`
      INSERT INTO published_websites (slug, uid, pages_json, overrides_json, theme_json, created_at)
      VALUES (${slug}, ${uid}, ${pagesJson}, ${overridesJson}, ${themeJson}, CURRENT_TIMESTAMP)
    `;

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    console.error("Publish POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
