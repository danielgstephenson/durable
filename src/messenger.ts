import { Server } from './server'
import { Server as SocketIoServer } from 'socket.io'


export class Messenger {
  server: Server
  io: SocketIoServer
  token = Math.random()

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
    })
  }

  update(): void {
    this.io.emit('summary')
  }
}
