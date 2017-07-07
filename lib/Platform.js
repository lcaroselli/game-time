var Umbrella = require('./Umbrella.js');

class Platform extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  generatePlatform() {
    const platformArray = [];
    var platformX = 0;

    for (let i = 0; i < 6; i++) {
      switch (i === true) {
      case i === 0: {
        let platformOne = new Platform (platformX, 700, 800, 100, 'green');
        platformArray.push(platformOne);
        break;
      }
      case i === 1: {
        let platformTwo = new Platform (platformX, 500, 800, 200, 'lightgrey');
        platformArray.push(platformTwo);
        break;
      }
      case i === 2: {
        let platformThree = new Platform (platformX, 400, 800, 100, 'green');
        platformArray.push(platformThree);
        break;
      }
      case i === 3: {
        let platformFour = new Platform (platformX, 100, 800, 300, 'blue');
        platformArray.push(platformFour);
        break;
      }
      case i === 4: {
        let platformFive = new Platform (platformX, 0, 800, 100, 'orange');
        platformArray.push(platformFive);
        break;
      }
    }
    return platformArray;
  }
}
}

module.exports = Platform;

// const grass1 = new Platform(0, 700, canvas.width, 100, 'green');
// const grass2 = new Platform(0, 400, canvas.width, 100, 'green');
// const firepit = new Platform(0, 0, canvas.width, 100, 'orange');
// const water = new Platform(0, 100, canvas.width, 300, 'blue');
// const road = new Platform(0, 500, canvas.width, 200, 'lightgrey')
// const platforms = [grass1, grass2, firepit, water, road];
