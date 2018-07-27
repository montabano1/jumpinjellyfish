const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

class LevelTwo {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = 'level two directions';
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: 150, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width-75, 225], height: 30, width: 75, type: 'finish'}),
    ];
    this.jellyfish = [
      new Jellyfish({ pos: [240, 200], vel: [2, 2], acc: [-0.1, -0.1], radius: 10, color: "green"}),
      new Jellyfish({ pos: [300, 200], vel: [2, 2], acc: [-0.2, -0.2], radius: 10, color: "red"})
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

module.exports = LevelTwo;
