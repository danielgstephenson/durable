import { Subject } from "./subject";

export class Experiment {
  subjects = new Map<string, Subject>()

  login(id: string): void {
    console.log('login', id)
    if (this.subjects.has(id)) return
    this.subjects.set(id, new Subject(id))
  }

  summarize(): Summary {
    return {
      subjects: [...this.subjects.entries()]
    }
  }
}

export type Summary = {
  subjects: [string, Subject][]
}