"use strict";

// built in node module http server
// express sits on top of http server or on top of node?
var http = require('http'),
    express = require("express"),
    test = require("./test"),
    socketIo = require("socket.io");

const app = express();

// jade knows how to talk to express
app.set("view engine", "jade");

app.use(express.static("./public"));
// EXAMPLE OF PIPELINE
// browser -> node -> express -> Middleware1 -> middleware2 -> handler
// then back from handler -> middleware2 -> middleware1 -> express -> node -> browser

//===============================================
// MIDDLEWARE - runs between the request to server and the server's response
// useful middleware:
//===============================================

// app.use( (request, response, next) => {
//     console.log('in middleware 1');
//     //response.write("<h1>World</h1><p>hello</p>");
//     next(); // go to next piece in pipeline
//     console.log("out of middle ware 1");
// });
//
// // try to find static files in public folder
// app.use(express.static("./public"));
//
// app.use( (request, response, next) => {
//   console.log("---in middleware2")
//   //response.write("something else");
//   next(); // go to next piece in pipeline
//   console.log("---out of middleware 2");
// });

//===============================================
// Route Methods
//===============================================
// use nodemon
app.get("/test", (request, response) => {
  response.end('hello world zzz'); // end the pipeline and finish off middleware
  console.log("in handler");
});

app.get("/", (request, response) => {
  response.render("index", {title: "Z ZTitle1"});
});

app.get("/home", (request, response) => {
  // default director is views
  response.render("index", {title: "Z TITLE"});
});


//===============================================
// Connect to http Server
//===============================================
// connection between http.Server and express
const server = new http.Server(app);

//===============================================
// Socket IO
//===============================================
// this socket io function will attach to the "http" server module
// io object is an event emitter!!!
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("client socket connected");

  // add the emit function in app.js
  // on receives
  // socket.on will only track the individual socket
  socket.on("chat:add", data => {
    console.log("chat add");
    console.log(data);
    // emit sends things out / io will send to everyone
    io.emit("chat:added", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
})


//===============================================
// Bind Port
//===============================================
// bind server to port
// in production port is provided by environment variables
const port = 8080;
server.listen(port, () => {
  console.log(test.sayHelloTest());
  console.log(`Server started on port ${port}`)
})
