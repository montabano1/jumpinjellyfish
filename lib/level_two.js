const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const Prize = require("./prize");
const tada = document.getElementById('tada');
tada.volume = 0.5;

class LevelTwo {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      'LEVEL 2:',
      'Use the mouse to click and hold on',
      'to a jellyfish to freeze it in place',
      '     (Press enter to continue)',
    ];
    this.challenge = [
      '                      Win by killing ONLY two jellyfish'
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: 150, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width-150, 225], height: 30, width: 150, type: 'finish'}),
    ];
    this.jellyfish = [
      new Jellyfish({ pos: [340, 300], vel: [2, 2], acc: [-0.1, -0.1], width: 40, height: 40, bouncable: true}),
      new Jellyfish({ pos: [340, 100], vel: [-2, -2], acc: [0.1, 0.1], width: 40, height: 40, bouncable: true}),
      new Jellyfish({ pos: [700, 300], vel: [2, 2], acc: [-0.1, -0.1], width: 40, height: 40, bouncable: true}),
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 100, width: 40});
    this.prize = new Prize({pos: [900, 135]});
    this.easteregg= false;
    this.eggfound = false;
  }
  restart(canvas, ctx) {
    return new LevelTwo(canvas, ctx);
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
    if (!this.jellyfish[0].isDead && hero.won && !this.easteregg) {
      tada.play();
      this.easteregg = true;
      this.eggfound = true;
    }
  }
}

module.exports = LevelTwo;
