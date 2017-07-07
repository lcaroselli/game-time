const expect = require('chai').expect;
const Deadly = require('../lib/Deadly');

describe ('Deadly', function() {
  let deadly;

  beforeEach(function () {
    deadly = new Deadly(100, 650, 60, 40, 1.5);
  })

  it ('should be a function', function() {
    expect(deadly).to.be.an.instanceof(Deadly);
  });

  it ('should have an x, y, width, height, speed', function() {
    expect(deadly).to.deep.equal({
      x: 100,
      y: 650,
      width: 60,
      height: 40,
      speed: 1.5
    })
  })

  it ('should be drawn to the canvas', function() {
    expect(deadly).to.respondTo('draw');
  })

  it ('have a move function', function() {
    expect(deadly).to.respondTo('move');
  })

  it ('should have a generateDeadly function', function() {
    expect(deadly).to.respondTo('generateDeadly');
  })
})
