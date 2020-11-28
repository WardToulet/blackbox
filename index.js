const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const {
  PORT = 3000
} = process.env;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('ask', (data) => {
    console.log(data);
    io.emit('ask', data);
  });

  socket.on('answer', (option) => {
    console.log(`One vote for ${option}`);
    io.emit('answer', option);
  });

  socket.on('disconnect', (socket) => {
  });
});

server.listen(PORT, () => console.log(`Started on port ${PORT}`));
