var Umbrella = require('./Umbrella.js');

class Deadly extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  // move (across) {
  //   this.x += across.x;
  //   }
  // }

  move (direction) {
    var across = {
      x: 1,
      y: 1
    }

    switch (direction) {
    case 'left':
      this.x -= across.x;
      break;

    case 'right':
      this.x += across.x;
      break;
    }
  }
}

module.exports = Deadly;
