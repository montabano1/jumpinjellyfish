const Util = require("./util");
const Jellyfish = require("./jellyfish");
const Hero = require("./hero");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



const j = new Jellyfish({ pos: [240, 200], vel: [0, 3], acc: -0.1, radius: 10, color: "green"});
const k = new Jellyfish({ pos: [300, 200], vel: [0, 2], acc: -0.1, radius: 10, color: "red"});
const hero = new Hero({pos: [20, 160], vel: 0, acc: 0, color: 'orange'});


const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  j.draw(ctx);
  j.move(ctx);
  k.draw(ctx);
  k.move(ctx);
  hero.draw(ctx);
  hero.move();
};

animate();
