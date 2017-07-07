const expect = require('chai').expect;
const Soot = require('../lib/Soot');
const Umbrella = require('../lib/Umbrella');
const Game = require('../lib/game');


describe ('Soot', function() {
  let soot;

  beforeEach(function () {
  soot = new Soot();
})

  it ('should be a function', function() {
    expect(soot).to.be.an.instanceof(Soot);
  });

  it('should have x, y, width, height, color, type, speed', function(){
    expect(soot).to.deep.equal({
      x: 400,
      y: 700,
      width: 40,
      height: 50,
      type: 'image',
      speed: 0
    })
  })

  // it ('should have a move function', function(){
  //   assert.isFunction(newSoot.move);
  //   expect(newSoot)to.have.property('move');
  // })
  //
  //
  // it('should be able to move down', function(){
  //   var down = (x: , y: );
  //
  //   expect(newSoot.x).to.equal()
  // })

});
