import { sum } from "./math";
import { Subject } from "./subject";
import NanoTimer from 'nanotimer'

export class Experiment {
  timer = new NanoTimer()
  subjects = new Map<string, Subject>()
  started = false
  unitMax = 10
  depreciation = 0.5
  priceBase = 0
  priceSlope = 0.1
  rentBase = 1
  rentSlope = 0.1
  time = 0
  dt = 0.001
  busy = false
  price = 0
  rent = 0

  start(): void {
    this.started = true
    this.timer.setInterval(() => this.step(), '', `${this.dt}s`)
  }

  step(): void {
    if (this.busy) {
      console.log('busy')
      return
    }
    const subjects = [...this.subjects.values()]
    // const cash = subjects.map(subject => subject.cash.toFixed(2))
    // console.log('cash', cash)
    this.busy = true
    subjects.forEach(subject => {
      subject.units *= 1 - this.dt * this.depreciation
      subject.purchaseRate = subject.action * this.unitMax * this.depreciation
      if (subject.cash <= 0) {
        subject.purchaseRate = 0
      }
      subject.units += this.dt * subject.purchaseRate
    })
    const totalPurchaseRate = sum(subjects.map(s => s.purchaseRate))
    this.price = this.priceBase + this.priceSlope * totalPurchaseRate
    const totalUnits = sum(subjects.map(s => s.units))
    this.rent = this.rentBase - this.rentSlope * totalUnits
    subjects.forEach(subject => {
      const revenue = subject.units * this.rent
      const cost = subject.purchaseRate * this.price
      subject.profit = revenue - cost
      subject.cash += this.dt * subject.profit
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