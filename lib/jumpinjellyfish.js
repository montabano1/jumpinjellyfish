const Util = require("./util");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const LevelOne = require("./level_one");
const LevelTwo = require("./level_two");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const levs = [
  new LevelOne(canvas, ctx),
  new LevelTwo(canvas, ctx)
];
let controls = false;
document.addEventListener("keypress", keyPressHandler, false);

function keyPressHandler(e) {
  if(e.keyCode === 99) {
    controls = !controls;
  }
  if(e.keyCode === 13 && levs[0].hero.won) {
    levs.shift();

  }
  if (e.keyCode === 13 && levs[0].hero.isDead) {
    levs[0].hero.isDead = false;
    levs[0].hero.color = 'orange';
    levs[0].hero.acc = 0.1;
    levs[0].hero.vel = 0.1;
    levs[0].hero.pos = [5,5];
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  if (controls) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,960,640);
    ctx.font = "48px fantasy";
    ctx.fillStyle = 'pink';
    ctx.fillText("Controls", 380, 260);
    ctx.font = "24px fantasy";
    ctx.fillText('controlsssss', 380, 320);
  } else {
    levs[0].draw(canvas, ctx);
    if (levs[0].hero.isDead) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,960,640);
      ctx.font = "48px fantasy";
      ctx.fillStyle = 'pink';
      ctx.fillText("You DIED", 400, 260);
      ctx.font = "24px fantasy";
      ctx.fillText("Press  enter  to  try again", 320, 320);
    }
    if (levs[0].hero.won) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,960,640);
      ctx.font = "48px fantasy";
      ctx.fillStyle = 'pink';
      ctx.fillText("You win", 400, 260);
      ctx.font = "24px fantasy";
      ctx.fillText("Press  enter  to  go  to  next  level", 320, 320);
    }
  }
};

animate();
