var Umbrella = require('./Umbrella.js');

class Harmless extends Umbrella {
  constructor (x, y, width, height, speed, direction) {
    super (x, y, width, height);
    this.speed = speed;
    this.direction = direction;
  }

  draw (context) {
    let harmlessImage = new Image();

    harmlessImage.src = '/img/train.png'
    context.drawImage(harmlessImage,
      this.x,
      this.y,
      this.width,
      this.height);
  }

  generateHarmless () {
    const harmlessArray = [];
    var initX = 100;

    for (var i = 0; i < 20; i++) {
      switch (i === true) {

      case i > 3: {

        let harmlessRowOne = new Harmless (initX, 350, 120, 45, 1, -1);

        initX += 200;
        harmlessArray.push(harmlessRowOne);
        break;
      }

      case i > 7: {
        if (initX > 700) {
          initX = 100;
        }

        let harmlessRowTwo = new Harmless (initX, 300, 180, 45, 2, 1);

        initX += 350;
        harmlessArray.push(harmlessRowTwo);
        break;
      }

      case i > 10: {
        if (initX > 700) {
          initX = 100;
        }

        let harmlessRowThree = new Harmless (initX, 250, 120, 45, 3, -1);

        initX += 380;
        harmlessArray.push(harmlessRowThree);
        break;
      }

      case i > 14: {
        if (initX > 700) {
          initX = 100;
        }

        let harmlessRowFour = new Harmless (initX, 200, 100, 45, 4, 1);

        initX += 300;
        harmlessArray.push(harmlessRowFour);
        break;
      }

      case i > 17: {
        if (initX > 700) {
          initX = 100;
        }

        let harmlessRowFive = new Harmless (initX, 150, 90, 45, 2, -1);

        initX += 200;
        harmlessArray.push(harmlessRowFive);
        break;
      }

      case i > 19: {
        if (initX > 700) {
          initX = 100;
        }

        let harmlessRowSix = new Harmless (initX, 100, 180, 45, 1.5, 1);

        initX += 200;
        harmlessArray.push(harmlessRowSix);
        break;
      }
      }
    }
    return harmlessArray;
  }

  move (direction) {
    switch (direction) {
    case 'left':
      this.x -= this.speed;
      break;

    case 'right':
      this.x += this.speed;
      break;
    }
  }
}

module.exports = Harmless;
