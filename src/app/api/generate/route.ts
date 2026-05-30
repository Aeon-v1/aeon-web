import { NextResponse } from "next/server";
import { getDb, checkAndBootstrapDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { prompt, uid } = await req.json();

    if (!prompt || !uid) {
      return NextResponse.json({ error: "Missing prompt or uid" }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "NVIDIA_API_KEY is not configured" }, { status: 500 });
    }

    const systemPrompt = `You are an expert web designer. You must build a highly converting, professional landing page tailored exactly to the user's business. 
Write realistic, compelling copywriting. Do not use generic placeholders like "Company Name" or "Lorem Ipsum".
Ensure the site has a logical flow: Navbar -> Hero -> Features -> Testimonials -> FAQ -> Footer.
Use relevant fallbackQuery strings for images so Unsplash can find good matches.

You must respond ONLY with a valid JSON object matching this exact structure:
{
  "theme": {
    "primaryColor": "#hexcode",
    "secondaryColor": "#hexcode",
    "headingFont": "Inter",
    "bodyFont": "Inter"
  },
  "blocks": [
    {
      "type": "NavbarVariant3",
      "props": { "logoText": "My Biz", "link1": "Home" }
    },
    {
      "type": "HeroVariant1",
      "props": { "headline": "...", "subtext": "...", "ctaText": "..." }
    }
  ]
}

- "TestimonialVariant1" (Standard testimonial)
- "TestimonialVariant2" (Bento grid of testimonials with company logos)
- "TestimonialVariant3" (Minimalist grid of testimonials with star ratings)
- "TestimonialVariant4" (Animated timeline of testimonials for startups/enterprises)
- "CTAVariant1" (Standard Call to action)

Allowed block types: NavbarVariant1, NavbarVariant2, NavbarVariant3, HeroVariant1, FeatureVariant1, FeatureVariant2, FeatureVariant3, FeatureVariant4, FeatureVariant5, TestimonialVariant1, TestimonialVariant2, TestimonialVariant3, TestimonialVariant4, FAQVariant1, CTAVariant1, CTAVariant2, CTAVariant3, CTAVariant4, CTAVariant5, FAQVariant2, FAQVariant3, FAQVariant4, FooterVariant1, FooterVariant2, FooterVariant3, FooterVariant4, FooterVariant5, HowItWorksVariant1, HowItWorksVariant2, LogoSectionVariant1, LogoSectionVariant2, LogoSectionVariant3, LogoSectionVariant4, LogoSectionVariant5, PricingVariant1, StatVariant1, NewsletterVariant1, ContactVariant1, ContactVariant2.
Do not include markdown blocks like ```json. Just output the raw JSON.`;

    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Build a website for this business: ${prompt}` }
        ],
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("NVIDIA API error:", errorText);
      return NextResponse.json({ error: "AI Generation failed via API" }, { status: 500 });
    }

    const data = await res.json();
    const generatedText = data.choices[0].message.content;

    let object;
    try {
      // Clean up markdown code blocks if the model included them despite instructions
      const cleaned = generatedText.replace(/^```json/i, '').replace(/```$/i, '').trim();
      object = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse JSON from LLM:", generatedText);
      return NextResponse.json({ error: "AI returned invalid format. Please try again." }, { status: 500 });
    }

    const pages = [
      {
        id: "home",
        name: "Home",
        blocks: object.blocks
      }
    ];

    const sql = getDb();
    if (sql) {
      await checkAndBootstrapDb();
      const pagesJson = JSON.stringify(pages);
      const themeJson = JSON.stringify(object.theme);
      // Reset overrides on new generation
      const overridesJson = JSON.stringify({});

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
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
