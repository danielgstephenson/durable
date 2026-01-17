import { io } from 'socket.io-client'
import { Subject } from '../subject'
import { Summary } from '../experiment'

export class Client {
  connectDiv: HTMLDivElement
  instructionDiv: HTMLDivElement
  canvasDiv: HTMLDivElement
  subjects = new Map<string, Subject>()
  socket = io()
  token = 0
  id = ''

  constructor() {
    this.connectDiv = document.getElementById('connectDiv') as HTMLDivElement
    this.instructionDiv = document.getElementById('instructionDiv') as HTMLDivElement
    this.canvasDiv = document.getElementById('canvasDiv') as HTMLDivElement
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
    this.socket.on('login', (id: string) => {
      console.log('login', id)
      this.id = id
      this.connectDiv.style.display = 'none'
      this.instructionDiv.style.display = 'flex'
    })
    this.socket.on('summary', (summary: Summary) => {
      this.subjects = new Map<string, Subject>(summary.subjects)
    })
  }

  handleUrlParams(): void {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')
    if (id === null || id === '') {
      this.connectDiv.innerHTML = 'Missing Query Parameter: id'
    }
    this.socket.emit('login', id)
  }
}