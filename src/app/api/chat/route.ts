import { streamText, tool } from 'ai';
import config from '@/app/lib/config';
import { createAzure } from '@ai-sdk/azure';
import z from 'zod';

const azure = createAzure({
  resourceName: config.AZURE_CHAT_OPEN_AI_RESOURCE_NAME, // Azure resource name
  apiKey: config.AZURE_CHAT_OPEN_AI_API_KEY,
  apiVersion: config.AZURE_CHAT_OPEN_AI_API_VERSION,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: azure(config.AZURE_CHAT_OPEN_AI_MODEL_NAME as string),
    messages,
    tools: {
      weather: tool({
        description: 'Get the weather in a location (fahrenheit)',
        parameters: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: 'Convert a temperature in fahrenheit to celsius',
        parameters: z.object({
          temperature: z.number().describe('The temperature in fahrenheit to convert'),
        }),
        execute: async ({ temperature }) => {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            celsius,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
