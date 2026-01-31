import { Experiment } from "./experiment";
import { sum } from "./math";
import { Subject } from "./subject";

export class Group {
  experiment: Experiment
  subjects: Subject[] = []
  price = 0
  rent = 0

  constructor(experiment: Experiment) {
    this.experiment = experiment
  }

  step(): void {
    this.subjects.forEach(subject => {
      if (subject.id === '1') return
      if (Math.random() > 0.2 * this.experiment.dt) return
      subject.action = Math.random()
    })
    this.subjects.forEach(subject => {
      subject.purchaseRate = subject.action * this.experiment.unitMax * this.experiment.depreciation
      if (subject.cash <= 0) subject.purchaseRate = Math.min(subject.purchaseRate, 0)
      subject.units *= 1 - this.experiment.dt * this.experiment.depreciation
      subject.units += this.experiment.dt * subject.purchaseRate
    })
    const totalPurchaseRate = sum(this.subjects.map(s => s.purchaseRate))
    this.price = this.experiment.priceBase + this.experiment.priceSlope * totalPurchaseRate
    const totalUnits = sum(this.subjects.map(s => s.units))
    this.rent = this.experiment.rentBase - this.experiment.rentSlope * totalUnits
    this.subjects.forEach(subject => {
      const revenue = subject.units * this.rent
      const cost = subject.purchaseRate * this.price
      subject.profit = revenue - cost
      subject.cash += this.experiment.dt * subject.profit
    })
  }
}