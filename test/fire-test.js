const expect = require('chai').expect;
const Fire = require('../lib/Fire');

describe ('Fire', function() {
  let fire;

  beforeEach(function () {
    fire = new Fire(50, 20, 50, 59, 'orange');
  })

  it ('should be a function', function() {
    expect(fire).to.be.an.instanceof(Fire);
  });

  it ('should have an x, y, width, height, color', function() {
    expect(fire).to.deep.equal({
      x: 50,
      y: 20,
      width: 50,
      height: 59,
      color: 'orange'
    })
  })

  it ('should be drawn to the canvas', function() {
    expect(fire).to.respondTo('draw');
  })


})
