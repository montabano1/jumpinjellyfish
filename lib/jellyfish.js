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
    if (this.isDead) {
      this.color = 'gray';
      this.acc = [1,1];
      this.pos[1] += this.vel[1];
      this.vel[1] += this.acc[1];
    } else {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      this.vel[0] += this.acc[0];
      this.vel[1] += this.acc[1];
      if (Math.abs(this.vel[0]) > 4) {
        this.acc[0] *= -1;
      }
      if (Math.abs(this.vel[1]) > 4) {
        this.acc[1] *= -1;
      }
    }
  }
}


module.exports = Jellyfish;
