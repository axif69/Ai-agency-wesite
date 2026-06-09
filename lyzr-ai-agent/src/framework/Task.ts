import { Agent } from './Agent';
import { Guardrail } from './Guardrails';

export interface TaskConfig {
  name: string;
  description: string;
  agent: Agent;
  expectedOutput: string;
  executeTool?: { tool: any; inputFn: (context: any) => any };
  guardrails?: Guardrail[];
}

export class Task {
  config: TaskConfig;

  constructor(config: TaskConfig) {
    this.config = config;
  }

  async run(context: any = {}): Promise<any> {
    let rawOutput: any;

    if (this.config.executeTool) {
      const toolInput = this.config.executeTool.inputFn(context);
      rawOutput = await this.config.executeTool.tool.execute(toolInput, context);
    } else {
      rawOutput = await this.config.agent.executeTask(this.config.description, context);
    }

    // Apply Guardrails
    if (this.config.guardrails && typeof rawOutput === 'string') {
      let currentOutput = rawOutput;
      for (const guardrail of this.config.guardrails) {
        const result = await guardrail.evaluate(currentOutput);
        if (!result.passed) {
          throw new Error(`Guardrail [${guardrail.name}] failed: ${result.reason}`);
        }
        if (result.sanitizedOutput) {
          currentOutput = result.sanitizedOutput;
        }
      }
      return currentOutput;
    }

    return rawOutput;
  }
}
