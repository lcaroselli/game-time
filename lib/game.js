require('./game.css');
var Umbrella = require('./Umbrella.js');
var Soot = require('./Soot.js');
var Deadly = require('./Deadly.js');
var Harmless = require('./Harmless.js');
var Platform = require('./Platform.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

var newSoot = new Soot (400, 700, 40, 50, '/img/sootball.png', 'image');

const deadly = new Deadly();
const harmless = new Harmless();

const deadlyToGenerate = deadly.generateDeadly();
const harmlessToGenerate = harmless.generateHarmless();

var grass1 = new Platform(0, 750, canvas.width, 50, 'green');
var grass2 = new Platform(0, 400, canvas.width, 50, 'green');
var firepit = new Platform(0, 0, canvas.width, 100, 'orange');
var water = new Platform(0, 100, canvas.width, 300, 'blue');
var road = new Platform(0, 450, canvas.width, 300, 'brown')

var platforms = [grass1, grass2, firepit, water, road];

function gameLoop () {
  startRound();

  moveDeadly();

  moveHarmless();

  if (collisionDetection() === true) {
    restartRound();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


function moveDeadly() {
  for (var i = 0; i < deadlyToGenerate.length; i++) {

    if (deadlyToGenerate[i].y === 650 || deadlyToGenerate[i].y === 550) {
      if (deadlyToGenerate[i].x === -200) {
        deadlyToGenerate[i].x = 800;
      } else {
        deadlyToGenerate[i].move('left');
      }
    } else {
      if (deadlyToGenerate[i].x === canvas.width + 200) {
        deadlyToGenerate[i].x = -200;
      } else {
        deadlyToGenerate[i].move('right');
      }
    }
  }
}

function moveHarmless() {
  for (var i = 0; i < harmlessToGenerate.length; i++) {

    if (harmlessToGenerate[i].y === 350 || harmlessToGenerate[i].y === 250 || harmlessToGenerate[i].y === 150) {
      if (harmlessToGenerate[i].x === -200) {
        harmlessToGenerate[i].x = 800;
      } else {
        harmlessToGenerate[i].move('left');
      }
    } else {
      if (harmlessToGenerate[i].x === canvas.width + 200) {
        harmlessToGenerate[i].x = -200;
      } else {
        harmlessToGenerate[i].move('right');
      }
    }
  }
}


function collisionDetection() {
  for (var i = 0; i < deadlyToGenerate.length; i++) {
  if (deadlyToGenerate[i].x < newSoot.x + newSoot.width &&
   deadlyToGenerate[i].x + deadlyToGenerate[i].width > newSoot.x &&
   deadlyToGenerate[i].y < newSoot.y + newSoot.height &&
   deadlyToGenerate[i].height + deadlyToGenerate[i].y > newSoot.y) {
     return true;
    // Restart round if lives available with -1 life
    // Otherwise, If lost all 3 lives, then game over page
  }
}
}

function startRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw(context);
  }

  deadlyToGenerate.forEach(function(obj) {
    obj.draw(context);
  });

  harmlessToGenerate.forEach(function(obj) {
    obj.draw(context);
  });

  newSoot.draw(context);
}

function restartRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newSoot.resetSoot();
  newSoot.draw(context);
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
