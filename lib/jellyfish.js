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



class Jellyfish {
  constructor(options) {
    this.startingpos = options.pos;
    this.pos = options.pos;
    this.startingvel = options.vel;
    this.vel = options.vel;
    this.startingacc = options.acc;
    this.acc = options.acc;
    this.radius = options.radius;
    this.originalColor = options.color;
    this.color = options.color;
    this.isBouncable = options.bouncable;
    this.isDead = false;
    this.isClicked = false;
  }



  draw(ctx) {
    if (Util.dist(this.pos, clickpos) < this.radius) {
      this.isClicked = true;
      this.color = '#f80aff';
    } else if (!this.isDead){
      this.isClicked = false;
      this.color = this.originalColor;
    } else {
      this.color = 'gray';
    }
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(ctx) {
    if (this.isDead) {
      this.color = 'gray';
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
