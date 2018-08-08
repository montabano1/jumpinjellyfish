const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const Prize = require("./prize");
const tada = document.getElementById('tada');

class LevelZero {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      "LEVEL 0:",
      "Use A or the Left arrow to move LEFT.",
      "Use D or the Right arrow to move RIGHT.",
      "Use W or the spacebar to JUMP.",
      "Try to get to the other platform!",

    ];
    this.challenge = [
      '                          Jump higher than the screen'
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: canvas.width/2 - 70, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width/2+70, 225], height: 30, width: 575, type: 'finish'}),
    ];
    this.jellyfish = [
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 100, width: 40});
    this.prize = new Prize({pos: [700, 135]});
    this.easteregg = false;
  }
  restart(canvas, ctx) {
    return new LevelZero(canvas, ctx);
  }
  draw(canvas, ctx) {
    const hero = this.hero;

    hero.draw(ctx);
    this.platforms.forEach ((plat) => {
      ctx.beginPath();
      ctx.rect(
      plat.pos[0], plat.pos[1], plat.width, plat.height
      );
      ctx.fillStyle = '#86592d';
      ctx.fill();
      ctx.closePath();
      hero.moveOnPlatform(plat);
    });
    this.jellyfish.forEach ((jel) => {
      jel.draw(ctx);
      jel.move();
      hero.bounceOffJellyfish(jel);
      hero.killedByJellyfish(jel);
    });
    hero.move(canvas);
    this.prize.draw(ctx, hero);
    if (hero.pos[1] < -27 && !this.easteregg) {
      tada.play();
      this.easteregg = true;
    }

  }
}

module.exports = LevelZero;
