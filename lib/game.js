//Game Files
require('./game.css');
const Soot = require('./Soot.js');
const Fire = require('./Fire.js');
const Deadly = require('./Deadly.js');
const Harmless = require('./Harmless.js');
const Platform = require('./Platform.js');

//Canvas Elements
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

//DOM Elements to Update
let sootLives = 3;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let scoreDom = document.getElementById('score');
let highScoreDom = document.getElementById('high-score');
let sootLivesDom = document.getElementById('lives');
const startPage = document.getElementById('start-page')

//Game States
let gameLoopTrigger = false;
const winGame = document.getElementById('win-game');
const loseGame = document.getElementById('lose-game');
const levelUp = document.getElementById('level-up');

//Objects
const deadly = new Deadly();
const harmless = new Harmless();
const fire = new Fire();

let newSoot = new Soot (400, 700, 40, 50, '/img/sootball.png', 'image', 0);
const grass1 = new Platform(0, 700, canvas.width, 100, 'green');
const grass2 = new Platform(0, 400, canvas.width, 100, 'green');
const firepit = new Platform(0, 0, canvas.width, 100, 'orange');
const water = new Platform(0, 100, canvas.width, 300, 'blue');
const road = new Platform(0, 500, canvas.width, 200, 'lightgrey')
const platforms = [grass1, grass2, firepit, water, road];

//Generating Objects
const deadlyToGenerate = deadly.generateDeadly();
const harmlessToGenerate = harmless.generateHarmless();
const fireToGenerate = fire.generateFire();

//Event Listeners
$(document).ready(prependUi)
$(window).on('keydown', sootMovement)
$('#main-game').on('click', '.play-btn', triggerGamePlay);
$('#main-game').on('click', '.win-game-btn', resetGame);
$('#main-game').on('click', '#play-again-btn', resetGame);
$('#main-game').on('click', '#next-level-btn', nextLevelGameState);
$('#reset-btn').on('click', resetGame);

//Functions
function checkBoundaries() {
  return (newSoot.x > 0 && newSoot.x < 800 && newSoot.y > 0 && newSoot.y < 800)
}

function collide(array) {
  for (var i = 0; i < array.length; i++){
    if (array[i].x < newSoot.x + newSoot.width &&
    array[i].x + array[i].width > newSoot.x &&
    array[i].y < newSoot.y + newSoot.height &&
    array[i].height + array[i].y > newSoot.y) {
      return true;
    }
  }
}

function collisionDetectionDeadly() {
  if (collide(deadlyToGenerate)) {
    sootLives--
    $(sootLivesDom).html('Lives: ' + sootLives)
    return true;
  }
}

function collisionDetectionFirePit() {
  return (newSoot.y > 0 && newSoot.y < 100)
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

function drawObjects(array) {
  array.forEach(function(obj) {
    obj.draw(context);
  })
}

function gameLoop () {
  if (gameLoopTrigger === true) {
    startRound();
    moveObjectsInCanvas();

    if (collisionDetectionWater() === true && collisionDetectionHarmless() === false) {
      updateDom();
    }
    if (collisionDetectionFirePit() === true && reachFire() === false) {
      updateDom();
    }
    if (collisionDetectionDeadly() === true || reachFire() === true) {
      displayScore();
      restartRound();
    }
    if (checkBoundaries() === false) {
      updateDom();
    }
    resetLives();
    requestAnimationFrame(gameLoop)
  }
}

function gameOver() {
  toggleDisplay(loseGame);
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
  } else if (score === 250) {
    increaseSpeed(harmlessToGenerate);
    increaseSpeed(deadlyToGenerate);
  }
}

function moveObjects(array) {
  for (var i = 0; i < array.length; i++) {

    if (array[i].y === 650 || array[i].y === 550 || array[i].y === 350 || array[i].y === 250 || array[i].y === 150) {
      if (array[i].x <= -200) {
        array[i].x = 800;
      } else {
        array[i].move('left');
      }
    } else {
      if (array[i].x >= canvas.width + 200) {
        array[i].x = -200;
      } else {
        array[i].move('right');
      }
    }
  }
}

function moveObjectsInCanvas() {
  moveObjects(deadlyToGenerate);
  moveObjects(harmlessToGenerate);
}

function nextLevel(currentScore) {
  if (score === currentScore) {
    setTimeout(function() {
      toggleDisplay(levelUp);
    }, 1500);
  }
}

function nextLevelGameState() {
  toggleDisplay(levelUp);
  levelUpSpeed();
}

function prependUi() {
  scoreDom.prepend(
    `Score: ${score}`
  )
  highScoreDom.prepend(
    `High-Score: ${highScore}`
  )
  sootLivesDom.prepend(
    `Lives: ${sootLives}`
  )
  canvas.style.display = 'none';
}

function reachFire() {
  if (newSoot.y < 150 && collide(fireToGenerate)) {
    return true;
  }
  return false;
}

function resetGame() {
  location.reload();
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

function restartRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newSoot.resetSoot();
  newSoot.draw(context);
}

function sootMovement(event) {
  if (event.keyCode === 37) {
    newSoot.move('left');
  } else if (event.keyCode === 39) {
    newSoot.move('right');
  } else if (event.keyCode === 38) {
    newSoot.move('up');
  } else if (event.keyCode === 40) {
    newSoot.move('down');
  }
}

function startRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw(context);
  }
  drawObjects(deadlyToGenerate);
  drawObjects(harmlessToGenerate);
  drawObjects(fireToGenerate);
  newSoot.draw(context);
}

function storeHighScore() {
  if (highScore !== null && score > highScore) {
    localStorage.setItem("highScore", score);
    $(highScoreDom).html('High-Score: ' + score);
  }
}

function toggleDisplay(gameState) {
  if (canvas.style.display === 'none') {
    canvas.style.display = 'block';
    gameState.style.display = 'none'
  } else {
    canvas.style.display = "none";
    gameState.style.display = "block";
  }
}

function triggerGamePlay() {
  if (gameLoopTrigger === false) {
    toggleDisplay(startPage);
    gameLoopTrigger = true;
    gameLoop();
  }
}

function updateDom() {
  sootLives--;
  $(sootLivesDom).html('Lives: ' + sootLives)
  displayScore();
  restartRound();
}

function winTheGame() {
  if (score === 375) {
    setTimeout(function() {
      canvas.style.display = "none";
      winGame.style.display = "block";
    }, 1500);
  }
}
