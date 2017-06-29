var Umbrella = require('./Umbrella.js');

class Platform extends Umbrella {
  constructor (x, y, width, height, color) {
    super (x, y, width, height, color);
  }
}

module.exports = Platform;
