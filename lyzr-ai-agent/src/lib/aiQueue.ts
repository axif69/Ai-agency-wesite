import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface AIRequest {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || '';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function callAIJson<T>(request: AIRequest): Promise<T | null> {
  try {
    console.log('[AI DEBUG] API Key:', MISTRAL_API_KEY ? `${MISTRAL_API_KEY.slice(0, 8)}...` : 'MISSING');
    console.log('[AI DEBUG] URL:', MISTRAL_API_URL);

    const response = await axios.post(MISTRAL_API_URL, {
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'system',
          content: request.systemPrompt || 'You are a helpful assistant. Output only valid JSON.'
        },
        {
          role: 'user',
          content: request.prompt
        }
      ],
      max_tokens: request.maxTokens || 2000,
      temperature: request.temperature || 0.4,
      response_format: { type: 'json_object' }
    }, {
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    const content = response.data.choices[0].message.content;
    return JSON.parse(content) as T;
  } catch (error: any) {
    console.error('[AI ERROR]', error.message);
    if (error.response) {
      console.error('[AI ERROR] Status:', error.response.status);
      console.error('[AI ERROR] Data:', JSON.stringify(error.response.data));
    }
    return null;
  }
}
