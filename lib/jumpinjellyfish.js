const Jellyfish = require("./jellyfish");
const Hero = require("./hero");
const LevelZero = require("./level_zero");
const LevelOne = require("./level_one");
const LevelTwo = require("./level_two");
const LevelThree = require("./level_three");
const CongratsLevel = require("./congrats_level");
const BonusLevel = require("./bonus_level");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let i = 0;
let levs = [
  new LevelZero(canvas, ctx),
  new LevelOne(canvas, ctx),
  new LevelTwo(canvas, ctx),
  new LevelThree(canvas, ctx),
  new CongratsLevel(canvas, ctx),
  new BonusLevel(canvas, ctx),
];
let hasDied = false;
let controls = false;
let directions = true;
let muted = false;
let bonus = false;
let lives = 3;
let eggs = 0;
const openstar = new Image();
openstar.src = "assets/openstar.png";
const star = new Image();
star.src = "assets/star.png";
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
  tada.muted = !tada.muted;
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
      new BonusLevel(canvas, ctx),
    ];
  }
  if(e.keyCode === 114 && lives > 0) {
    levs[i] = new levs[i].constructor(canvas, ctx);
    lives --;
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
  if(e.keyCode === 13 && levs[i].hero.won) {
    i++;
    directions = !directions;
  }
  if (e.keyCode === 13 && levs[i].hero.isDead) {
    levs[i] = levs[i].restart(canvas, ctx);
    hasDied = false;
  }
}
function clickhandler() {
  if(levs[i].hero.isDead) {
    coral.play();
    levs[i] = levs[i].restart(canvas, ctx);
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
  for(let idx = 0; idx < 4; idx++) {
    if(levs[idx].easteregg) {
      ctx.drawImage(star, 780 + 40*idx, 10);
    } else {
      ctx.drawImage(openstar, 780+ 40*idx, 10);
    }
  }
  ctx.fillText("Lives:", 810, 440);
  ctx.fillText(lives, 890, 440);
  if (lives <= 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,960,640);
    ctx.font = "48px fantasy";
    ctx.fillStyle = 'pink';
    ctx.fillText("GAME OVER", 330, 260);
    ctx.font = "24px fantasy";
    ctx.fillText("Press enter to try again", 345, 320);
  } else {
    if(levs[i].hero.starting) {
      directions = true;
    }

    if (controls) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,960,640);
      ctx.font = "48px fantasy";
      ctx.fillStyle = 'pink';
      ctx.fillText("Controls", 200, 180);
      ctx.font = "24px fantasy";
      ctx.fillText('JUMP : W or UP Arrow', 200, 220);
      ctx.fillText('MOVE LEFT : A or LEFT Arrow', 200, 260);
      ctx.fillText('MOVE RIGHT : D or RIGHT Arrow', 200, 300);
      ctx.fillText('FREEZE JELLYFISH : Click on it', 200, 340);
      ctx.fillText('RESTART LEVEL : R (lose a life)', 200, 380);
      ctx.fillText('(Press c to continue)', 200, 120);
    } else {
      levs[i].draw(canvas, ctx);
      if (levs[i].hero.isDead && !levs[i].hero.won) {
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
      if (levs[i].eggfound === true) {
        levs[i].eggfound = false;
        eggs += 1;
      }
      if (directions) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,960,640);
        ctx.font = "55px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("Tips", 420, 100);
        ctx.font = "40px fantasy";
        ctx.fillText(levs[i].directions[0], 400, 170);
        for(let i=1; i < levs[i].directions.length; i++) {
          ctx.fillText(levs[i].directions[i], 180, 170 + 60*i);
        }
        ctx.fillText('(Press enter to continue)', 250, 45);
      }
      if (bonus) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,960,640);
        ctx.font = "55px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("Bonus:", 420, 200);
        ctx.font = "40px fantasy";
        ctx.fillText(levs[i].challenge[0], 0, 270);
        ctx.fillText('(Press any key to continue)', 250, 45);
      }
      if (levs[i].hero.won) {
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
