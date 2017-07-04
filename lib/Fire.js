var Umbrella = require('./Umbrella.js');

class Fire extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }

  draw (context) {
    let fireImage = new Image();
    fireImage.src = '/img/fire.png'
    context.drawImage(fireImage,
      this.x,
      this.y,
      this.width,
      this.height);
  }

  generateFire () {
    const fireArray = [];
    var initX = 50;

    for (var i = 0; i < 5; i++) {
      let fireRowOne = new Fire (initX, 20, 50, 59, 'orange');

      initX += 160;
      fireArray.push(fireRowOne);
        }
        return fireArray;
      }
    }

  module.exports = Fire;
