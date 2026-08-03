import { db } from './db';

export interface DripSequenceStep {
  step: number;
  delay_days: number;
  subject_suffix: string;
  angle: 'initial_pitch' | 'value_case_study' | 'breakup_permission';
}

export const STANDARD_DRIP_SEQUENCE: DripSequenceStep[] = [
  { step: 1, delay_days: 0, subject_suffix: '', angle: 'initial_pitch' },
  { step: 2, delay_days: 3, subject_suffix: ' - quick idea', angle: 'value_case_study' },
  { step: 3, delay_days: 7, subject_suffix: ' - final note', angle: 'breakup_permission' }
];

/**
 * 🔄 Calculates next drip execution timestamp based on lead's current step
 */
export function calculateNextDripDueDate(delayDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + delayDays);
  return date.toISOString();
}

/**
 * 🛑 Halts all drip campaign sequences for a lead when they reply
 */
export async function haltDripSequenceForLead(leadId: number, reason: string = 'replied'): Promise<void> {
  return new Promise((resolve) => {
    db.run(
      `UPDATE leads SET drip_status = 'halted', analysis_notes = analysis_notes || ? WHERE id = ?`,
      [` [Drip Halted: Lead ${reason}]`, leadId],
      (err) => {
        if (err) console.error(`[Drip Engine] Error halting sequence for lead ${leadId}:`, err.message);
        else console.log(`[Drip Engine] 🛑 Halted sequence for lead ID: ${leadId} (${reason})`);
        resolve();
      }
    );
  });
}

/**
 * 📈 Advances lead to next drip sequence step
 */
export async function advanceLeadDripStep(leadId: number, currentStep: number): Promise<void> {
  const nextStep = currentStep + 1;
  const stepConfig = STANDARD_DRIP_SEQUENCE.find(s => s.step === nextStep);

  if (!stepConfig) {
    // Sequence finished
    return new Promise((resolve) => {
      db.run(
        `UPDATE leads SET drip_status = 'completed', sequence_step = ? WHERE id = ?`,
        [currentStep, leadId],
        () => resolve()
      );
    });
  }

  const nextDueDate = calculateNextDripDueDate(stepConfig.delay_days);
  return new Promise((resolve) => {
    db.run(
      `UPDATE leads SET sequence_step = ?, next_drip_due_at = ?, drip_status = 'active' WHERE id = ?`,
      [nextStep, nextDueDate, leadId],
      () => resolve()
    );
  });
}
