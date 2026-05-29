import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const moonshot = createOpenAI({
  apiKey: process.env.MOONSHOT_API_KEY || '',
  baseURL: 'https://api.moonshot.cn/v1',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // If the API key is not set, return a helpful error message
  if (!process.env.MOONSHOT_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "MOONSHOT_API_KEY is not set in the environment variables. Please add it to your .env.local file.",
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const result = await streamText({
      model: moonshot('moonshot-v1-8k'),
      messages,
      system: `You are Aeon Builder, a highly intelligent and expert AI assistant that helps users build websites using the Aeon headless web engine.
You are interacting with the user inside a chat sidebar. 
Your goal is to answer their questions, suggest improvements, and write copy.
Keep your responses concise, helpful, and friendly.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error calling Moonshot API:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response from Moonshot API." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
