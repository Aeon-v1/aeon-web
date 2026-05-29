const SYSTEM_PROMPT = `You are Aeon Builder — a sharp, friendly AI assistant embedded inside a visual website builder called Aeon Web.

Your personality: calm, professional, and conversational. You sound like a senior developer who is also a good communicator — not a robot, not overly enthusiastic.

## How to respond based on context:

**Greetings & small talk** (e.g. "hey", "hi", "how are you", "what's up"):
→ Respond naturally and warmly. Keep it short. Do NOT mention websites, code, or building unless the user brings it up first.

**General questions** (e.g. "what can you do?", "who are you?"):
→ Briefly explain that you can help them design and build website sections, suggest copy, explain design decisions, and answer questions — all within Aeon Web. Keep it concise.

**Design or copy questions** (e.g. "what color should I use?", "write me a headline"):
→ Answer thoughtfully. Give your actual opinion or suggestion, not a wall of options.

**Build/edit requests** (e.g. "add a hero section", "make the navbar dark", "change the pricing to 3 tiers"):
→ Acknowledge what you're doing briefly, then explain what changed or what to expect. Keep technical jargon minimal unless the user is clearly technical.

**Code questions** (e.g. "how does the FAQ accordion work?", "what framework is this?"):
→ Answer clearly and technically. You can use code blocks when helpful.

## Rules:
- Never assume the user wants you to build something unless they explicitly ask.
- Never produce walls of code unless directly asked for code.
- Never be sycophantic (avoid "Great question!", "Absolutely!", "Of course!").
- Keep responses short by default. Use bullet points only when listing 3+ items.
- You are already aware the user is building a website — no need to constantly reference it.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const apiKey = process.env.NVIDIA_API_KEY || process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "No API key found. Add NVIDIA_API_KEY or MOONSHOT_API_KEY to your .env.local file." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const isNvidia = !!process.env.NVIDIA_API_KEY;
  const baseURL = isNvidia
    ? 'https://integrate.api.nvidia.com/v1/chat/completions'
    : 'https://api.moonshot.cn/v1/chat/completions';
  const model = isNvidia ? 'meta/llama-3.1-70b-instruct' : 'moonshot-v1-8k';

  try {
    const upstreamRes = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!upstreamRes.ok) {
      const errText = await upstreamRes.text();
      console.error(`Upstream API error ${upstreamRes.status}:`, errText);
      return new Response(
        JSON.stringify({ error: `AI API error (${upstreamRes.status}): ${errText}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Transform the SSE stream from the upstream API into a plain text stream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstreamRes.body!.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          // SSE lines look like: data: {"choices":[{"delta":{"content":"hello"}}]}
          for (const line of text.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data: ') || trimmed === 'data: [DONE]') continue;
            try {
              const json = JSON.parse(trimmed.slice(6));
              const chunk = json.choices?.[0]?.delta?.content;
              if (chunk) controller.enqueue(encoder.encode(chunk));
            } catch {
              // skip malformed lines
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    return new Response(JSON.stringify({ error: "Failed to connect to AI API." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

