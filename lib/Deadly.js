var Umbrella = require('./Umbrella.js');

class Deadly extends Umbrella {
  constructor (x, y, width, height, color, speed) {
    super (x, y, width, height, color);
    this.speed = speed;
  }

  draw (context) {
    let deadlyImage = new Image();
    deadlyImage.src = '/img/catbus.png'
    context.drawImage(deadlyImage,
      this.x,
      this.y,
      this.width,
      this.height);
      // context.fillStyle = this.color;
      // context.fillRect(this.x, this.y, this.width, this.height);
  }

  move (direction, speed) {
    var across = {
      j: speed
    }

    switch (direction) {
    case 'left':
      this.x -= across.j;
      break;

    case 'right':
      this.x += across.j;
      break;
    }
  }

  generateDeadly () {
    const deadlyArray = [];
    var initX = 100;

    for (var i = 0; i < 14; i++) {
      switch (i === true) {
        case i > 3: {
          let deadlyRowOne = new Deadly (initX, 650, 60, 40, 'blue', 1.5);
          initX += 200;
          deadlyArray.push(deadlyRowOne);
          break;
        }

        case i > 7: {
          if (initX > 700) {
            initX = 100;
          }
          let deadlyRowTwo = new Deadly (initX, 600, 100, 40, 'orange', 4);
          initX += 200;
          deadlyArray.push(deadlyRowTwo);
          break;
        }

        case i > 10: {
          if (initX > 700) {
            console.log(initX);
            initX = 100;
          }
          let deadlyRowThree = new Deadly (initX, 550, 60, 40, 'pink', 3);
          initX += 150;
          deadlyArray.push(deadlyRowThree);
          break;
        }

        case i > 14: {
          if (initX > 700) {
            initX = 100;
          }
          let deadlyRowFour = new Deadly (initX, 500, 100, 40, 'green', 2);
          initX += 200;
          deadlyArray.push(deadlyRowFour);
          break;
        }
      }
    }
    return deadlyArray;
  }
}

module.exports = Deadly;
