const expect = require('chai').expect;
const Deadly = require('../lib/Deadly');

describe ('Deadly', function() {
  let deadly;

  beforeEach(function () {
    deadly = new Deadly();
  })

  it ('should be a function', function() {
    expect(deadly).to.be.an.instanceof(Deadly);
  });

  it.skip ('should have an x, y, width, height, and speed', function() {
    expect(deadly).to.deep.equal({
      x: 400,
      y: 700,
      width: 40,
      height: 50,
      speed: 0
    })
  })

  it ('should be drawn to the canvas', function() {
    expect(deadly).to.respondTo('draw');
  })

  it ('have a move function', function() {
    expect(deadly).to.respondTo('move');
  })
})
