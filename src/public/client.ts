import { io } from 'socket.io-client'

export class Client {
  loginButton: HTMLButtonElement
  idInput: HTMLInputElement
  socket = io()
  token = 0

  constructor() {
    console.log('client')
    this.setupIo()
    this.loginButton = document.getElementById('loginButton') as HTMLButtonElement
    this.idInput = document.getElementById('idInput') as HTMLInputElement
    this.loginButton.onclick = () => { this.login() }
  }

  setupIo(): void {
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

  login(): void {
    const id = this.idInput.value
    console.log('login', id)
    this.socket.emit('login', id)
  }
}