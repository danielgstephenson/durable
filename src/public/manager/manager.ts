import { io } from 'socket.io-client'
import { Subject } from '../../subject'
import { Summary } from '../../experiment'

export class Manager {
  subjectDiv: HTMLDivElement
  startButton: HTMLButtonElement
  subjects = new Map<string, Subject>()
  socket = io()
  token = 0

  constructor() {
    this.subjectDiv = document.getElementById('subjectDiv') as HTMLDivElement
    this.startButton = document.getElementById('startButton') as HTMLButtonElement
    this.startButton.onclick = () => { this.start() }
    this.setupIo()
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
    this.socket.on('summary', (summary: Summary) => {
      this.subjects = new Map<string, Subject>(summary.subjects)
      const ids = [...this.subjects.keys()].sort()
      this.subjectDiv.innerHTML = ''
      ids.forEach(key => {
        const row = document.createElement('div')
        row.innerHTML = key
        this.subjectDiv.appendChild(row)
      })
      this.subjectDiv.style.userSelect = 'none'
    })
  }

  start(): void {
    this.socket.emit('start')
  }
}