const expect = require('chai').expect;
const Soot = require('../lib/Soot');

describe ('Soot', function() {
  let soot;

  beforeEach(function () {
    soot = new Soot();
  })

  it ('should be a function', function() {
    expect(soot).to.be.an.instanceof(Soot);
  });

  it ('should have a move function', function() {
    expect(soot).to.respondTo('move');
  })

  it ('should be drawn to the canvas', function() {
    expect(soot).to.respondTo('draw');
  })

  it('should be reset at game reset', function() {
    expect(soot).to.respondTo('resetSoot');
  })

  it('resetSoot should move soot to game start position', function() {
    soot.resetSoot();
    expect(soot.x).to.equal(400);
    expect(soot.y).to.equal(700);
  })
});
