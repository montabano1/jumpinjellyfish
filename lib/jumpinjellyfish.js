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

function keyPressHandler(e) {
  if(e.keyCode === 13) {
    levs.shift();
    document.removeEventListener("keypress", keyPressHandler, false);

  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  levs[0].draw(canvas, ctx);
  if (levs[0].hero.isDead) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,960,640);
    ctx.font = "48px fantasy";
    ctx.fillStyle = 'pink';
    ctx.fillText("You DIED", 400, 260);
    return;
  }
  if (levs[0].hero.won) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,960,640);
    ctx.font = "48px fantasy";
    ctx.fillStyle = 'pink';
    ctx.fillText("You win", 400, 260);
    ctx.font = "24px fantasy";
    ctx.fillText("Press  enter  to  go  to  next  level", 320, 320);
    document.addEventListener("keypress", keyPressHandler, false);
  }
};

animate();
