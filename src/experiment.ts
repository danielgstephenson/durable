import { Group } from "./group";
import { range, shuffle } from "./math";
import { Subject } from "./subject";
import NanoTimer from 'nanotimer'

export class Experiment {
  timer = new NanoTimer()
  subjects = new Map<string, Subject>()
  groups = new Map<number, Group>()
  started = false
  busy = false
  subjectCount = 10
  groupSize = 5
  groupCount = 2
  dt = 0.001
  time = 0
  unitMax = 10
  depreciation = 0.2
  priceBase = 0
  priceSlope = 0.1
  rentBase = 3
  rentSlope = 0.1

  constructor() {
    range(1, this.subjectCount).forEach(i => {
      this.addSubject(`${i}`)
    })
    range(this.groupCount).forEach(_ => {
      this.addGroup()
    })
  }

  start(): void {
    this.started = true
    const subjects = shuffle([...this.subjects.values()])
    this.groups.forEach((group, groupId) => {
      range(this.groupSize).forEach(_ => {
        const subject = subjects.pop()
        if (subject == null) return
        group.subjects.push(subject)
        subject.group = groupId
      })
    })
    this.timer.setInterval(() => this.step(), '', `${this.dt}s`)
  }

  step(): void {
    if (this.busy) {
      console.log('busy')
      return
    }
    this.busy = true
    this.groups.forEach(group => group.step())
    this.time += this.dt
    this.busy = false
  }

  addSubject(id: string): Subject {
    const subject = new Subject(id)
    this.subjects.set(id, subject)
    return subject
  }

  addGroup(): Group {
    const group = new Group(this)
    const id = this.groups.size + 1
    this.groups.set(id, group)
    return group
  }

  subjectSummary(subject: Subject): SubjectSummary {
    const summary = {
      id: subject.id,
      subjects: [] as Subject[],
      unitMax: this.unitMax,
      depreciation: this.depreciation,
      time: this.time,
      price: 1,
      rent: 1,
      started: this.started
    }
    const group = this.groups.get(subject.group)
    if (group == null) return summary
    summary.subjects = group.subjects
    summary.price = group.price
    summary.rent = group.rent
    return summary
  }

  adminSummary(): AdminSummary {
    const summary = {
      subjects: [...this.subjects.values()],
      time: 0,
      started: this.started
    }
    return summary
  }
}

export type SubjectSummary = {
  id: string
  subjects: Subject[]
  unitMax: number
  depreciation: number
  time: number
  price: number
  rent: number
  started: boolean
}

export type AdminSummary = {
  subjects: Subject[]
  time: number
  started: boolean
}