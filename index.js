const express = require('express');
const fs = require('fs');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv, {});



app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/client/index.html');
  console.log('Express connection..');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(3000);
console.log('Server started..');

let players = [];
let num = 0;
let speed = 5;

io.sockets.on('connection', (socket)=> {
  
  socket.emit('code', {
    
    num: num
  });
  
  let playerX = Math.floor(Math.random()*1000);
  let playerY = Math.floor(Math.random()*600);
  players.push([num, playerX,playerY]);
  console.log(players);
  num++;

  socket.on('movement', (data) => {
    players[data.playerID][1] += data.x * speed;
    players[data.playerID][2] += data.y * speed;
  })
});



function sendCode () {
  
  io.sockets.emit('player', {
    players :players
  });
}

let interval = setInterval(()=> {
  sendCode();
}, 1000/15);
