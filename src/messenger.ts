import { Experiment } from './experiment'
import { Server } from './server'
import { Server as SocketIoServer } from 'socket.io'


export class Messenger {
  server: Server
  io: SocketIoServer
  token = Math.random()
  experiment = new Experiment()

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
      socket.on('start', () => {
        console.log('start')
        this.experiment.start()
      })
      socket.on('login', (id: string) => {
        if (id == null) return
        const subject = this.experiment.subjects.get(id)
        if (subject == null) {
          console.log(`invalid subject id: ${id}`)
          return
        }
        socket.emit('login', id)
        socket.on('action', (action: number) => {
          subject.action = action
        })
      })
    })
  }

  update(): void {
    const summary = this.experiment.summarize()
    this.io.emit('summary', summary)
  }
}
