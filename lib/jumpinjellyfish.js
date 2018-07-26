const Util = require("./util");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const LevelOne = require("./level_one");
const LevelTwo = require("./level_two");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



const lev = new LevelTwo(canvas, ctx);

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  lev.draw(canvas, ctx);
};

animate();
