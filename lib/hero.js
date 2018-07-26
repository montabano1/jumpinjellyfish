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
    this.acc = 0.2;
    this.height = options.height;
    this.width = options.width;
    this.game = options.game;
    this.color = options.color;
    this.isBouncable = false;
    this.isDead = false;
    this.midjump = false;
    this.onPlatform = false;
  }


  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.pos[0], this.pos[1], this.width, this.height
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }


  bounceOffJellyfish(jellyfish) {
    if (this.pos[1] + this.height > jellyfish.pos[1] - jellyfish.radius &&
      this.pos[1] + this.height < jellyfish.pos[1] &&
      ((Math.abs(this.pos[0] + 25 - jellyfish.pos[0]) < jellyfish.radius ||
      Math.abs(this.pos[0] - jellyfish.pos[0]) < jellyfish.radius) ||
      (Math.abs(this.pos[0] + 12.5 - jellyfish.pos[0]) < jellyfish.radius ||
      Math.abs(this.pos[0] + 12.5 - jellyfish.pos[0]) < jellyfish.radius))
    ) {
      this.vel = -5;
      this.acc = 0.2;
    }
  }
  killedByJellyfish(jellyfish) {
    if (this.pos[1] + this.height > jellyfish.pos[1] &&
      this.pos[1] < jellyfish.pos[1] - jellyfish.radius &&
      ((Math.abs(this.pos[0] + 25 - jellyfish.pos[0]) < jellyfish.radius ||
      Math.abs(this.pos[0] - jellyfish.pos[0]) < jellyfish.radius) ||
      (Math.abs(this.pos[0] + 12.5 - jellyfish.pos[0]) < jellyfish.radius ||
      Math.abs(this.pos[0] + 12.5 - jellyfish.pos[0]) < jellyfish.radius))
    ) {
      this.isDead = true;
      console.log('you died');
      }
  }

  moveOnPlatform(platform) {
    if (this.pos[1] + this.height > platform.pos[1] + platform.padding &&
      this.pos[0] < platform.pos[0] + platform.width &&
      this.pos[0] + 25 > platform.pos[0]) {
      this.onPlatform = true;
      this.pos[1] -= platform.padding;
      this.vel = 0;
      this.acc = 0;
      document.addEventListener("keypress", keyPressHandler, false);
    } else {
      this.onPlatform = false;
      this.acc = 0.2;
    }
  }

  move(canvas) {
    if (this.pos[1] > canvas.height) {
      console.log('you died');
      this.isDead = true;
    }
    if (this.isDead) {
      this.color = 'green';

    } else {
      this.pos[1] += this.vel;
      this.vel += this.acc;


      if(rightPressed) {
        this.pos[0] += 2;
      }
      else if(leftPressed) {
        this.pos[0] -= 2;
      }
      if(upPressed) {
        this.vel = -5;
        this.acc = 0.2;
        upPressed = false;
        this.midjump = true;
        document.removeEventListener("keypress", keyPressHandler, false);
      }
    }
  }
}

module.exports = Hero;
