require('./game.css');
// require('./Umbrella.js');
var Soot = require('./Soot.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

var newSoot = new Soot (300, 500, 10, 10, 'orange');

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newSoot.draw(context);
  console.log('hello')

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener('keydown', function(event) {
  console.log(event);

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
