var Umbrella = require('./Umbrella.js');

class Platform extends Umbrella {
  constructor (x, y, width, height, color, type) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  // draw (context) {
  //   let newImage = new Image();
  //   newImage.src = '/img/cobblestone.png'
  //   var ptrn = context.createPattern(newImage, 'repeat');
  //   context.fillStyle = ptrn;
  //   context.fillRect(0, 0, canvas.width, canvas.height);
  // }
}

module.exports = Platform;
