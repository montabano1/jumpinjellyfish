const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

class LevelThree {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      'LEVEL 3:',
      'Hop on a flounder to ride it'
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: 150, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width-150, 225], height: 30, width: 150, type: 'finish'}),
    ];
    this.jellyfish = [
      new Jellyfish({ pos: [340, 300], vel: [2, 2], acc: [-0.1, -0.1], radius: 20, color: "green"}),
      new Jellyfish({ pos: [540, 300], vel: [2, 2], acc: [-0.1, -0.1], radius: 20, color: "red"}),
      new Jellyfish({ pos: [740, 300], vel: [2, 2], acc: [-0.1, -0.1], radius: 20, color: "blue"}),
    ];
    this.hero = new Hero({pos: [20, 100], vel: 0, color: 'orange', height: 65, width: 25});
  }
  restart(canvas, ctx) {
    return new LevelThree(canvas, ctx);
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

module.exports = LevelThree;