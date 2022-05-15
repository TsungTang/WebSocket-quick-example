"use strict"
const express = require("express")
const { Server: SocketServer } = require("ws")
const PORT = 3000

const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))

const wss = new SocketServer({ server })

wss.broadcast = function broadcast(msg) {
  console.log(msg)
  wss.clients.forEach(function each(client) {
    client.send(msg)
  })
}

wss.on("connection", (ws) => {
  console.log("connected")
  ws.on("message", (event, isBinary) => {
    const message = isBinary ? event : event.toString()
    wss.broadcast(message)
  })

  ws.on("close", () => {
    console.log("Close connected")
  })
})
