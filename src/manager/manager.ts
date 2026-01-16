import { io } from 'socket.io-client'

export class Manager {
  socket = io()
  token = 0

  constructor() {
    console.log('client')
    this.socket.on('connect', () => {
      console.log('connect')
    })
    this.socket.on('token', (token: number) => {
      console.log('this.token', this.token)
      console.log('token', token)
      if (this.token !== 0 && this.token !== token) {
        console.log('reload')
        location.reload()
        return
      }
      this.token = token
    })
  }
}