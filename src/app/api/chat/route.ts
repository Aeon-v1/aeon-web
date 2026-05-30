import { streamText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, state } = await req.json();

  const nvidia = createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey: process.env.NVIDIA_API_KEY || '',
  });

  const systemPrompt = `You are Aeon, an expert AI web designer and agentic assistant.
You help the user build and edit their website.
You can use tools to modify the website directly.

Current Website State:
Theme: ${JSON.stringify(state?.globalTheme || {})}
Pages: ${JSON.stringify(state?.pages?.map((p: any) => ({ id: p.id, name: p.name, blocksCount: p.blocks?.length })) || [])}

When the user asks to change the theme, use the updateGlobalTheme tool.
When the user asks to change text or styles of a specific element, use the updateElementOverride tool.`;

  const result = streamText({
    model: nvidia('meta/llama-3.1-70b-instruct'),
    system: systemPrompt,
    messages,
    tools: {
      updateGlobalTheme: tool({
        description: 'Update the global theme of the website. For example, changing primaryColor to #000000 or making the site dark themed.',
        parameters: z.object({
          primaryColor: z.string().optional().describe('Hex color code'),
          secondaryColor: z.string().optional().describe('Hex color code'),
          headingFont: z.string().optional(),
          bodyFont: z.string().optional(),
        }),
      }),
      updateElementOverride: tool({
        description: 'Override styles or content for a specific element by its ID.',
        parameters: z.object({
          id: z.string().describe('The data-editable-id of the element to modify'),
          content: z.string().optional().describe('New text content'),
          color: z.string().optional().describe('Text color'),
          backgroundColor: z.string().optional(),
        }),
      }),
    },
  });

  return result.toDataStreamResponse();
}
