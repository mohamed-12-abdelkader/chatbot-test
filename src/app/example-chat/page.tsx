import { generateText } from 'ai';
import { createAzure } from '@ai-sdk/azure';
import config from '../lib/config';

// Example URL: https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/chat/completions?api-version=API_VERSION

const azure = createAzure({
  resourceName: config.AZURE_CHAT_OPEN_AI_RESOURCE_NAME, // Azure resource name
  apiKey: config.AZURE_CHAT_OPEN_AI_API_KEY,
  apiVersion: config.AZURE_CHAT_OPEN_AI_API_VERSION,
});

export default async function Page() {
  const { text } = await generateText({
    model: azure(config.AZURE_CHAT_OPEN_AI_MODEL_NAME as string),
    prompt: 'Hello',
  });
  return <p>{text}</p>;
}
