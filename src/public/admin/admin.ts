import { io } from 'socket.io-client'
import { Subject } from '../../subject'
import { Table } from './table'
import { AdminSummary } from '../../experiment'

export class Admin {
  connectDiv: HTMLDivElement
  mainDiv: HTMLDivElement
  subjectDiv: HTMLDivElement
  startButton: HTMLButtonElement
  subjects: Subject[] = []
  table = new Table()
  socket = io()
  token = 0

  constructor() {
    this.connectDiv = document.getElementById('connectDiv') as HTMLDivElement
    this.mainDiv = document.getElementById('mainDiv') as HTMLDivElement
    this.subjectDiv = document.getElementById('subjectDiv') as HTMLDivElement
    this.startButton = document.getElementById('startButton') as HTMLButtonElement
    this.startButton.onclick = () => { this.start() }
    this.setupIo()
  }

  setupIo(): void {
    this.socket.on('connect', () => {
      this.connectDiv.style.display = 'none'
      this.mainDiv.style.display = 'flex'
      console.log('connect')
      this.socket.emit('admin')
    })
    this.socket.on('token', (token: number) => {
      if (this.token !== 0 && this.token !== token) {
        console.log('reload')
        location.reload()
        return
      }
      this.token = token
    })
    this.socket.on('summary', (summary: AdminSummary) => {
      console.log('summary')
      this.subjects = summary.subjects
      this.table.update(this.subjects)
    })
  }

  start(): void {
    this.socket.emit('start')
  }
}