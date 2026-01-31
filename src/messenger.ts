import { Experiment } from './experiment'
import { Server } from './server'
import { Server as SocketIoServer } from 'socket.io'


export class Messenger {
  server: Server
  io: SocketIoServer
  token = Math.random()
  experiment = new Experiment()
  admins: string[] = []

  constructor(server: Server) {
    this.io = new SocketIoServer(server.httpServer)
    this.server = server
    this.setupIo()
    setInterval(() => this.update(), 20)
  }

  setupIo(): void {
    this.io.on('connection', socket => {
      console.log(socket.id, 'connected')
      socket.emit('token', this.token)
      socket.on('admin', () => {
        this.admins.push(socket.id)
        socket.on('start', () => {
          console.log('start')
          this.experiment.start()
        })
      })
      socket.on('login', (id: string) => {
        if (id == null) return
        const subject = this.experiment.subjects.get(id)
        if (subject == null) {
          console.log(`invalid subject id: ${id}`)
          socket.emit('invalidId', id)
          return
        }
        subject.socketId = socket.id
        socket.emit('login', id)
        socket.on('action', (action: number) => {
          subject.action = action
        })
      })
    })
  }

  update(): void {
    this.experiment.subjects.forEach(subject => {
      const socket = this.io.of('/').sockets.get(subject.socketId)
      if (socket == null) {
        subject.connected = false
        return
      }
      subject.connected = socket.connected
      if (!subject.connected) return
      const summary = this.experiment.subjectSummary(subject)
      socket.emit('summary', summary)
    })
    const adminSummary = this.experiment.adminSummary()
    this.admins.forEach(socketId => {
      const socket = this.io.of('/').sockets.get(socketId)
      if (socket == null) return
      socket.emit('summary', adminSummary)
    })
  }
}
