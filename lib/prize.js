const woman1 = new Image();
woman1.src = "assets/cavewoman/woman1.png";
const woman2 = new Image();
woman2.src = "assets/cavewoman/woman2.png";
const woman3 = new Image();
woman3.src = "assets/cavewoman/woman3.png";
const woman4 = new Image();
woman4.src = "assets/cavewoman/woman4.png";
const woman5 = new Image();
woman5.src = "assets/cavewoman/woman5.png";
const woman6 = new Image();
woman6.src = "assets/cavewoman/woman6.png";
const woman7 = new Image();
woman7.src = "assets/cavewoman/woman7.png";
const woman8 = new Image();
woman8.src = "assets/cavewoman/woman8.png";
let animations = new Array(80);
for (let i = 0; i < 80; i++) {
  if (i < 10) {animations[i] = woman1;}
  else if (i < 20) {animations[i] = woman2;}
  else if (i < 30) {animations[i] = woman3;}
  else if (i < 40) {animations[i] = woman4;}
  else if (i < 50) {animations[i] = woman5;}
  else if (i < 60) {animations[i] = woman6;}
  else if (i < 70) {animations[i] = woman7;}
  else if (i < 80) {animations[i] = woman8;}
}



class Prize {
  constructor (options) {
    this.pos = options.pos;
  }

  draw(ctx, hero) {
    ctx.beginPath();
    if (hero.won) {
      ctx.drawImage(animations[0], this.pos[0], this.pos[1], 40, 100);
      animations = animations.slice(1).concat(animations[0]);
    } else {
      ctx.drawImage(animations[79], this.pos[0], this.pos[1], 40, 100);
    }
    ctx.closePath();
  }
}

module.exports = Prize;
