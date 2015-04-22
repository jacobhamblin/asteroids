(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var RADIUS = 6;
  var COLOR = '#9933FF';

  var Ship = Asteroids.Ship = function(attributes){
    var game = attributes['game'];
    var pos = attributes['pos'];
    var vel = [0, 0];
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
    // var velocity = [this.vel[0], this.vel[1]];

    var xVel = this.vel[0];
    var yVel = this.vel[1];
    var sumVel = Math.abs(xVel) + Math.abs(yVel);

    var bulletVel = [(xVel/sumVel * 5 + xVel), (yVel/sumVel * 5 + yVel)]

    var position = [this.pos[0], this.pos[1]];

    // if(this.vel[0] === 0){
    //   velocity[0] === 0;
    // } else if(this.vel[0] > 0){
    //   velocity[0] = this.vel[0] + 1;
    // } else {
    //   velocity[0] = this.vel[0] - 1;
    // }
    //
    // if(this.vel[1] === 0){
    //   velocity[1] === 0;
    // } else if(this.vel[1] > 0){
    //   velocity[1] = this.vel[1] + 1;
    // } else {
    //   velocity[1] = this.vel[1] - 1;
    // }
    var bullet = new Asteroids.Bullet({pos: position, game: this.game, vel: bulletVel});
    this.game.bullets.push(bullet);
  };
})();
