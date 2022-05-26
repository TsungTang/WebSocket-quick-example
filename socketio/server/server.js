import { Server } from "socket.io"
import express from 'express'
import http from 'http'
import path from "path";

const app = express()
const server = http.createServer(app);

const __dirname = path.resolve();

// sendFile will go here
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("send-message", (arg, callback) => {
    console.log(arg); // "world"
    socket.broadcast.emit('receive-message', arg)
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});

// const io = new Server({
//   /* options */
// })

// io.on("connection", (socket) => {
//   // ...
// })

// io.listen(3000)
