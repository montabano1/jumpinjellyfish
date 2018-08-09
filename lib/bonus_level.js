const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

class BonusLevel {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      "Good Luck"
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [100, canvas.height - 135], height: 30, width: canvas.width-200, type: 'start'}),
      new Platform({padding: 0.1, pos: [0, 100], height: 30, width: 100, type: 'start'}),
      new Platform({padding: 0.1, pos: [0, 250], height: 30, width: 100, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width - 100, 105], height: 30, width: 100, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width - 100, 225], height: 30, width: 100, type: 'start'}),
    ];
    this.jellyfish = [
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 100, width: 40});
  }
  restart(canvas, ctx) {
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
  }
}

module.exports = BonusLevel;
