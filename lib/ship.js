(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var RADIUS = 6;
  var COLOR = '#fff';

  var Ship = Asteroids.Ship = function(attributes){
    var game = attributes['game'];
    var pos = attributes['pos'];
    var vel = [0, 0];

    this.vertices = [[10, 0], [-2, -5], [-2, 5]];
    this.rot = (Math.PI/2);
    this.game = game;
    this.pos = pos;
    this.vel = vel;
    Asteroids.MovingObject.call(this, {pos: pos, color: COLOR, radius: RADIUS, vel: vel, game: game});
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.vel = [0, 0];
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function (){
    var middle = this.vertices[0];
    var bulletPos = [this.pos[0] + middle[0], this.pos[1] + middle[1] ];
    var norm = Asteroids.Util.distance(this.pos, bulletPos);

    var bulletSpeed = 1;

    var bulletVel = [
        norm * Math.sin(this.rot) * bulletSpeed,
        norm * Math.cos(this.rot) * bulletSpeed
      ];

    var bullet = new Asteroids.Bullet({
      game: this.game,
      pos: bulletPos,
      vel: bulletVel
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    var middle = this.vertices[0];
    var sideOne = this.vertices[1];
    var sideTwo = this.vertices[2];
    ctx.strokeStyle = this.color;
    ctx.lineWidth="1";
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + middle[0], this.pos[1] + middle[1]);
    ctx.lineTo(this.pos[0] + sideOne[0], this.pos[1] + sideOne[1]);
    ctx.lineTo(this.pos[0] + (sideTwo[0]), this.pos[1] + (sideTwo[1]));
    ctx.lineTo(this.pos[0] + middle[0], this.pos[1] + middle[1]);
    ctx.stroke();
  };

  Ship.prototype.rotateLeft = function() {
    var angle = (2 * Math.PI) / 24;
    this.rot += angle;
    this.rotate(angle);
  };

  Ship.prototype.rotateRight = function() {
    var angle = -1 * (2 * Math.PI) / 24;
    this.rot += angle;
    this.rotate(angle);
  };

  Ship.prototype.rotate = function(angle) {
    this.vertices = this.vertices.map(function(coords){
      var x = Math.cos(angle)*coords[0] + Math.sin(angle) * coords[1];
      var y = -Math.sin(angle)*coords[0] + Math.cos(angle) * coords[1];
      return [x, y];
    }.bind(this));
  };

  Ship.prototype.move = function() {

    var dist = Asteroids.Util.distance([0,0], this.vel);
    this.pos[0] += dist * Math.sin(this.rot);
    this.pos[1] += dist * Math.cos(this.rot);
    this.pos = this.game.wrap(this.pos);
  };
})();
