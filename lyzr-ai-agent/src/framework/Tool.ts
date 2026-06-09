export interface ToolContext {
  [key: string]: any;
}

export abstract class Tool {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  abstract execute(input: any, context?: ToolContext): Promise<any>;
}
