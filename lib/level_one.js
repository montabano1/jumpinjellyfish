const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

class LevelOne {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: 550, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width-75, 225], height: 30, width: 375, type: 'finish'}),
    ];
    this.jellyfish = [
      new Jellyfish({ pos: [240, 300], vel: [0, 3], acc: [0, -0.1], radius: 10, color: "green"}),
      new Jellyfish({ pos: [480, 250], vel: [0, -3], acc: [0, 0.1], radius: 10, color: "red"}),
      new Jellyfish({ pos: [720, 300], vel: [0, 3], acc: [0, -0.1], radius: 10, color: "blue"})
    ];
    this.hero = new Hero({pos: [20, 100], vel: 0, color: 'orange', height: 65, width: 25});
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

module.exports = LevelOne;
