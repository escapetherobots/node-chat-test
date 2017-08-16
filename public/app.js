"use strict";
// socket = object that represents the communication channel between the client and server
const socket = io();
// console.log(socket);
// console.log('my app');
//
//=======================================================
// socket.emit will trigger the socket.on methods server side
//=======================================================
// socket.emit("chat:add", {
//   message: "wassup"
// });

const chatInput = document.querySelector(".chat-form input[type=text]");
const chatList = document.querySelector(".chat-list ul");

chatInput.addEventListener("keypress", event => {
  // if they press enter, just return
  if(event.keyCode !== 13){
    return;
  }

  // prevent default and retrieve value
  event.preventDefault();
  const text = event.target.value.trim();

  // validate input
  if(text.length === 0){
    return;
  }

  // emit sends out
  socket.emit("chat:add", {
    message: text
  });

  event.target.value = "";

});

socket.on("chat:added", data => {
  console.log(data);
  // create an li and add data.message to the li
  const messageElement = document.createElement("li");
  // don't use innerHTML **** this can introduce cross site scripting vulnerability
  messageElement.innerText = data.message;
  // then add to the chat-list
  chatList.appendChild(messageElement);
  chatList.scrollTop = chatList.scrollHeight;
})
