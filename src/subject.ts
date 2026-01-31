export class Subject {
  id: string
  connected = false
  socketId = ''
  group = 0
  action = Math.random()
  cash = 100
  units = 0
  purchaseRate = 0
  profit = 0

  constructor(id: string) {
    this.id = id
  }
}