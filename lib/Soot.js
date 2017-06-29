var Umbrella = require('./Umbrella.js');

class Soot extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  move (direction) {
    switch (direction) {
    case 'left':
      this.x -= this.width
      break;

    case 'right':
      this.x += this.width
      break;

    case 'up':
      this.y -= this.height
      break;

    case 'down':
      this.y += this.height
      break;
    }
  }

  resetSoot() {
    x: 400;
    y: 700;
  }
  }

module.exports = Soot;
