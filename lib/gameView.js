(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx, img) {
    this.game = game;
    this.ctx = ctx;
    ctx.canvas.width = window.innerWidth * 0.9;
    ctx.canvas.height = window.innerHeight * 0.9;
    this.img = img;
  };

  GameView.prototype.start = function() {
    var gameView = this;
    key('up, w', function(){gameView.game.ship.power([0,-1])});
    key('down, s', function(){gameView.game.ship.power([0,1])});
    key('left, a', function(){gameView.game.ship.power([-1,0])});
    key('right, d', function(){gameView.game.ship.power([1,0])});
    key('space', function(){gameView.game.ship.fireBullet()});
    setInterval(function(){
      gameView.game.step();
      gameView.game.draw(gameView.ctx, gameView.img);
    }, 20);
  };
})();
