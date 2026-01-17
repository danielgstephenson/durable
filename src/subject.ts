export class Subject {
  id: string
  action = 0
  cash = 10
  units = 0
  purchaseRate = 0

  constructor(id: string) {
    this.id = id
  }
}