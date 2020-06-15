const canvas = document.querySelector('#canvas');
const canvasContext = canvas.getContext('2d');
const socket = io();

canvas.width = 1200;
canvas.height = 800;

canvasContext.fillStyle = "lightgreen";
canvasContext.fillRect(0,0, canvas.width, canvas.height);

document.addEventListener('keydown', (e)=> {
  movement(e.keyCode);
})

let playerID;
socket.on('code', (data)=> {
  
  playerID = data.num;

  
});

socket.on('player', (data)=> {
  // ENSURES MOVING SHAPES ARE CLEARED EACH FRAME OF MOVEMENT SO NO SMEAR LINES 
  canvasContext.clearRect(0,0, canvas.width, canvas.height);
  // BACKGROUND OF PLAYING FIELD
  canvasContext.fillStyle = "lightgreen";
  canvasContext.fillRect(0,0, canvas.width, canvas.height);

  // PLAYER ID
  canvasContext.font = "36px Segoe UI";
  canvasContext.fillStyle = "black";
  canvasContext.fillText("Player "+(playerID+1), 50,50);
  for(var i in data.players){
    let user = data.players[i];
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(user[1]+7, user[2], 5,30);
    // PLAYER "BLOCK"   
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(user[1], user[2], 20,20);
    
  }
})

function movement (key) {
  let x = 0;
  let y = 0;
  
  switch(key){
    case 87, 90, 38:
      y--;
      break;
    case 83, 40:
      y++;
      break;
    case 65, 81, 37:
      x--;
      break;
    case 68, 39:
      x++;
      break;
  }
  socket.emit('movement', {
    playerID: playerID,
    x:x,
    y:y
  })
}