import { Subject } from "./subject";

export class Experiment {
  subjects = new Map<string, Subject>()
  started = false

  login(id: string): Subject {
    console.log('login', id)
    const oldSubject = this.subjects.get(id)
    if (oldSubject != null) {
      return oldSubject
    }
    const newSubject = new Subject(id)
    this.subjects.set(id, newSubject)
    return newSubject
  }

  start(): void {
    this.started = true
  }

  summarize(): Summary {
    return {
      subjects: [...this.subjects.entries()],
      started: this.started
    }
  }
}

export type Summary = {
  subjects: [string, Subject][]
  started: boolean
}