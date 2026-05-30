import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, slug } = await req.json();

    if (!email || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sql = getDb();
    if (!sql) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    await sql`
      INSERT INTO leads (email, slug)
      VALUES (${email}, ${slug})
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
