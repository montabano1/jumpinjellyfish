const Util = require("./util");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyPressHandler, false);
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode === 39 || e.keyCode === 68) {
    rightPressed = false;
  }
  else if(e.keyCode === 37 || e.keyCode === 65) {
    leftPressed = false;
  }
}
function keyPressHandler(e) {
  if(e.keycode === 38 || e.keyCode === 32) {
    upPressed = true;
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
    this.pos[1] += this.vel;
    this.vel += this.acc;
    if (this.vel > 5) {
      this.vel = 0;
      this.acc = 0;
      document.addEventListener("keypress", keyPressHandler, false);
    }
    if(rightPressed) {
      this.pos[0] += 2;
    }
    else if(leftPressed) {
      this.pos[0] -= 2;
    }
    if(upPressed) {
      this.vel = -5;
      this.acc = 0.1;
      upPressed = false;
      document.removeEventListener("keypress", keyPressHandler, false);
    }
  }
}

module.exports = Hero;
