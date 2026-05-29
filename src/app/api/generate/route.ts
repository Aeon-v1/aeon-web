import { getSchemaPrompt } from "@/data/blockSchema";

export const maxDuration = 60;

const GENERATE_SYSTEM_PROMPT = `You are a website layout composer for Aeon Web — a visual website builder.

Your ONLY job is to generate a complete website page layout in JSON format based on the user's request.

You have access to a library of pre-built UI blocks. Each block is a React component with typed props.
Select the most appropriate blocks and variants, then write compelling, original copy for each block's props.

## Rules:
- Respond with ONLY a valid JSON array. No markdown, no explanation, no code fences.
- The JSON must be an array of objects, each with a "type" (block name) and "props" (object).
- Always start the page with a Navbar block and end with a Footer block.
- Always include a Hero block near the top.
- Choose 5-9 blocks total for a complete, well-rounded page.
- Write copy that is specific to the user's product — not generic filler text.
- For testimonials, invent realistic names, roles, and company names that fit the product.
- For stats, invent plausible and impressive numbers.
- For features, write concise, benefit-focused descriptions (max 15 words each).
- Never invent block types that are not in the schema. Only use exact block type names from the list.
- If unsure which variant to use, prefer Variant1.

## Available Blocks:
`;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const apiKey = process.env.NVIDIA_API_KEY || process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "No API key configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const isNvidia = !!process.env.NVIDIA_API_KEY;
  const baseURL = isNvidia
    ? "https://integrate.api.nvidia.com/v1/chat/completions"
    : "https://api.moonshot.cn/v1/chat/completions";
  const model = isNvidia ? "meta/llama-3.1-70b-instruct" : "moonshot-v1-8k";

  const systemPrompt = GENERATE_SYSTEM_PROMPT + getSchemaPrompt();

  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Build a complete website page for: ${prompt}` },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Upstream error:", errText);
      return new Response(
        JSON.stringify({ error: `AI API error (${response.status}): ${errText}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    // Extract the JSON array using regex in case the model adds conversational text
    let cleaned = rawContent.trim();
    const arrayMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (arrayMatch) {
      cleaned = arrayMatch[0];
    } else {
      // Fallback in case it's not a pure array but maybe has weird formatting
      cleaned = cleaned
        .replace(/^[\s\S]*?```json\s*/i, "")
        .replace(/^[\s\S]*?```\s*/i, "")
        .replace(/```\s*[\s\S]*$/i, "")
        .trim();
    }

    let blocks;
    try {
      blocks = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse error. Raw content:", rawContent);
      return new Response(
        JSON.stringify({ error: "AI returned invalid JSON. Please try again." }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(blocks)) {
      return new Response(
        JSON.stringify({ error: "AI response was not a JSON array." }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ blocks }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Generate route error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to connect to AI API." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
