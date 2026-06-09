import OpenAI from 'openai';
import { Tool } from './Tool';

export interface AgentConfig {
  role: string;
  goal: string;
  backstory: string;
  tools?: Tool[];
  llmConfig: {
    apiKey: string;
    baseURL?: string;
    model?: string;
  };
}

export class Agent {
  config: AgentConfig;
  openai: OpenAI;

  constructor(config: AgentConfig) {
    this.config = config;
    this.openai = new OpenAI({
      apiKey: config.llmConfig.apiKey,
      baseURL: config.llmConfig.baseURL || 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Sovereign Sniper - Lyzr Clone'
      }
    });
  }

  async executeTask(taskDescription: string, contextData: any = {}): Promise<any> {
    const prompt = `
      You are an expert ${this.config.role}.
      Your goal is: ${this.config.goal}
      Your backstory: ${this.config.backstory}

      You have been assigned the following task:
      ${taskDescription}

      Context provided:
      ${JSON.stringify(contextData, null, 2)}
      
      Execute the task and return the result.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: this.config.llmConfig.model || "google/gemma-7b-it:free",
        messages: [{ role: "user", content: prompt }]
      });
      return response.choices[0].message?.content;
    } catch (error) {
      console.error(`Agent [${this.config.role}] failed:`, error);
      throw error;
    }
  }
}
