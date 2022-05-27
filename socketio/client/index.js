import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";


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


const socket = io("ws://localhost:3000")

socket.on('receive-message', message=>{
  
  const div = document.createElement("div")

  div.classList.add("other")

  div.innerHTML = `other:  <span class="other-text">${message}</span>    ${formatDate(new Date())}`
  messageContainer.appendChild(div)
})

submitBtn.addEventListener("click", (e) => {
  const msg = inputEle.value
  inputEle.value = ""

  socket.emit("send-message", msg );
  const div = document.createElement("div")

  div.classList.add("user")

  div.innerHTML = `me:  <span class="my-text">${msg}</span>    ${formatDate(new Date())}`
  messageContainer.appendChild(div)

})
