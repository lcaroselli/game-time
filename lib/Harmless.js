var Umbrella = require('./Umbrella.js');

class Harmless extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

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

  generateHarmless () {
    const harmlessArray = [];
    var initX = 100;

    for (var i = 0; i < 20; i++) {
      switch (i === true) {

        case i > 3: {
          let harmlessRowOne = new Harmless (initX, 350, 70, 45, 'brown');
          initX += 200;
          harmlessArray.push(harmlessRowOne);
          break;
        }

        case i > 7: {
          if (initX > 700) {
            initX = 100;
          }
          let harmlessRowTwo = new Harmless (initX, 300, 180, 45, 'brown');
          initX += 200;
          harmlessArray.push(harmlessRowTwo);
          break;
        }

        case i > 10: {
          if (initX > 700) {
            initX = 100;
          }
          let harmlessRowThree = new Harmless (initX, 250, 70, 45, 'brown');
          initX += 100;
          harmlessArray.push(harmlessRowThree);
          break;
        }

        case i > 14: {
          if (initX > 700) {
            initX = 100;
          }
          let harmlessRowFour = new Harmless (initX, 200, 180, 45, 'brown');
          initX += 200;
          harmlessArray.push(harmlessRowFour);
          break;
        }

        case i > 17: {
          if (initX > 700) {
            initX = 100;
          }
          let harmlessRowFive = new Harmless (initX, 150, 180, 45, 'brown');
          initX += 200;
          harmlessArray.push(harmlessRowFive);
          break;
        }

        case i > 20: {
          if (initX > 700) {
            initX = 100;
          }
          let harmlessRowSix = new Harmless (initX, 100, 180, 45, 'brown');
          initX += 200;
          harmlessArray.push(harmlessRowSix);
          break;
        }
      }
    }
    return harmlessArray;
  }
}

module.exports = Harmless;
