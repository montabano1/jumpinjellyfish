const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const Prize = require("./prize");
const tada = document.getElementById('tada');

class LevelOne {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      "LEVEL 1:",
      "You may bounce off the top of the",
      "jellyfish but don't hit their stingers!"
    ];
    this.challenge = [
      '              Kill all jellyfish on your FIRST jump and win'
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: 550, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width-75, 225], height: 30, width: 375, type: 'finish'}),
    ];
    this.jellyfish = [
      new Jellyfish({ pos: [240, 60], vel: [0, 3], acc: [0, -0.1], width: 40, height: 40, bouncable: true}),
      new Jellyfish({ pos: [480, 250], vel: [0, -3], acc: [0, 0.1], width: 40, height: 40, bouncable: true}),
      new Jellyfish({ pos: [720, 300], vel: [0, 3], acc: [0, -0.1], width: 40, height: 40, bouncable: true})
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 100, width: 40});
    this.prize = new Prize({pos: [900, 135]});
    this.easteregg = false;
    this.eggfound = false;
  }
  restart(canvas, ctx) {
    return new LevelOne(canvas, ctx);
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
    if (hero.won) {
      if(this.jellyfish[0].isDead && this.jellyfish[1].isDead &&
        this.jellyfish[2].isDead && hero.lands === 2 && hero.won && !this.easteregg) {
        tada.play();
        this.easteregg = true;
        this.eggfound = true;
      }
    }

  }
}

module.exports = LevelOne;
