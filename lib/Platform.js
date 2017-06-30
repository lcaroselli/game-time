var Umbrella = require('./Umbrella.js');

class Platform extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  // draw (context) {
  //   let grassImage = new Image();
  //   grassImage.src = '/img/cobblestone.png'
  //   var pat = context.createPattern(grassImage,'repeat-x');
  //   context.drawImage(grassImage,
  //     this.x,
  //     this.y,
  //     this.width,
  //     this.height);
  // }
}

module.exports = Platform;
