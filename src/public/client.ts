import { io } from 'socket.io-client'
import { Renderer } from './renderer'
import { SubjectSummary } from '../experiment'

export class Client {
  connectDiv: HTMLDivElement
  instructionDiv: HTMLDivElement
  canvasDiv: HTMLDivElement
  renderer = new Renderer()
  socket = io()
  token = 0

  constructor() {
    this.connectDiv = document.getElementById('connectDiv') as HTMLDivElement
    this.instructionDiv = document.getElementById('instructionDiv') as HTMLDivElement
    this.canvasDiv = document.getElementById('canvasDiv') as HTMLDivElement
    this.setupIo()
    this.handleUrlParams()
    setInterval(() => this.update(), 20)
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
    this.socket.on('invalidId', (id: string) => {
      console.log('invalidId', id)
      this.connectDiv.innerHTML = `Invalid id: ${id}`
    })
    this.socket.on('login', (id: string) => {
      console.log('login', id)
      this.renderer.id = id
      this.connectDiv.style.display = 'none'
      this.instructionDiv.style.display = 'flex'
    })
    this.socket.on('summary', (summary: SubjectSummary) => {
      this.renderer.subjects = summary.subjects
      this.renderer.summary = summary
      if (summary.started) {
        this.instructionDiv.style.display = 'none'
        this.canvasDiv.style.display = 'flex'
      }
    })
  }

  update(): void {
    const action = this.renderer.getAction()
    this.socket.emit('action', action)
  }

  handleUrlParams(): void {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')
    if (id == null || id === '') {
      this.connectDiv.innerHTML = 'Missing Query Parameter: id'
    }
    this.socket.emit('login', id)
  }
}