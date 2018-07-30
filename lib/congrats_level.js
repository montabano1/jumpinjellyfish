const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

class CongratsLevel {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      "YOU WIN"
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: canvas.width, type: 'start'}),
    ];
    this.jellyfish = [
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 100, width: 40});
  }
  restart(canvas, ctx) {
    return new CongratsLevel(canvas, ctx);
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
    ctx.font = "96px fantasy";
    ctx.fillStyle = 'orange';
    ctx.fillText("YOU WIN", 600 - hero.pos[0], 400);
  }
}

module.exports = CongratsLevel;
