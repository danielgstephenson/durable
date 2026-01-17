import { Subject } from "./subject";

export class Experiment {
  subjects = new Map<string, Subject>()

  login(id: string): void {
    const subject = new Subject(id)
    this.subjects.set(id, subject)
    console.log('login', id)
  }

  summarize(): Summary {
    return {
      subjectEntries: [...this.subjects.entries()]
    }
  }
}

type Summary = {
  subjectEntries: [string, Subject][]
}