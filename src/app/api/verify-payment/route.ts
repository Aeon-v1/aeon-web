import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const trxref = searchParams.get("trxref");

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = req.headers.get("host") || "localhost:3000";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

  if (!reference) {
    return NextResponse.redirect(`${baseUrl}/editor?payment=error`);
  }

  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecretKey) {
    return NextResponse.redirect(`${baseUrl}/editor?payment=setup_error`);
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      const uid = data.data.metadata.uid;
      const amount = data.data.amount / 100;

      const sql = getDb();
      if (sql) {
        await sql`
          INSERT INTO payments (uid, has_paid, amount_paid, reference, created_at)
          VALUES (${uid}, true, ${amount}, ${reference}, CURRENT_TIMESTAMP)
          ON CONFLICT (uid)
          DO UPDATE SET
            has_paid = true,
            amount_paid = EXCLUDED.amount_paid,
            reference = EXCLUDED.reference,
            created_at = CURRENT_TIMESTAMP
        `;
      }

      // Redirect back to editor with success flag
      return NextResponse.redirect(`${baseUrl}/editor?payment=success`);
    } else {
      return NextResponse.redirect(`${baseUrl}/editor?payment=failed`);
    }
  } catch (error) {
    console.error("Paystack Verify Error:", error);
    return NextResponse.redirect(`${baseUrl}/editor?payment=error`);
  }
}
