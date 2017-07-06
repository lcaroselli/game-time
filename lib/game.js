require('./game.css');
var Umbrella = require('./Umbrella.js');
var Soot = require('./Soot.js');
var Fire = require('./Fire.js');
var Deadly = require('./Deadly.js');
var Harmless = require('./Harmless.js');
var Platform = require('./Platform.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

//Game States
const winGame = document.getElementById('win-game');
const loseGame = document.getElementById('lose-game');
const levelUp = document.getElementById('level-up');

//Objects
const deadly = new Deadly();
const harmless = new Harmless();
const fire = new Fire();
var newSoot = new Soot (400, 700, 40, 50, '/img/sootball.png', 'image', 0);
var grass1 = new Platform(0, 750, canvas.width, 50, 'green');
var grass2 = new Platform(0, 400, canvas.width, 50, 'green');
var firepit = new Platform(0, 0, canvas.width, 100, 'orange');
var water = new Platform(0, 100, canvas.width, 300, 'blue');
var road = new Platform(0, 450, canvas.width, 300, 'lightgrey')
var platforms = [grass1, grass2, firepit, water, road];


//DOM Elements to Update
var sootLives = 3;
var score = 0;
var highScore = localStorage.getItem("highScore") || 0;
let scoreDom = document.getElementById('score');
let highScoreDom = document.getElementById('high-score');
let sootLivesDom = document.getElementById('lives');
var resetGameButton = document.querySelector('.reset-game');
var playAgainButton = document.querySelector('.play-again-btn');

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
    `High-Score: ${highScore}`
  )

  sootLivesDom.prepend(
    `Lives: ${sootLives}`
  )
});

//Game Loop
function gameLoop () {
  startRound();
  moveObjectsInCanvas();

  if (collisionDetectionWater() === true && collisionDetectionHarmless() === false) {
    sootLives--;
    $(sootLivesDom).html('Lives: ' + sootLives)
    displayScore();
    restartRound();
  }

  if (collisionDetectionFirePit() === true && reachFire() === false) {
    sootLives--;
    $(sootLivesDom).html('Lives: ' + sootLives)
    displayScore();
    restartRound();
  }

  if (collisionDetectionDeadly() === true || reachFire() === true) {
    displayScore();
    restartRound();
  }

  if (checkBoundaries() === false) {
    displayScore();
    restartRound();
    sootLives--
    $(sootLivesDom).html('Lives: ' + sootLives)
  }

  resetLives();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function winTheGame() {
  if (score === 375) {
    setTimeout(function(){
      canvas.style.display = "none";
      winGame.style.display = "block";
    }, 2000);
  }
}

function moveObjects(array) {
  for (var i = 0; i < array.length; i++) {

    if (array[i].y === 650 || array[i].y === 550 || array[i].y === 350 || array[i].y === 250 || array[i].y === 150) {
      if (array[i].x <= -200) {
        array[i].x = 800;
      } else {
        array[i].move('left', array[i].speed);
      }
    } else {
      if (array[i].x >= canvas.width + 200) {
        array[i].x = -200;
      } else {
        array[i].move('right', array[i].speed);
      }
    }
  }
}

function moveObjectsInCanvas() {
  moveObjects(deadlyToGenerate);
  moveObjects(harmlessToGenerate);
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
  if (newSoot.y < 400) {
    for (var i = 0; i < harmlessToGenerate.length; i++) {
      if (harmlessToGenerate[i].x < newSoot.x + newSoot.width &&
        harmlessToGenerate[i].x + harmlessToGenerate[i].width > newSoot.x &&
        harmlessToGenerate[i].y < newSoot.y + newSoot.height &&
        harmlessToGenerate[i].height + harmlessToGenerate[i].y > newSoot.y) {
          newSoot.speed = harmlessToGenerate[i].speed;
          newSoot.x += harmlessToGenerate[i].speed * harmlessToGenerate[i].direction;
          return true;
        }
    }
  }
  return false;
}

function collisionDetectionWater() {
  return (newSoot.y > 50 && newSoot.y < 400)
}

function checkBoundaries() {
  return (newSoot.x > 0 && newSoot.x < 800 && newSoot.y > 0 && newSoot.y < 800)
}

function resetLives() {
  if (sootLives === 0) {
    sootLives = 3;
    score = 0;
    $(sootLivesDom).html('Lives: ' + sootLives)
    $(scoreDom).html('Score: ' + score)
    gameOver();
  }
}

function gameOver() {
  canvas.style.display = "none";
  loseGame.style.display = "block";
}

$('#main-game').on('click', '.play-again-btn', function() {
  console.log('clicked');
  loseGame.style.display = 'none';
  winGame.style.display = 'none';
  canvas.style.display = 'block';
  sootLives = 3;
  score = 0;
  $(sootLivesDom).html('Lives: ' + sootLives);
  $(scoreDom).html('Score: ' + score);
  
})

function nextLevel(currentScore) {
  if (score === currentScore) {
    setTimeout(function(){
      canvas.style.display = "none";
      levelUp.style.display = "block";
    }, 2000);
  }
}

$('#main-game').on('click', '#next-level-btn', function() {
  canvas.style.display = "block";
  levelUp.style.display = "none";
  levelUpSpeed();
})

function collisionDetectionFirePit() {
  return (newSoot.y > 0 && newSoot.y < 100)
}

function reachFire() {
  if (newSoot.y < 150) {
    for (var i = 0; i < fireToGenerate.length; i++) {
      if (fireToGenerate[i].x < newSoot.x + newSoot.width &&
     fireToGenerate[i].x + fireToGenerate[i].width > newSoot.x &&
     fireToGenerate[i].y < newSoot.y + newSoot.height &&
     fireToGenerate[i].height + fireToGenerate[i].y > newSoot.y) {
        return true;
      }
    }
  }
  return false;
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

function increaseSpeed(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].speed += 1;
  }
}

function levelUpSpeed() {
  if (score === 125) {
    increaseSpeed(harmlessToGenerate);
    increaseSpeed(deadlyToGenerate);
    console.log('speed up one');
  } else if (score === 250) {
    increaseSpeed(harmlessToGenerate);
    increaseSpeed(deadlyToGenerate);
    console.log('speed up two');
  }
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

resetGameButton.addEventListener('click', function() {
  console.log('clicked');
  //soot lives = 3
  //reset soot to beginning
  //score = 0
  //highscore from local storage displayed
});

function displayScore() {
  if (reachFire() === true) {
    score += 25;
    storeHighScore();
    $(scoreDom).html('Score: ' + score);
    nextLevel(125);
    nextLevel(250);
    winTheGame();
    }
  }

function storeHighScore() {
  if(highScore !== null){
      if (score > highScore) {
          localStorage.setItem("highScore", score);
      }
  }
  if (score > highScore){
      localStorage.setItem("highScore", score);
      $(highScoreDom).html('High-Score: ' + score);
  }
}
