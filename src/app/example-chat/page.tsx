import { generateText } from 'ai';
import { createAzure } from '@ai-sdk/azure';

const AZURE_CHAT_OPEN_AI_API_KEY = process.env.AZURE_CHAT_OPEN_AI_API_KEY;
const AZURE_CHAT_OPEN_AI_RESOURCE_NAME = process.env.AZURE_CHAT_OPEN_AI_RESOURCE_NAME;
const AZURE_CHAT_OPEN_AI_ENDPOINT = process.env.AZURE_CHAT_OPEN_AI_ENDPOINT;
const AZURE_CHAT_OPEN_AI_API_VERSION = process.env.AZURE_CHAT_OPEN_AI_API_VERSION;
const AZURE_CHAT_OPEN_AI_MODEL_NAME = process.env.AZURE_CHAT_OPEN_AI_MODEL_NAME;

if (
  !AZURE_CHAT_OPEN_AI_API_KEY ||
  !AZURE_CHAT_OPEN_AI_RESOURCE_NAME ||
  !AZURE_CHAT_OPEN_AI_ENDPOINT ||
  !AZURE_CHAT_OPEN_AI_API_VERSION ||
  !AZURE_CHAT_OPEN_AI_MODEL_NAME
) {
  throw new Error('Invalid Environment Variables');
}

// Example URL: https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/chat/completions?api-version=API_VERSION

const azure = createAzure({
  resourceName: AZURE_CHAT_OPEN_AI_RESOURCE_NAME, // Azure resource name
  apiKey: AZURE_CHAT_OPEN_AI_API_KEY,
  apiVersion: AZURE_CHAT_OPEN_AI_API_VERSION,
});

export default async function Page() {
  const { text } = await generateText({
    model: azure(AZURE_CHAT_OPEN_AI_MODEL_NAME as string),
    prompt: 'Hello',
  });
  return <p>{text}</p>;
}
