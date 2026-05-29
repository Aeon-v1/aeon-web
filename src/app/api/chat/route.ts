import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const aiProvider = createOpenAI({
  apiKey: process.env.NVIDIA_API_KEY || process.env.MOONSHOT_API_KEY || '',
  baseURL: process.env.NVIDIA_API_KEY ? 'https://integrate.api.nvidia.com/v1' : 'https://api.moonshot.cn/v1',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.NVIDIA_API_KEY && !process.env.MOONSHOT_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "No API key found. Please add NVIDIA_API_KEY or MOONSHOT_API_KEY to your .env.local file.",
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const modelName = process.env.NVIDIA_API_KEY 
      ? 'meta/llama-3.1-70b-instruct' // Default NVIDIA NIM model
      : 'moonshot-v1-8k';             // Default Moonshot model

    const result = await streamText({
      model: aiProvider(modelName),
      messages,
      system: `You are Aeon Builder, a highly intelligent and expert AI assistant that helps users build websites using the Aeon headless web engine.
You are interacting with the user inside a chat sidebar. 
Your goal is to answer their questions, suggest improvements, and write copy.
Keep your responses concise, helpful, and friendly.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error calling AI API:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response from AI API." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
