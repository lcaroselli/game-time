require('./game.css');
var Umbrella = require('./Umbrella.js');
var Soot = require('./Soot.js');
var Fire = require('./Fire.js');
var Deadly = require('./Deadly.js');
var Harmless = require('./Harmless.js');
var Platform = require('./Platform.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');


//Objects
const deadly = new Deadly();
const harmless = new Harmless();
const fire = new Fire();
var newSoot = new Soot (400, 700, 40, 50, '/img/sootball.png', 'image');
var grass1 = new Platform(0, 750, canvas.width, 50, 'green');
var grass2 = new Platform(0, 400, canvas.width, 50, 'green');
var firepit = new Platform(0, 0, canvas.width, 100, 'orange');
var water = new Platform(0, 100, canvas.width, 300, 'blue');
var road = new Platform(0, 450, canvas.width, 300, 'brown')
var platforms = [grass1, grass2, firepit, water, road];


//DOM Elements to Update
var score = 0;
var highScore = 0; //NEED HIGHSCORE TO CAPTURE INTEGER IN LOCAL STORAGE
var sootLives = 3;
let scoreDom = document.getElementById('score');
let highScoreDom = document.getElementById('high-score');
let sootLivesDom = document.getElementById('lives');


//Generating Objects
const deadlyToGenerate = deadly.generateDeadly();
const harmlessToGenerate = harmless.generateHarmless();
const fireToGenerate = fire.generateFire();


//Functions
  //Document Ready State
$(document).ready(function() {
  scoreDom.prepend(
    `Score: ${score}`
  )
  highScoreDom.prepend(
    `High-Score: ${highScore}` //Need to prepend score that's in local storage initially
  )

  sootLivesDom.prepend(
    `Lives: ${sootLives}`
  )
});

//Game Loop
function gameLoop () {
  startRound();
  moveDeadly();
  moveHarmless();
  collisionDetectionHarmless();

  if (collisionDetectionDeadly() === true || reachFire() === true) {
    displayScore();
    restartRound();
  }

  resetLives();
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

function collisionDetectionDeadly() {
  for (var i = 0; i < deadlyToGenerate.length; i++) {
    if (deadlyToGenerate[i].x < newSoot.x + newSoot.width &&
   deadlyToGenerate[i].x + deadlyToGenerate[i].width > newSoot.x &&
   deadlyToGenerate[i].y < newSoot.y + newSoot.height &&
   deadlyToGenerate[i].height + deadlyToGenerate[i].y > newSoot.y) {
     sootLives--
      $(sootLivesDom).html('Lives: ' + sootLives)
      return true;
    }
    }
  }

  function collisionDetectionHarmless() {
    for (var i = 0; i < harmlessToGenerate.length; i++) {
      if (harmlessToGenerate[i].x < newSoot.x + newSoot.width &&
     harmlessToGenerate[i].x + harmlessToGenerate[i].width > newSoot.x &&
     harmlessToGenerate[i].y < newSoot.y + newSoot.height &&
     harmlessToGenerate[i].height + harmlessToGenerate[i].y > newSoot.y) {
       newSoot.x = harmlessToGenerate[i].x;
       newSoot.y = harmlessToGenerate[i].y;
      }
      }
    }

function resetLives() {
  if (sootLives === 0) {
    sootLives = 3;
    score = 0;
    $(sootLivesDom).html('Lives: ' + sootLives)
    $(scoreDom).html('Score: ' + score)
  }
}

function reachFire() {
  for (var i = 0; i < fireToGenerate.length; i++) {
    if (fireToGenerate[i].x < newSoot.x + newSoot.width &&
   fireToGenerate[i].x + fireToGenerate[i].width > newSoot.x &&
   fireToGenerate[i].y < newSoot.y + newSoot.height &&
   fireToGenerate[i].height + fireToGenerate[i].y > newSoot.y) {
      return true;
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

  fireToGenerate.forEach(function(obj) {
    obj.draw(context);
  })

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

function displayScore() {
  if (reachFire() === true) {
    score += 25;
    highScore += 25;
    $(scoreDom).html('Score: ' + score)
    $(highScoreDom).html('High-Score: ' + highScore)
    }
  }

// function storeHighScore() {
  //Score check against high score
  //if score is more than current high score, then update (push) high score to score's value to highScoreArray and reset in JSON
  //else, dont change high score's value --- !!! Might not even need this else??
  //store high score with JSON
// 	localStorage.setItem('highScore', JSON.stringify(highScoreArray)); ???
// }
