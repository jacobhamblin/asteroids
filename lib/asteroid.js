(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }


  var COLOR = '#A5B5D2';

  var Asteroid = Asteroids.Asteroid = function(attributes){
    var game = attributes['game'];
    var pos = attributes['pos'];
    var vel = Asteroids.Util.randomVec(1);
    var radius = attributes['radius'];
    Asteroids.MovingObject.call(this, {pos: pos, color: COLOR, radius: radius, vel: vel, game: game});
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      window.livesLost += 1;
    } else if (otherObject instanceof Asteroids.Bullet) {
      window.asteroidsShot += 1;
    }
  }
})();
