//Game Files
require('./game.css');
const Umbrella = require('./Umbrella.js');
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
// const platforms = new Platform();
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
// const platformToGenerate = platforms.generatePlatform();

//Event Listeners
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

$('#main-game').on('click', '.play-btn', triggerGamePlay);

$('#main-game').on('click', '.win-game-btn', resetGame);

$('#reset-btn').on('click', resetGame);

$('#main-game').on('click', '#play-again-btn', resetGame);

$('#main-game').on('click', '#next-level-btn', nextLevelGameState);

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

  canvas.style.display = 'none';
});


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
    }, 2000);
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

// function collide(array) {
//   for (var i = 0; i < array.length; i++){
//     if (array[i].x < newSoot.x + newSoot.width &&
//     array[i].x + array[i].width > newSoot.x &&
//     array[i].y < newSoot.y + newSoot.height &&
//     array[i].height + array[i].y > newSoot.y) {
//     return true;
//   }
// }
// }

function collisionDetectionDeadly() {
  for (var i = 0; i < deadlyToGenerate.length; i++) {
    if (deadlyToGenerate[i].x < newSoot.x + newSoot.width &&
   deadlyToGenerate[i].x + deadlyToGenerate[i].width > newSoot.x &&
   deadlyToGenerate[i].y < newSoot.y + newSoot.height &&
   deadlyToGenerate[i].height + deadlyToGenerate[i].y > newSoot.y) {
     console.log('hi');
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

function nextLevel(currentScore) {
  if (score === currentScore) {
    setTimeout(function() {
      canvas.style.display = "none";
      levelUp.style.display = "block";
    }, 1500);
  }
}

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

  drawObjects(deadlyToGenerate);
  drawObjects(harmlessToGenerate);
  drawObjects(fireToGenerate);

  // platformToGenerate.forEach(function(obj) {
  //   obj.draw(context);
  // })

  newSoot.draw(context);
}

function drawObjects(array) {
  array.forEach(function(obj) {
    obj.draw(context);
  })
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

function restartRound() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newSoot.resetSoot();
  newSoot.draw(context);
}

function nextLevelGameState() {
  canvas.style.display = "block";
  levelUp.style.display = "none";
  levelUpSpeed();
}

function triggerGamePlay() {
  if (gameLoopTrigger === false) {
    startPage.style.display = 'none';
    canvas.style.display = 'block';
    gameLoopTrigger = true;
    gameLoop();
}
}

function manageGameLoop() {
    if(gameLoopTrigger === true) {
      requestAnimationFrame(gameLoop);
    } else if (gameLoopTrigger === false) {
      cancelAnimationFrame(gameLoop);
    }
}

function resetGame() {
  location.reload();
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

function storeHighScore() {
  if (highScore !== null) {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
  }
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    $(highScoreDom).html('High-Score: ' + score);
  }
}
