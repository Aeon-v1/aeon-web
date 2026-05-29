import { NextResponse } from "next/server";
import { getDb, checkAndBootstrapDb } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing uid parameter" }, { status: 400 });
  }

  const sql = getDb();
  if (!sql) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    await checkAndBootstrapDb();
    const results = await sql`
      SELECT pages_json, overrides_json, theme_json
      FROM user_drafts
      WHERE uid = ${uid}
    `;

    if (results.length > 0) {
      return NextResponse.json({
        pages: JSON.parse(results[0].pages_json),
        elementOverrides: JSON.parse(results[0].overrides_json),
        globalTheme: JSON.parse(results[0].theme_json)
      });
    } else {
      return NextResponse.json({ pages: null, elementOverrides: null, globalTheme: null });
    }
  } catch (error: any) {
    console.error("Sync GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
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

    const pagesJson = JSON.stringify(pages || []);
    const overridesJson = JSON.stringify(elementOverrides || {});
    const themeJson = JSON.stringify(globalTheme || {});

    await sql`
      INSERT INTO user_drafts (uid, pages_json, overrides_json, theme_json, updated_at)
      VALUES (${uid}, ${pagesJson}, ${overridesJson}, ${themeJson}, CURRENT_TIMESTAMP)
      ON CONFLICT (uid)
      DO UPDATE SET
        pages_json = EXCLUDED.pages_json,
        overrides_json = EXCLUDED.overrides_json,
        theme_json = EXCLUDED.theme_json,
        updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Sync POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
