const expect = require('chai').expect;
const Harmless = require('../lib/Harmless');

describe ('Harmless', function() {
  let harmless;

  beforeEach(function () {
    harmless = new Harmless(100, 350, 120, 45, 1, -1);
  })

  it ('should be a function', function() {
    expect(harmless).to.be.an.instanceof(Harmless);
  });

  it ('should have an x, y, width, height, speed, and direction', function() {
    expect(harmless).to.deep.equal({
      x: 100,
      y: 350,
      width: 120,
      height: 45,
      speed: 1,
      direction: -1
    })
  })

  it ('should be drawn to the canvas', function() {
    expect(harmless).to.respondTo('draw');
  })

  it ('should have a move function', function() {
    expect(harmless).to.respondTo('move');
  })

  it ('should have a generateHarmless function', function() {
    expect(harmless).to.respondTo('generateHarmless');
  })
})
