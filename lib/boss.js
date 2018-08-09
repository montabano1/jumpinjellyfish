const jellyfishimage = new Image();
jellyfishimage.src = "assets/jellyfish.png";
const deadjelly = new Image();
deadjelly.src = "assets/dead.png";



class Boss {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.acc = options.acc;
    this.radius = options.radius;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.isBouncable = true;
    this.isDead = false;
    this.type = 'boss';
    this.left = true;
    this.hits = 7;
    this.justhit = false;
    this.bottoms = 0;
    this.children = false;
    this.start = true;
  }



  draw(ctx) {
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
    if (this.hits === 0) {
      this.isDead = true;
      this.vel[0] = 0;
      this.acc = [0,1];
      this.pos[1] += this.vel[1];
      this.vel[1] += this.acc[1];
    }
    if (this.justhit) {
      this.start = false;
      this.isBouncable = false;
      this.justhit = false;
      this.hits--;
      if (this.pos[0] < 480) {
        this.vel[0] = 4.7;
      } else {
        this.vel[0] = -4.7;
      }
      this.children = true;
    }
    else {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      this.vel[0] += this.acc[0];
      this.vel[1] += this.acc[1];
      if (Math.abs(this.vel[0]) === 4.7 && (this.pos[0] > 600 || this.pos[0] < 150)) {
        this.vel[0] = 0;
        this.isBouncable = true;
      }
      if (Math.abs(this.vel[1]) > 4) {
        this.acc[1] *= -1;
        this.bottoms += 1;
        if (this.bottoms % 6 === 1) {
          this.children = true;
        }
      }
    }
  }
}


module.exports = Boss;
