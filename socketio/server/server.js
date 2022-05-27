import { Server } from "socket.io"
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app);


const io = new Server(server , {cors: {origin:'*'}});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("send-message", (arg, callback) => {
    console.log(arg); 
    socket.broadcast.emit('receive-message', arg)
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
