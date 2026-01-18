import { Subject } from "./subject";
import NanoTimer from 'nanotimer'

export class Experiment {
  timer = new NanoTimer()
  subjects = new Map<string, Subject>()
  started = false
  unitMax = 10
  depreciation = 0.5
  time = 0
  dt = 0.001
  busy = false
  price = 0
  rent = 0
  startTime = 0

  start(): void {
    this.started = true
    this.timer.setInterval(() => this.step(), '', `${this.dt}s`)
    this.startTime = performance.now()
  }

  step(): void {
    if (this.busy) {
      console.log('busy')
      return
    }
    this.busy = true
    this.subjects.forEach(subject => {
      if (this.time <= 1) {
        const realTime = (performance.now() - this.startTime) / 1000
        console.log('realTime, time, units =', realTime.toFixed(3), this.time.toFixed(3), subject.units.toFixed(3))
      }
      subject.purchaseRate = subject.action * this.unitMax * this.depreciation
      subject.units *= 1 - this.dt * this.depreciation
      if (subject.cash < 0) {
        subject.cash = 0
        return
      }
      subject.units += this.dt * subject.purchaseRate
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

  summarize(): Summary {
    return {
      subjects: [...this.subjects.entries()],
      unitMax: this.unitMax,
      depreciation: this.depreciation,
      time: this.time,
      price: this.price,
      rent: this.rent,
      started: this.started
    }
  }
}

export type Summary = {
  subjects: [string, Subject][]
  unitMax: number
  depreciation: number
  time: number
  price: number
  rent: number
  started: boolean
}