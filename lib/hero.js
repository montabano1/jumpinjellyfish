const Util = require("./util");
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
class Hero {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.acc = options.acc;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
    this.isBouncable = false;
    this.isDead = false;
  }


  draw(ctx) {
    const heroHeight = 65;
    const heroWidth = 25;
    ctx.beginPath();
    ctx.rect(
      this.pos[0], this.pos[1], heroWidth, heroHeight
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  isCollidedWithJellyfish(jellyfish) {
    const centerDist = Util.dist(this.pos, jellyfish.pos);
    return centerDist < (this.radius + jellyfish.radius);
  }

  move(ctx) {
    if(rightPressed) {
      this.pos[0] += 7;
    }
    else if(leftPressed) {
      this.pos[0] -= 7;
    }
  }
}

module.exports = Hero;
