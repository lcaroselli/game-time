class Soot {
  constructor (x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
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
}

module.exports = Soot;
