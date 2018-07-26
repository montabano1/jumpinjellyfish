const Util = require("./util");

class Jellyfish {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.acc = options.acc;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
    this.isBouncable = true;
    this.isDead = false;
  }



  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  isCollidedWithHero(hero) {
    const centerDist = Util.dist(this.pos, hero.pos);
    return centerDist < (this.radius + hero.radius);
  }

  move(ctx) {
    this.draw(ctx);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.vel[1] += this.acc;
    if (Math.abs(this.vel[1]) > 4) {
      this.acc *= -1;
    }
  }
}


module.exports = Jellyfish;
