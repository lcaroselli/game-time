var Umbrella = require('./Umbrella.js');

class Soot extends Umbrella {
  constructor (x, y, width, height, color, type, speed) {
    super (x, y, width, height);
    this.type = type;
    this.speed = speed;
  }

  draw (context) {
    let sootImage = new Image();

    sootImage.src = '/img/sootball.png'

    if (this.y > 750) {
      this.y = 750
    } else {
      this.y
    }

    if (this.x < 0 && this.y > 400) {
      this.x = 0
    } else {
      this.x
    }

    if (this.x > 750 && this.y > 400) {
      this.x = 750
    } else {
      this.x
    }

    context.drawImage(sootImage,
      this.x,
      this.y,
      this.width,
      this.height);
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
    this.x = 400;
    this.y = 700;
  }
}

module.exports = Soot;
