var Umbrella = require('./Umbrella.js');

class Platform extends Umbrella {
  constructor (x, y, width, height, color, type) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

module.exports = Platform;
