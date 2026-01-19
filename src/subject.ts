export class Subject {
  id: string
  action = Math.random()
  cash = 100
  units = 0
  purchaseRate = 0
  profit = 0
  connected = false

  constructor(id: string) {
    this.id = id
  }
}