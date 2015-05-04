(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    ctx.canvas.width = window.innerWidth * 0.8;
    ctx.canvas.height = window.innerHeight * 0.8;
    this.dimX = ctx.canvas.width;
    this.dimY = ctx.canvas.height;
  };

  window.livesLost = 0;
  window.asteroidsShot = 0;
  window.paused = false;

  GameView.isMuted = false;

  GameView.prototype.muteToggle = function() {
   if (GameView.isMuted) {
     if (window.victory) {
       window.victory.pause();
     } else {
       window.audio.pause();
     }
   } else {
     if (window.victory) {
       window.victory.play();
     } else {
       window.audio.play();
     }
   }
 };

  GameView.prototype.start = function() {
    var gameView = this;
    key('up, w', function(){gameView.game.ship.power([0,-1])});
    key('down, s', function(){gameView.game.ship.power([0,1])});
    key('left, a', function(){gameView.game.ship.rotateLeft();});
    key('right, d', function(){gameView.game.ship.rotateRight();});
    key('space', function(){gameView.game.ship.fireBullet()});
    key('enter', function(){GameView.isMuted = !GameView.isMuted; gameView.muteToggle();})
    setInterval(function(){
      gameView.game.draw(gameView.ctx, gameView.img);
      gameView.drawDirections();
      gameView.drawScores();
      gameView.drawMute();
      gameView.game.step();
      if (gameView.game.isWon()) {
        gameView.drawVictory();
      }

      if (window.victory) {
        window.victory.addEventListener('ended', function() {
          this.play();
        }, false)
      }
    }, 20)
  };

  GameView.prototype.drawDirections = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  this.ctx.textAlign = 'right';
  this.ctx.font = '18px Helvetica';
  this.ctx.fillText("WASD, arrow keys, spacebar", this.dimX - 40  , this.dimY-40);
};

GameView.prototype.drawScores = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  this.ctx.textAlign = 'right';
  this.ctx.font = '18px Helvetica';
  this.ctx.fillText("Asteroids Shot: " + window.asteroidsShot, this.dimX - 40, 40);
  this.ctx.fillText("Lives Lost: " + window.livesLost, this.dimX - 40, 70);
};

GameView.prototype.drawMute = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  this.ctx.textAlign = 'left';
  this.ctx.font = '18px Helvetica';
  this.ctx.fillText("Press 'Enter' to Mute", 40, 40 );

}

GameView.prototype.drawVictory = function() {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  this.ctx.textAlign = 'center';
  this.ctx.font = '50px Helvetica';
  this.ctx.fillText("Congratulations! You win!", this.dimX/2, this.dimY/2);
  if (!window.victory) {
    window.victory = new Audio('https://s3-us-west-1.amazonaws.com/yasmirtudoachimandirochichi/asteroids/MMIII+-+14+-+Victory.mp3');
    window.audio.pause();
    window.victory.play();
  }
};

})();
