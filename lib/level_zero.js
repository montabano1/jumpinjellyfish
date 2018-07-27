const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

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
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: canvas.width/2 - 70, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width/2+70, 225], height: 30, width: 575, type: 'finish'}),
    ];
    this.jellyfish = [
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 65, width: 25});
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
      ctx.fillStyle = 'black';
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
  }
}

module.exports = LevelZero;
