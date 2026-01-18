export class Subject {
  id: string
  action = 0
  cash = 100
  units = 10
  purchaseRate = 0
  profit = 0

  constructor(id: string) {
    this.id = id
  }
}