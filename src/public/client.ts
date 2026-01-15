import { io } from 'socket.io-client'

const socket = io()
let token = 0

socket.on('connect', () => {
  console.log('connect')
})

socket.on('token', (t: number) => {
  if (token !== 0 && token !== t) {
    console.log('reload')
    location.reload()
    return
  }
  token = t
})