require('./game.css');
var Umbrella = require('./Umbrella.js');
var Soot = require('./Soot.js');
var Deadly = require('./Deadly.js');
var Harmless = require('./Harmless.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

var newSoot = new Soot (300, 500, 10, 10, 'orange');

var car1 = new Deadly (10, 400, 20, 20, 'blue');
var car2 = new Deadly (60, 400, 20, 20, 'red');
var car3 = new Deadly (90, 400, 20, 20, 'green');
var cars = [car1, car2, car3];

var truck1 = new Deadly (580, 300, 60, 20, 'magenta');
var truck2 = new Deadly (500, 300, 60, 20, 'black');
var truck3 = new Deadly (400, 300, 60, 20, 'teal');
var trucks = [truck1, truck2, truck3];

var deadlyObjects = [];

function pushDeadlyCars(){
  for (var i = 0; i < cars.length; i++) {
    deadlyObjects.push(cars[i]);
  }
}

pushDeadlyCars();

function pushDeadlyTrucks() {
  for (var i = 0; i < trucks.length; i++) {
    deadlyObjects.push(trucks[i]);
  }
    console.log(deadlyObjects);
}

pushDeadlyTrucks();

function gameLoop () {
  startRound();

  for (var i = 0; i < cars.length; i++) {
    if (cars[i].x === canvas.width + 20) {
      cars[i].x = 0;
    } else {
      cars[i].move('right');
    }
  }
  for (var i = 0; i < trucks.length; i++) {
    if (trucks[i].x === -60) {
      trucks[i].x = canvas.width - 20;
    } else {
      trucks[i].move('left');
    }
  }
  if (collisionDetection() === true) {
    restartRound();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


function collisionDetection() {
  for (var i = 0; i < deadlyObjects.length; i++) {
  if (deadlyObjects[i].x < newSoot.x + newSoot.width &&
   deadlyObjects[i].x + deadlyObjects[i].width > newSoot.x &&
   deadlyObjects[i].y < newSoot.y + newSoot.height &&
   deadlyObjects[i].height + deadlyObjects[i].y > newSoot.y) {
     return true;
    // Soot dies
    // Restart round if lives available with -1 life
    // Otherwise, If lost all 3 lives, then game over page
  }
}
}

function startRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newSoot.draw(context);
  for (var i = 0; i < cars.length; i++) {
    cars[i].draw(context);
  }
  for (var i = 0; i < trucks.length; i++) {
    trucks[i].draw(context);
  }
}

function restartRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newSoot.resetSoot();
  newSoot.draw(context);
  for (var i = 0; i < cars.length; i++) {
    cars[i].draw(context);
  }
  for (var i = 0; i < trucks.length; i++) {
    trucks[i].draw(context);
  }
  console.log('HEEEYY');
  // location.reload(true);
}

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 37) {
    newSoot.move('left');
  } else if (event.keyCode === 39) {
    newSoot.move('right');
  } else if (event.keyCode === 38) {
    newSoot.move('up');
  } else if (event.keyCode === 40) {
    newSoot.move('down');
  }
});
