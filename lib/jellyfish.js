const Util = require("./util");
const canvas = document.getElementById('myCanvas');
const canvasLeft = canvas.offsetLeft;
const canvasTop = canvas.offsetTop;
let clickpos = [1000, 1000];
canvas.addEventListener('mousedown', function(event) {
    const x = event.pageX - canvasLeft;
    const y = event.pageY - canvasTop;
    clickpos = [x,y];
    canvas.addEventListener('mouseup', function() {
      clickpos = [1000, 1000];
    }, false);
  }, false);
const jellyfishimage = new Image();
jellyfishimage.src = "/Users/michaelmontalbano/Desktop/jumpinjellyfish/assets/jellyfish.png";
const deadjelly = new Image();
deadjelly.src = "/Users/michaelmontalbano/Desktop/jumpinjellyfish/assets/dead.png";


class Jellyfish {
  constructor(options) {
    this.startingpos = options.pos;
    this.pos = options.pos;
    this.startingvel = options.vel;
    this.vel = options.vel;
    this.startingacc = options.acc;
    this.acc = options.acc;
    this.radius = options.radius;
    this.width = options.width;
    this.height = options.height;
    this.originalColor = options.color;
    this.color = options.color;
    this.isBouncable = options.bouncable;
    this.isDead = false;
    this.isClicked = false;
  }



  draw(ctx) {
    if (clickpos[0] > this.pos[0] && clickpos[0] < this.pos[0] + this.width + 60 &&
      clickpos[1] > this.pos[1] - 5 && clickpos[1] < this.pos[1] + 60
    ) {
      this.isClicked = true;
      this.color = '#f80aff';
    } else if (!this.isDead){
      this.isClicked = false;
      this.color = this.originalColor;
    } else {
      this.color = 'gray';
    }
    ctx.beginPath();
    if (this.isDead) {
      ctx.drawImage(deadjelly, 0, 130, 130, 125, this.pos[0], this.pos[1], this.width*2, this.height*2);
    }
    else if (this.vel[1] >= -4.5 && this.vel[1] <= -2) {
      ctx.drawImage(jellyfishimage, 554, 0, 50, 120, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > -2 && this.vel[1] <= -1.5) {
      ctx.drawImage(jellyfishimage, 24, 140, 68, 75, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > -1.5 && this.vel[1] <= 0.3) {
      ctx.drawImage(jellyfishimage, 150, 162, 80, 40, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > -0.3 && this.vel[1] <= 0.7) {
      ctx.drawImage(jellyfishimage, 279, 174, 87, 56, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > 0.7 && this.vel[1] <= 1.3) {
      ctx.drawImage(jellyfishimage, 411, 174, 90, 70, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > 1.3 && this.vel[1] <= 2) {
      ctx.drawImage(jellyfishimage, 16, 55, 90, 75, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > 2 && this.vel[1] <= 2.7) {
      ctx.drawImage(jellyfishimage, 157, 52, 70, 78, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > 2.7 && this.vel[1] <= 3.3) {
      ctx.drawImage(jellyfishimage, 293, 44, 55, 85, this.pos[0], this.pos[1], this.width*2, this.height*2);
    } else if (this.vel[1] > 3.3 && this.vel[1] <= 4.5) {
      ctx.drawImage(jellyfishimage, 428, 25, 44, 100, this.pos[0], this.pos[1], this.width*2, this.height*2);
    }




    ctx.closePath();
  }

  move(ctx) {
    if (this.isDead) {
      this.acc = [1,1];
      this.pos[1] += this.vel[1];
      this.vel[1] += this.acc[1];
    }
    else if (this.isClicked) {

    }
    else {
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
