function padTo2Digits(num) {
  return num.toString().padStart(2, "0")
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  )
}
const submitBtn = document.getElementById("text-submit")
const inputEle = document.getElementById("text-input")
const messageContainer = document.querySelector(".message-container")

const parse = (string) => JSON.parse(string)
const stringify = (string) => JSON.stringify(string)

const uniqueKey = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + "-" + s4()
}
const key = uniqueKey()

const ws = new WebSocket("ws://localhost:3000")
ws.onmessage = (event) => {
  const data = parse(event.data)

  const div = document.createElement("div")
  const selfMessage = data.key === key
  div.classList.add(selfMessage ? "user" : "other")

  div.innerHTML = `${selfMessage ? "me" : "other"}:  <span class="${
    selfMessage ? "my-text" : "other-text"
  }">${data.msg}</span>    ${formatDate(new Date())}`
  messageContainer.appendChild(div)
}

ws.onopen = () => {
  ws.send(stringify({ key, msg: "connected!" }))
}

ws.onclose = () => {
  console.log("close connection")
}

window.onbeforeunload = function () {
  ws.send(stringify({ key, msg: "disconnected!" }))
}

submitBtn.addEventListener("click", (e) => {
  const msg = inputEle.value
  inputEle.value = ""

  ws.send(stringify({ key, msg }))
})
