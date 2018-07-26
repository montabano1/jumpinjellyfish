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
    this.game = options.game;
    this.color = options.color;
    this.isBouncable = false;
    this.isDead = false;
    this.midjump = false;
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

  bounceOffJellyfish(jellyfish) {
    if (this.pos[1] + 65 > jellyfish.pos[1] - jellyfish.radius &&
      this.pos[1] + 65 < jellyfish.pos[1] &&
      ((Math.abs(this.pos[0] + 25 - jellyfish.pos[0]) < jellyfish.radius ||
      Math.abs(this.pos[0] - jellyfish.pos[0]) < jellyfish.radius) ||
      (Math.abs(this.pos[0] + 12.5 - jellyfish.pos[0]) < jellyfish.radius ||
      Math.abs(this.pos[0] + 12.5 - jellyfish.pos[0]) < jellyfish.radius))
    ) {
      this.vel = -5;
      this.acc = 0.1;
    }
  }
  // killedByJellyfish(jellyfish) {
  //   if (this.pos[1] )
  // }

  move(ctx) {
    this.pos[1] += this.vel;
    this.vel += this.acc;

    if (this.pos[1] > 160) {
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
      this.midjump = true;
      document.removeEventListener("keypress", keyPressHandler, false);
    }
  }
}

module.exports = Hero;
