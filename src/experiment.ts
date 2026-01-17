import { Subject } from "./subject";

export class Experiment {
  subjects = new Map<string, Subject>()
  started = false
  assetMax = 10
  depreciation = 0.5
  time = 0
  dt = 0.001
  busy = false

  constructor() {
    setInterval(() => this.step(), 1000 * this.dt)
  }

  step(): void {
    if (this.busy) {
      console.log('busy')
      return
    }
    this.busy = true
    this.subjects.forEach(subject => {
      subject.purchaseRate = subject.action * this.assetMax * this.depreciation
      subject.units *= 1 - this.dt * this.depreciation
      if (subject.cash < 0) {
        subject.cash = 0
        return
      }
      subject.units += subject.purchaseRate
    })
    this.time += this.dt
    this.busy = false
  }

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