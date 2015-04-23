(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var DIM_X = (window.innerWidth * 0.8);
  console.log(DIM_X);
  var DIM_Y = (window.innerHeight * 0.8);
  console.log(DIM_Y);
  var NUM_ASTEROIDS = ((DIM_X * DIM_Y) * 0.0001);

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(NUM_ASTEROIDS * 0.7, 8);
    this.addAsteroids(NUM_ASTEROIDS * 0.3, 14);
    this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.randomPosition = function() {
    var x = Math.random()*DIM_X;
    var y = Math.random()*DIM_Y;
    return [x,y];
  };

  Game.prototype.addAsteroids = function(quantity, radiusNum){
    for (var i = 0; i < quantity; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition(), game: this, radius: radiusNum}));
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].move();
    }
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] >= DIM_X) {
      pos[0] = 0;
    }
    if (pos[0] < 0){
      pos[0] = DIM_X;
    }
    if (pos[1] >= DIM_Y) {
      pos[1] = 0;
    }
    if (pos[1] < 0) {
      pos[1] = DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = i + 1; j < objects.length; j++) {
        var obj1 = objects[i];
        var obj2 = objects[j];
        if (objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
          objects[j].collideWith(objects[i]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(object) {
    if (object instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(object);
      this.asteroids.splice(index,1);
    } else if (object instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(object);
      this.bullets.splice(index,1);
    }
  };

})();
