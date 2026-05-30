import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, amount, uid } = await req.json();

    if (!email || !amount || !uid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      return NextResponse.json({ error: "Paystack secret key not configured" }, { status: 500 });
    }

    // Amount is in kobo (multiply NGN by 100)
    const amountInKobo = amount * 100;

    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = req.headers.get("host") || "localhost:3000";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        metadata: { uid },
        callback_url: `${baseUrl}/api/verify-payment`,
      }),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
    } else {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Paystack Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
