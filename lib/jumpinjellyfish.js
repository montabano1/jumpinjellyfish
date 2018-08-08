const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const LevelZero = require("./level_zero");
const LevelOne = require("./level_one");
const LevelTwo = require("./level_two");
const LevelThree = require("./level_three");
const CongratsLevel = require("./congrats_level");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let levs = [
  new LevelZero(canvas, ctx),
  new LevelOne(canvas, ctx),
  new LevelTwo(canvas, ctx),
  new LevelThree(canvas, ctx),
  new CongratsLevel(canvas, ctx),
];
let hasDied = false;
let controls = false;
let directions = true;
let muted = false;
let bonus = false;
let lives = 3;
document.addEventListener("keypress", keyPressHandler, false);
document.addEventListener("click", clickhandler, false);
const tada = document.getElementById('tada');
const coral = document.getElementById('coral');
coral.loop = true;
coral.volume = 0.2;
const bounce = document.getElementById('bounce');
const lose = document.getElementById('lose');
const mutebutton = document.getElementById('mute-button');
mutebutton.addEventListener("click", mute, false);
function toggleHidden(arr) {
  for(let i = 0; i < arr.length; i++) {
    arr[i].classList.toggle('hidden');
  }
}
function mute() {
  muted = !muted;
  coral.muted = !coral.muted;
  bounce.muted = !bounce.muted;
  lose.muted = !lose.muted;
  mutebutton.blur();
  const mutes = document.getElementsByClassName('mute');
  toggleHidden(mutes);
}
const volumeControl = document.getElementById('vol-control');

volumeControl.addEventListener('change', function() {
    coral.volume = this.value / 100;
});
function keyPressHandler(e) {
  if(lives === 0 && e.keyCode === 13) {
    lives = 3;
    levs = [
      new LevelZero(canvas, ctx),
      new LevelOne(canvas, ctx),
      new LevelTwo(canvas, ctx),
      new LevelThree(canvas, ctx),
      new CongratsLevel(canvas, ctx),
    ];
  }
  if(e.keyCode === 114) {
    levs[0] = new levs[0].constructor(canvas, ctx);
  }
  if(e.keyCode === 119 || e.keyCode === 32) {
    e.preventDefault();
  }
  if(e.keyCode === 99) {
    controls = !controls;
  }
  if(e.keyCode === 98) {
    bonus = !bonus;
  }
  if(e.keyCode === 116) {
    directions = !directions;
  }
  if(directions && e.keyCode != 99 && e.keyCode != 98 && e.keyCode != 116) {
    coral.play();
    directions = false;
    bonus = false;
  }
  if(e.keyCode === 13 && levs[0].hero.won) {
    levs.shift();
    directions = !directions;
  }
  if (e.keyCode === 13 && levs[0].hero.isDead) {
    levs[0] = levs[0].restart(canvas, ctx);
    hasDied = false;
  }
}
function clickhandler() {
  if(levs[0].hero.isDead) {
    coral.play();
    levs[0] = levs[0].restart(canvas, ctx);
  }
  if(directions) {
    coral.play();
    directions = !directions;
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  ctx.font = "30px fantasy";
  ctx.fillStyle = 'black';
  ctx.fillText("Lives:", 840, 460);
  ctx.fillText(lives, 920, 460);
  if (!lives) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,960,640);
    ctx.font = "48px fantasy";
    ctx.fillStyle = 'pink';
    ctx.fillText("GAME OVER", 330, 260);
    ctx.font = "24px fantasy";
    ctx.fillText("Press enter to try again", 345, 320);
  } else {
    if(levs[0].hero.starting) {
      directions = true;
    }
    
    if (controls) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,960,640);
      ctx.font = "48px fantasy";
      ctx.fillStyle = 'pink';
      ctx.fillText("Controls", 200, 200);
      ctx.font = "24px fantasy";
      ctx.fillText('JUMP : W or UP Arrow', 200, 240);
      ctx.fillText('MOVE LEFT : A or LEFT Arrow', 200, 280);
      ctx.fillText('MOVE RIGHT : D or RIGHT Arrow', 200, 320);
      ctx.fillText('FREEZE JELLYFISH : Click on it', 200, 360);
      ctx.fillText('RESTART LEVEL : R', 200, 400);
      ctx.fillText('(Press c to continue)', 200, 140);
    } else {
      levs[0].draw(canvas, ctx);
      if (levs[0].hero.isDead && !levs[0].hero.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,960,640);
        ctx.font = "48px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("You DIED", 380, 260);
        ctx.font = "24px fantasy";
        ctx.fillText("Press  enter  to  try again", 380, 320);
        if (!hasDied) {
          lives--;
          hasDied = true;
        }
      }
      if (directions) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,960,640);
        ctx.font = "55px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("Tips", 420, 100);
        ctx.font = "40px fantasy";
        ctx.fillText(levs[0].directions[0], 400, 170);
        for(let i=1; i < levs[0].directions.length; i++) {
          ctx.fillText(levs[0].directions[i], 180, 170 + 60*i);
        }
        ctx.fillText('(Press enter or v to continue)', 250, 45);
      }
      if (bonus) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,960,640);
        ctx.font = "55px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("Bonus:", 420, 200);
        ctx.font = "40px fantasy";
        ctx.fillText(levs[0].challenge[0], 0, 270);
        ctx.fillText('(Press any key to continue)', 250, 45);
      }
      if (levs[0].hero.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,960,640);
        ctx.font = "48px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("You win", 400, 260);
        ctx.font = "24px fantasy";
        ctx.fillText("Press  enter  to  go  to  next  level", 320, 320);
        bonus = false;
      }
    }
  }
};

animate();
