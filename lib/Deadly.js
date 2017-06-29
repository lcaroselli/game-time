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
}

// Deadly.prototype.buildCars = (function (x, y, width, height, color, direction) {
//
//   for (var i = 0; i < 4; i++) {
//     x = x + 50;
//     let car = new Deadly(x, 400, 20, 20, 'green', 'right');
//     cars.push(car)
//   }
// }());

// make two functions, function for trucks, and one for car
// car function needs x, y, width, height, color, direction parameters, to create car instance, push cars into an array
// in gameloop, call car function within a loop to paint cars onto canvas, push cars into array (dynamic limit or hard-coded limit?)
// same idea with truck function



module.exports = Deadly;
