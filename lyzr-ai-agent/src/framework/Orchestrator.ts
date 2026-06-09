import { Task } from './Task';

export class Orchestrator {
  tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  async start(initialContext: any = {}): Promise<any> {
    let currentContext = { ...initialContext };

    for (const task of this.tasks) {
      try {
        const result = await task.run(currentContext);
        currentContext[task.config.name] = result;
      } catch (e) {
        throw e;
      }
    }

    return currentContext;
  }
}
