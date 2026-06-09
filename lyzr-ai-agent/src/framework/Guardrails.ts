export interface GuardrailResult {
  passed: boolean;
  reason?: string;
  sanitizedOutput?: string;
}

export abstract class Guardrail {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract evaluate(input: string): Promise<GuardrailResult>;
}

export class PIIFilterGuardrail extends Guardrail {
  constructor() { super('PIIFilter'); }
  async evaluate(input: string): Promise<GuardrailResult> {
    let sanitized = input;
    // Redact emails
    sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED EMAIL]');
    // Redact 10+ digit phone numbers loosely
    sanitized = sanitized.replace(/\b\d{10,14}\b/g, '[REDACTED PHONE]');
    return { passed: true, sanitizedOutput: sanitized };
  }
}

export class JsonSchemaGuardrail extends Guardrail {
  constructor() { super('JsonSchemaValidation'); }
  async evaluate(input: string): Promise<GuardrailResult> {
    try {
      const match = input.match(/\{[\s\S]*\}/);
      if (!match) return { passed: false, reason: 'No JSON object found in output' };
      JSON.parse(match[0]);
      return { passed: true, sanitizedOutput: match[0] };
    } catch (e) {
      return { passed: false, reason: 'Output is not valid JSON' };
    }
  }
}
