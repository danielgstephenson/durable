import { io } from 'socket.io-client'

export class Client {
  socket = io()
  token = 0
  id = ''

  constructor() {
    console.log('client')
    this.setupIo()
    this.handleUrlParams()
  }

  setupIo(): void {
    this.socket.on('connect', () => {
      console.log('connect')
    })
    this.socket.on('token', (token: number) => {
      if (this.token !== 0 && this.token !== token) {
        console.log('reload')
        location.reload()
        return
      }
      this.token = token
    })
  }

  handleUrlParams(): void {
    console.log('handleUrlParams')
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')
    console.log('id', id)
    if (id === null || id === '') {
      throw new Error('Missing query parameter: id')
    }
    this.socket.emit('login', id)
  }
}