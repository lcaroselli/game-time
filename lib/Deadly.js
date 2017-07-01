var Umbrella = require('./Umbrella.js');

class Deadly extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
    // this.direction = direction;
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

  generateDeadly () {
    const deadlyArray = [];
    var initX = 100;

    for (var i = 0; i < 14; i++) {
      switch (i === true) {

        case i > 3: {
          let deadlyRowOne = new Deadly (initX, 650, 20, 20, 'blue');
          initX += 200;
          deadlyArray.push(deadlyRowOne);
          break;
        }

        case i > 7: {
          if (initX > 700) {
            initX = 100;
          }
          let deadlyRowTwo = new Deadly (initX, 600, 60, 20, 'orange');
          initX += 200;
          deadlyArray.push(deadlyRowTwo);
          break;
        }

        case i > 10: {
          if (initX > 700) {
            initX = 100;
          }
          let deadlyRowThree = new Deadly (initX, 550, 40, 20, 'pink');
          initX += 100;
          deadlyArray.push(deadlyRowThree);
          break;
        }

        case i > 14: {
          if (initX > 700) {
            initX = 100;
          }
          let deadlyRowFour = new Deadly (initX, 500, 20, 20, 'green');
          initX += 200;
          deadlyArray.push(deadlyRowFour);
          break;
        }
      }
    }
    return deadlyArray;
  }
}

// make two functions, function for trucks, and one for car
// car function needs x, y, width, height, color, direction parameters, to create car instance, push cars into an array
// in gameloop, call car function within a loop to paint cars onto canvas, push cars into array (dynamic limit or hard-coded limit?)
// same idea with truck function



module.exports = Deadly;
