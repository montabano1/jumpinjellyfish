const Platform = require("./platform");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const Boss = require("./boss");
const splat = new Audio();
splat.src = "assets/splat.wav";
splat.volume = 0.2;

class BonusLevel {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.directions = [
      "Good Luck"
    ];
    this.challenge = [
      '              Beat this level with two lives remaining'
    ];
    this.platforms = [
      new Platform({padding: 0.1, pos: [100, canvas.height - 65], height: 30, width: canvas.width-200, type: 'start'}),
      new Platform({padding: 0.1, pos: [0, 100], height: 30, width: 100, type: 'start'}),
      new Platform({padding: 0.1, pos: [0, 250], height: 30, width: 100, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width - 100, 105], height: 30, width: 100, type: 'start'}),
      new Platform({padding: 0.1, pos: [canvas.width - 100, 225], height: 30, width: 100, type: 'start'}),
    ];
    this.jellyfish = [
    ];
    this.boss = [
      new Boss({ pos: [370, 50], vel: [0, -1], acc: [0, 0.1], width: 80, height: 80, bouncable: true}),
    ];
    this.hero = new Hero({pos: [20, 100], vel: [0,0], color: 'orange', height: 100, width: 40});
  }
  restart(canvas, ctx) {
    return new BonusLevel(canvas, ctx);
  }
  draw(canvas, ctx) {
    ctx.beginPath();
    ctx.font = "24px fantasy";
    ctx.fillStyle = 'black';
    ctx.fillText("Boss Health:", 170, 50);

    ctx.rect(
      320, 30, Math.max(this.boss[0].hits * 50, 0), 30
    );
    if (this.boss[0].hits > 1) {
      ctx.fillStyle = 'green';
    } else {
      ctx.fillStyle = 'red';
    }
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="black";
    ctx.rect(318,28,360,30);
    ctx.stroke();
    ctx.closePath();


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
    this.boss.forEach ((boss) => {
      boss.draw(ctx);
      boss.move();
      hero.bounceOffJellyfish(boss);
      hero.killedByJellyfish(boss);
      if (this.boss[0].children) {
        if (!this.boss[0].isDead) {
          splat.play();
        }
        this.boss[0].children = false;
        this.jellyfish.push(new Jellyfish({ pos: [this.boss[0].pos[0] + 20, 250], vel: [-1, -3], acc: [0, -0.2], width: 40, height: 40, bouncable: true}));
        this.jellyfish.push(new Jellyfish({ pos: [this.boss[0].pos[0] + 20, 250], vel: [1, -3], acc: [0, -0.2], width: 40, height: 40, bouncable: true}));
      }
    });
    if (this.boss[0].isDead) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,960,640);
      ctx.font = "48px fantasy";
      ctx.fillStyle = 'pink';
      ctx.fillText("You WIN OMGOMG", 300, 260);
    }
    hero.move(canvas);
    window.boss = this.boss;
    window.jellyfish = this.jellyfish;
  }
}

module.exports = BonusLevel;
