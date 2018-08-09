/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/jumpinjellyfish.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/bonus_level.js":
/*!****************************!*\
  !*** ./lib/bonus_level.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = __webpack_require__(/*! ./platform */ "./lib/platform.js");
var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");

var BonusLevel = function () {
  function BonusLevel(canvas, ctx) {
    _classCallCheck(this, BonusLevel);

    this.ctx = ctx;
    this.directions = ["Good Luck"];
    this.platforms = [new Platform({ padding: 0.1, pos: [100, canvas.height - 135], height: 30, width: canvas.width - 200, type: 'start' }), new Platform({ padding: 0.1, pos: [0, 100], height: 30, width: 100, type: 'start' }), new Platform({ padding: 0.1, pos: [0, 250], height: 30, width: 100, type: 'start' }), new Platform({ padding: 0.1, pos: [canvas.width - 100, 105], height: 30, width: 100, type: 'start' }), new Platform({ padding: 0.1, pos: [canvas.width - 100, 225], height: 30, width: 100, type: 'start' })];
    this.jellyfish = [];
    this.hero = new Hero({ pos: [20, 100], vel: [0, 0], color: 'orange', height: 100, width: 40 });
  }

  _createClass(BonusLevel, [{
    key: "restart",
    value: function restart(canvas, ctx) {}
  }, {
    key: "draw",
    value: function draw(canvas, ctx) {
      var hero = this.hero;
      hero.draw(ctx);
      this.platforms.forEach(function (plat) {
        ctx.beginPath();
        ctx.rect(plat.pos[0], plat.pos[1], plat.width, plat.height);
        ctx.fillStyle = '#86592d';
        ctx.fill();
        ctx.closePath();
        hero.moveOnPlatform(plat);
      });
      this.jellyfish.forEach(function (jel) {
        jel.draw(ctx);
        jel.move();
        hero.bounceOffJellyfish(jel);
        hero.killedByJellyfish(jel);
      });
      hero.move(canvas);
    }
  }]);

  return BonusLevel;
}();

module.exports = BonusLevel;

/***/ }),

/***/ "./lib/congrats_level.js":
/*!*******************************!*\
  !*** ./lib/congrats_level.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = __webpack_require__(/*! ./platform */ "./lib/platform.js");
var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");

var CongratsLevel = function () {
  function CongratsLevel(canvas, ctx) {
    _classCallCheck(this, CongratsLevel);

    this.ctx = ctx;
    this.directions = ["YOU WIN"];
    this.platforms = [new Platform({ padding: 0.1, pos: [0, 225], height: 30, width: canvas.width, type: 'start' })];
    this.jellyfish = [];
    this.hero = new Hero({ pos: [20, 100], vel: [0, 0], color: 'orange', height: 100, width: 40 });
  }

  _createClass(CongratsLevel, [{
    key: "restart",
    value: function restart(canvas, ctx) {
      return new CongratsLevel(canvas, ctx);
    }
  }, {
    key: "draw",
    value: function draw(canvas, ctx) {
      var hero = this.hero;
      hero.draw(ctx);
      this.platforms.forEach(function (plat) {
        ctx.beginPath();
        ctx.rect(plat.pos[0], plat.pos[1], plat.width, plat.height);
        ctx.fillStyle = '#86592d';
        ctx.fill();
        ctx.closePath();
        hero.moveOnPlatform(plat);
      });
      this.jellyfish.forEach(function (jel) {
        jel.draw(ctx);
        jel.move();
        hero.bounceOffJellyfish(jel);
        hero.killedByJellyfish(jel);
      });
      hero.move(canvas);
      ctx.font = "96px fantasy";
      ctx.fillStyle = 'orange';
      ctx.fillText("YOU WIN", 600 - hero.pos[0], 400);
    }
  }]);

  return CongratsLevel;
}();

module.exports = CongratsLevel;

/***/ }),

/***/ "./lib/hero.js":
/*!*********************!*\
  !*** ./lib/hero.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var lastkeypressed = 'right';

var jim = new Image();
jim.src = "assets/hero.png";
var mij = new Image();
mij.src = "assets/heroback.png";
var bounce = document.getElementById('bounce');
bounce.volume = 0.2;
var coral = document.getElementById('coral');
var lose = document.getElementById('lose');
lose.volume = 0.2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyPressHandler, false);
function keyDownHandler(e) {
  if (e.keyCode == 39 || e.keyCode === 68) {
    rightPressed = true;
    lastkeypressed = 'right';
  } else if (e.keyCode == 37 || e.keyCode === 65) {
    leftPressed = true;
    lastkeypressed = 'left';
  } else if (e.keyCode == 38) {
    e.preventDefault();
    upPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    rightPressed = false;
  } else if (e.keyCode === 37 || e.keyCode === 65) {
    leftPressed = false;
  }
}
function keyPressHandler(e) {
  if (e.keyCode === 119 || e.keyCode === 32 || e.keyCode === 38) {
    e.preventDefault();
    upPressed = true;
  }
}

var Hero = function () {
  function Hero(options) {
    _classCallCheck(this, Hero);

    this.pos = options.pos;
    this.vel = options.vel;
    this.acc = [0, 0.2];
    this.height = options.height;
    this.width = options.width;
    this.game = options.game;
    this.isDead = false;
    this.midjump = false;
    this.onPlatform = false;
    this.won = false;
    this.starting = true;
    this.lands = 0;
    this.lastJumpPos = 0;
  }

  _createClass(Hero, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      if (this.won) {
        ctx.drawImage(jim, 193, 260, 95, 110, this.pos[0], this.pos[1], this.width, this.height);
      } else if (this.midjump && lastkeypressed === 'right') {
        ctx.drawImage(jim, 193, 260, 115, 130, this.pos[0], this.pos[1], this.width, this.height);
      } else if (lastkeypressed === 'left' && this.midjump) {
        ctx.drawImage(mij, 0, 260, 95, 120, this.pos[0], this.pos[1], this.width, this.height);
      } else if (lastkeypressed === 'left') {
        if (this.pos[0] % 78 < 13) {
          ctx.drawImage(mij, 193, 2, 92, 116, this.pos[0], this.pos[1], this.width, this.height);
        } else if (this.pos[0] % 78 < 26) {
          ctx.drawImage(mij, 97, 2, 92, 116, this.pos[0], this.pos[1], this.width, this.height);
        } else if (this.pos[0] % 78 < 39) {
          ctx.drawImage(mij, 10, 12, 92, 116, this.pos[0], this.pos[1], this.width, this.height);
        } else if (this.pos[0] % 78 < 52) {
          ctx.drawImage(mij, 193, 122, 95, 130, this.pos[0], this.pos[1], this.width, this.height);
        } else if (this.pos[0] % 78 < 65) {
          ctx.drawImage(mij, 97, 126, 92, 125, this.pos[0], this.pos[1], this.width, this.height);
        } else {
          ctx.drawImage(mij, 15, 126, 92, 130, this.pos[0], this.pos[1], this.width, this.height);
        }
      } else if (this.pos[0] % 78 < 13) {
        ctx.drawImage(jim, 0, 2, 92, 116, this.pos[0], this.pos[1], this.width, this.height);
      } else if (this.pos[0] % 78 < 26) {
        ctx.drawImage(jim, 100, 2, 92, 116, this.pos[0], this.pos[1], this.width, this.height);
      } else if (this.pos[0] % 78 < 39) {
        ctx.drawImage(jim, 190, 12, 92, 116, this.pos[0], this.pos[1], this.width, this.height);
      } else if (this.pos[0] % 78 < 52) {
        ctx.drawImage(jim, 0, 122, 95, 130, this.pos[0], this.pos[1], this.width, this.height);
      } else if (this.pos[0] % 78 < 65) {
        ctx.drawImage(jim, 100, 126, 92, 125, this.pos[0], this.pos[1], this.width, this.height);
      } else {
        ctx.drawImage(jim, 190, 126, 92, 130, this.pos[0], this.pos[1], this.width, this.height);
      }
      ctx.closePath();
    }
  }, {
    key: "bounceOffJellyfish",
    value: function bounceOffJellyfish(jellyfish) {
      if (!this.isDead && jellyfish.isBouncable && this.pos[1] + this.height > jellyfish.pos[1] + 5 && this.pos[1] + this.height < jellyfish.pos[1] + 80 && this.pos[0] > jellyfish.pos[0] - 15 && this.pos[0] < jellyfish.pos[0] + 60) {
        bounce.play();
        this.vel = [0, -5];
        this.acc = [0, 0.1];
        jellyfish.isDead = true;
        this.onPlatform = false;
      }
    }
  }, {
    key: "killedByJellyfish",
    value: function killedByJellyfish(jellyfish) {
      if (this.pos[0] > jellyfish.pos[0] - 27 && this.pos[0] < jellyfish.pos[0] + 65 && this.pos[1] + this.height > jellyfish.pos[1] + 80 && this.pos[1] < jellyfish.pos[1] + jellyfish.height + 40) {
        if (!this.isDead && !this.won) {
          coral.pause();
          lose.play();
          this.isDead = true;
          this.lands = 0;
        }
      }
    }
  }, {
    key: "moveOnPlatform",
    value: function moveOnPlatform(platform) {
      if (this.pos[1] + this.height >= platform.pos[1] + platform.padding - 5 && this.pos[1] + this.height <= platform.pos[1] + platform.padding + 10 && this.pos[0] < platform.pos[0] + platform.width && this.pos[0] + this.width > platform.pos[0] && this.vel[1] > 0) {
        if (platform.type === 'finish') {
          this.won = true;
        } else {
          this.lastJumpPos = this.pos[0];
        }
        this.starting = false;
        this.onPlatform = true;
        this.lands++;
        this.midjump = false;
        this.pos[1] = platform.pos[1] - this.height;
        this.vel = [0, 0];
        this.acc = [0, 0.1];
        document.addEventListener("keypress", keyPressHandler, false);
      }
    }
  }, {
    key: "move",
    value: function move(canvas) {
      if (this.pos[1] > canvas.height && !this.isDead && !this.won) {
        coral.pause();
        lose.play();
        this.isDead = true;
        this.lands = 0;
      }
      if (this.isDead) {
        this.color = 'green';
      } else {
        if (this.pos[0] < 3 && this.pos[0] > 0) {
          this.pos[0] = 3;
        }
        if (this.pos[0] + this.width > canvas.width - 3 && this.pos[0] + this.width < canvas.width) {
          this.pos[0] = canvas.width - this.width - 3;
        }
        this.pos[1] += this.vel[1];
        this.vel[1] += this.acc[1];

        if (rightPressed) {
          this.pos[0] += 2;
        } else if (leftPressed) {
          this.pos[0] -= 2;
        }
        if (upPressed && !this.midjump && this.vel[1] < 0.3) {
          this.onPlatform = false;
          this.vel = [0, -5];
          this.acc = [0, 0.1];
          upPressed = false;
          this.midjump = true;
          document.removeEventListener("keypress", keyPressHandler, false);
        }
      }
    }
  }]);

  return Hero;
}();

module.exports = Hero;

/***/ }),

/***/ "./lib/jellyfish.js":
/*!**************************!*\
  !*** ./lib/jellyfish.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('myCanvas');
var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;
var clickpos = [1000, 1000];
canvas.addEventListener('mousedown', function (event) {
  var x = event.pageX - canvasLeft;
  var y = event.pageY - canvasTop;
  clickpos = [x, y];
  canvas.addEventListener('mouseup', function () {
    clickpos = [1000, 1000];
  }, false);
}, false);
var jellyfishimage = new Image();
jellyfishimage.src = "assets/jellyfish.png";
var deadjelly = new Image();
deadjelly.src = "assets/dead.png";

var Jellyfish = function () {
  function Jellyfish(options) {
    _classCallCheck(this, Jellyfish);

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

  _createClass(Jellyfish, [{
    key: 'draw',
    value: function draw(ctx) {
      if (clickpos[0] > this.pos[0] && clickpos[0] < this.pos[0] + this.width + 60 && clickpos[1] > this.pos[1] - 5 && clickpos[1] < this.pos[1] + 60) {
        this.isClicked = true;
        this.color = '#f80aff';
      } else if (!this.isDead) {
        this.isClicked = false;
        this.color = this.originalColor;
      } else {
        this.color = 'gray';
      }
      ctx.beginPath();
      if (this.isDead) {
        ctx.drawImage(deadjelly, 0, 130, 130, 125, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] >= -4.5 && this.vel[1] <= -2) {
        ctx.drawImage(jellyfishimage, 554, 0, 50, 120, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > -2 && this.vel[1] <= -1.5) {
        ctx.drawImage(jellyfishimage, 24, 140, 68, 75, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > -1.5 && this.vel[1] <= 0.3) {
        ctx.drawImage(jellyfishimage, 150, 162, 80, 40, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > -0.3 && this.vel[1] <= 0.7) {
        ctx.drawImage(jellyfishimage, 279, 174, 87, 56, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > 0.7 && this.vel[1] <= 1.3) {
        ctx.drawImage(jellyfishimage, 411, 174, 90, 70, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > 1.3 && this.vel[1] <= 2) {
        ctx.drawImage(jellyfishimage, 16, 55, 90, 75, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > 2 && this.vel[1] <= 2.7) {
        ctx.drawImage(jellyfishimage, 157, 52, 70, 78, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > 2.7 && this.vel[1] <= 3.3) {
        ctx.drawImage(jellyfishimage, 293, 44, 55, 85, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      } else if (this.vel[1] > 3.3 && this.vel[1] <= 4.5) {
        ctx.drawImage(jellyfishimage, 428, 25, 44, 100, this.pos[0], this.pos[1], this.width * 2, this.height * 2);
      }

      ctx.closePath();
    }
  }, {
    key: 'move',
    value: function move(ctx) {
      if (this.isDead) {
        this.acc = [1, 1];
        this.pos[1] += this.vel[1];
        this.vel[1] += this.acc[1];
      } else if (this.isClicked) {} else {
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
  }]);

  return Jellyfish;
}();

module.exports = Jellyfish;

/***/ }),

/***/ "./lib/jumpinjellyfish.js":
/*!********************************!*\
  !*** ./lib/jumpinjellyfish.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");
var LevelZero = __webpack_require__(/*! ./level_zero */ "./lib/level_zero.js");
var LevelOne = __webpack_require__(/*! ./level_one */ "./lib/level_one.js");
var LevelTwo = __webpack_require__(/*! ./level_two */ "./lib/level_two.js");
var LevelThree = __webpack_require__(/*! ./level_three */ "./lib/level_three.js");
var CongratsLevel = __webpack_require__(/*! ./congrats_level */ "./lib/congrats_level.js");
var BonusLevel = __webpack_require__(/*! ./bonus_level */ "./lib/bonus_level.js");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var i = 0;
var levs = [new LevelZero(canvas, ctx), new LevelOne(canvas, ctx), new LevelTwo(canvas, ctx), new LevelThree(canvas, ctx), new CongratsLevel(canvas, ctx)];
var hasDied = false;
var controls = false;
var directions = true;
var muted = false;
var bonus = false;
var lives = 3;
var eggs = 0;
var bonuslevel = false;
var openstar = new Image();
openstar.src = "assets/openstar.png";
var star = new Image();
star.src = "assets/star.png";
document.addEventListener("keypress", keyPressHandler, false);
document.addEventListener("click", clickhandler, false);
var tada = document.getElementById('tada');
var coral = document.getElementById('coral');
coral.loop = true;
coral.volume = 0.2;
var bounce = document.getElementById('bounce');
var lose = document.getElementById('lose');
var mutebutton = document.getElementById('mute-button');
mutebutton.addEventListener("click", mute, false);
function toggleHidden(arr) {
  for (var _i = 0; _i < arr.length; _i++) {
    arr[_i].classList.toggle('hidden');
  }
}
function mute() {
  muted = !muted;
  coral.muted = !coral.muted;
  bounce.muted = !bounce.muted;
  lose.muted = !lose.muted;
  tada.muted = !tada.muted;
  mutebutton.blur();
  var mutes = document.getElementsByClassName('mute');
  toggleHidden(mutes);
}
var volumeControl = document.getElementById('vol-control');

volumeControl.addEventListener('change', function () {
  coral.volume = this.value / 100;
});
function keyPressHandler(e) {
  if (lives === 0 && e.keyCode === 13) {
    lives = 3;
    levs = [new LevelZero(canvas, ctx), new LevelOne(canvas, ctx), new LevelTwo(canvas, ctx), new LevelThree(canvas, ctx), new CongratsLevel(canvas, ctx)];
  }
  if (e.keyCode === 114 && lives > 0) {
    levs[i] = new levs[i].constructor(canvas, ctx);
    lives--;
  }
  if (e.keyCode === 119 || e.keyCode === 32) {
    e.preventDefault();
  }
  if (e.keyCode === 99) {
    controls = !controls;
  }
  if (e.keyCode === 98) {
    bonus = !bonus;
  }
  if (e.keyCode === 116) {
    directions = !directions;
  }
  if (directions && e.keyCode != 99 && e.keyCode != 98 && e.keyCode != 116) {
    coral.play();
    directions = false;
    bonus = false;
  }
  if (e.keyCode === 13 && levs[i].hero.won) {
    i++;
    directions = !directions;
  }
  if (e.keyCode === 13 && levs[i].hero.isDead) {
    levs[i] = levs[i].restart(canvas, ctx);
    hasDied = false;
  }
}
function clickhandler() {
  if (levs[i].hero.isDead) {
    coral.play();
    levs[i] = levs[i].restart(canvas, ctx);
  }
  if (directions) {
    coral.play();
    directions = !directions;
  }
}

var animate = function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  ctx.font = "30px fantasy";
  ctx.fillStyle = 'black';
  for (var idx = 0; idx < 4; idx++) {
    if (levs[idx].easteregg) {
      ctx.drawImage(star, 780 + 40 * idx, 10);
    } else {
      ctx.drawImage(openstar, 780 + 40 * idx, 10);
    }
  }
  ctx.fillText("Lives:", 810, 440);
  ctx.fillText(lives, 890, 440);
  if (lives <= 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 960, 640);
    ctx.font = "48px fantasy";
    ctx.fillStyle = 'pink';
    ctx.fillText("GAME OVER", 330, 260);
    ctx.font = "24px fantasy";
    ctx.fillText("Press enter to try again", 345, 320);
  } else {
    if (levs[i].hero.starting) {
      directions = true;
    }

    if (controls) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, 960, 640);
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
        ctx.fillRect(0, 0, 960, 640);
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
        ctx.fillRect(0, 0, 960, 640);
        ctx.font = "55px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("Tips", 420, 100);
        ctx.font = "40px fantasy";
        ctx.fillText(levs[i].directions[0], 400, 170);
        for (var _i2 = 1; _i2 < levs[_i2].directions.length; _i2++) {
          ctx.fillText(levs[_i2].directions[_i2], 180, 170 + 60 * _i2);
        }
        ctx.fillText('(Press enter to continue)', 250, 45);
      }
      if (bonus) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, 960, 640);
        ctx.font = "55px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("Bonus:", 420, 200);
        ctx.font = "40px fantasy";
        ctx.fillText(levs[i].challenge[0], 0, 270);
        ctx.fillText('(Press any key to continue)', 250, 45);
      }
      if (levs[i].hero.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, 960, 640);
        ctx.font = "48px fantasy";
        ctx.fillStyle = 'pink';
        ctx.fillText("You win", 400, 260);
        ctx.font = "24px fantasy";
        ctx.fillText("Press  enter  to  go  to  next  level", 320, 320);
        bonus = false;
      }
      if (eggs === 4 && bonuslevel === false) {
        bonuslevel = true;
        levs[4] = new BonusLevel(canvas, ctx);
      }
      window.hero = levs[i].hero;
    }
  }
};

animate();

/***/ }),

/***/ "./lib/level_one.js":
/*!**************************!*\
  !*** ./lib/level_one.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = __webpack_require__(/*! ./platform */ "./lib/platform.js");
var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");
var Prize = __webpack_require__(/*! ./prize */ "./lib/prize.js");
var tada = document.getElementById('tada');
tada.volume = 0.5;

var LevelOne = function () {
  function LevelOne(canvas, ctx) {
    _classCallCheck(this, LevelOne);

    this.ctx = ctx;
    this.directions = ["LEVEL 1:", "You may bounce off the top of the", "jellyfish but don't hit their stingers!"];
    this.challenge = ['              Kill all jellyfish on your FIRST jump and win'];
    this.platforms = [new Platform({ padding: 0.1, pos: [0, 225], height: 30, width: 550, type: 'start' }), new Platform({ padding: 0.1, pos: [canvas.width - 75, 225], height: 30, width: 375, type: 'finish' })];
    this.jellyfish = [new Jellyfish({ pos: [240, 60], vel: [0, 3], acc: [0, -0.1], width: 40, height: 40, bouncable: true }), new Jellyfish({ pos: [480, 250], vel: [0, -3], acc: [0, 0.1], width: 40, height: 40, bouncable: true }), new Jellyfish({ pos: [720, 300], vel: [0, 3], acc: [0, -0.1], width: 40, height: 40, bouncable: true })];
    this.hero = new Hero({ pos: [20, 100], vel: [0, 0], color: 'orange', height: 100, width: 40 });
    this.prize = new Prize({ pos: [900, 135] });
    this.easteregg = false;
    this.eggfound = false;
  }

  _createClass(LevelOne, [{
    key: "restart",
    value: function restart(canvas, ctx) {
      return new LevelOne(canvas, ctx);
    }
  }, {
    key: "draw",
    value: function draw(canvas, ctx) {
      var hero = this.hero;
      hero.draw(ctx);
      this.platforms.forEach(function (plat) {
        ctx.beginPath();
        ctx.rect(plat.pos[0], plat.pos[1], plat.width, plat.height);
        ctx.fillStyle = '#86592d';
        ctx.fill();
        ctx.closePath();
        hero.moveOnPlatform(plat);
      });
      this.jellyfish.forEach(function (jel) {
        jel.draw(ctx);
        jel.move();
        hero.bounceOffJellyfish(jel);
        hero.killedByJellyfish(jel);
      });

      hero.move(canvas);
      this.prize.draw(ctx, hero);
      if (hero.won) {
        if (this.jellyfish[0].isDead && this.jellyfish[1].isDead && this.jellyfish[2].isDead && hero.lastJumpPos < 480 && hero.won && !this.easteregg) {
          tada.play();
          this.easteregg = true;
          this.eggfound = true;
        }
      }
    }
  }]);

  return LevelOne;
}();

module.exports = LevelOne;

/***/ }),

/***/ "./lib/level_three.js":
/*!****************************!*\
  !*** ./lib/level_three.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = __webpack_require__(/*! ./platform */ "./lib/platform.js");
var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");
var Prize = __webpack_require__(/*! ./prize */ "./lib/prize.js");
var tada = document.getElementById('tada');
tada.volume = 0.5;

var LevelThree = function () {
  function LevelThree(canvas, ctx) {
    _classCallCheck(this, LevelThree);

    this.ctx = ctx;
    this.directions = ['LEVEL 3:', 'Use all of your skills to beat the', '                       final stage!'];
    this.challenge = ['                   Win without landing on first platform'];
    this.platforms = [new Platform({ padding: 0.1, pos: [0, 425], height: 30, width: 150, type: 'start' }), new Platform({ padding: 0.1, pos: [canvas.width - 150, 225], height: 30, width: 150, type: 'finish' })];
    this.jellyfish = [new Jellyfish({ pos: [340, 330], vel: [2, -2], acc: [-0.1, -0.1], width: 40, height: 40, bouncable: true }), new Jellyfish({ pos: [480, 280], vel: [-2, -2], acc: [0.1, -0.1], width: 40, height: 40, bouncable: true }), new Jellyfish({ pos: [660, 230], vel: [2, -2], acc: [-0.1, -0.1], width: 40, height: 40, bouncable: true })];
    this.hero = new Hero({ pos: [20, 100], vel: [0, 0], color: 'orange', height: 100, width: 40 });
    this.prize = new Prize({ pos: [900, 135] });
    this.easteregg = false;
    this.eggfound = false;
  }

  _createClass(LevelThree, [{
    key: "restart",
    value: function restart(canvas, ctx) {
      return new LevelThree(canvas, ctx);
    }
  }, {
    key: "draw",
    value: function draw(canvas, ctx) {
      var hero = this.hero;
      hero.draw(ctx);
      this.platforms.forEach(function (plat) {
        ctx.beginPath();
        ctx.rect(plat.pos[0], plat.pos[1], plat.width, plat.height);
        ctx.fillStyle = '#86592d';
        ctx.fill();
        ctx.closePath();
        hero.moveOnPlatform(plat);
      });
      this.jellyfish.forEach(function (jel) {
        jel.draw(ctx);
        jel.move();
        hero.bounceOffJellyfish(jel);
        hero.killedByJellyfish(jel);
      });
      hero.move(canvas);
      this.prize.draw(ctx, hero);
      if (hero.won && hero.lands === 1 && !this.easteregg) {
        tada.play();
        this.easteregg = true;
        this.eggfound = true;
      }
    }
  }]);

  return LevelThree;
}();

module.exports = LevelThree;

/***/ }),

/***/ "./lib/level_two.js":
/*!**************************!*\
  !*** ./lib/level_two.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = __webpack_require__(/*! ./platform */ "./lib/platform.js");
var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");
var Prize = __webpack_require__(/*! ./prize */ "./lib/prize.js");
var tada = document.getElementById('tada');
tada.volume = 0.5;

var LevelTwo = function () {
  function LevelTwo(canvas, ctx) {
    _classCallCheck(this, LevelTwo);

    this.ctx = ctx;
    this.directions = ['LEVEL 2:', 'Use the mouse to click and hold on', 'to a jellyfish to freeze it in place'];
    this.challenge = ['                      Win by killing ONLY two jellyfish'];
    this.platforms = [new Platform({ padding: 0.1, pos: [0, 225], height: 30, width: 150, type: 'start' }), new Platform({ padding: 0.1, pos: [canvas.width - 150, 225], height: 30, width: 150, type: 'finish' })];
    this.jellyfish = [new Jellyfish({ pos: [340, 300], vel: [2, 2], acc: [-0.1, -0.1], width: 40, height: 40, bouncable: true }), new Jellyfish({ pos: [340, 100], vel: [-2, -2], acc: [0.1, 0.1], width: 40, height: 40, bouncable: true }), new Jellyfish({ pos: [700, 300], vel: [2, 2], acc: [-0.1, -0.1], width: 40, height: 40, bouncable: true })];
    this.hero = new Hero({ pos: [20, 100], vel: [0, 0], color: 'orange', height: 100, width: 40 });
    this.prize = new Prize({ pos: [900, 135] });
    this.easteregg = false;
    this.eggfound = false;
  }

  _createClass(LevelTwo, [{
    key: "restart",
    value: function restart(canvas, ctx) {
      return new LevelTwo(canvas, ctx);
    }
  }, {
    key: "draw",
    value: function draw(canvas, ctx) {
      var hero = this.hero;
      hero.draw(ctx);
      this.platforms.forEach(function (plat) {
        ctx.beginPath();
        ctx.rect(plat.pos[0], plat.pos[1], plat.width, plat.height);
        ctx.fillStyle = '#86592d';
        ctx.fill();
        ctx.closePath();
        hero.moveOnPlatform(plat);
      });
      this.jellyfish.forEach(function (jel) {
        jel.draw(ctx);
        jel.move();
        hero.bounceOffJellyfish(jel);
        hero.killedByJellyfish(jel);
      });
      hero.move(canvas);
      this.prize.draw(ctx, hero);
      if (!this.jellyfish[0].isDead && hero.won && !this.easteregg) {
        tada.play();
        this.easteregg = true;
        this.eggfound = true;
      }
    }
  }]);

  return LevelTwo;
}();

module.exports = LevelTwo;

/***/ }),

/***/ "./lib/level_zero.js":
/*!***************************!*\
  !*** ./lib/level_zero.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = __webpack_require__(/*! ./platform */ "./lib/platform.js");
var Jellyfish = __webpack_require__(/*! ./jellyfish */ "./lib/jellyfish.js");
var Hero = __webpack_require__(/*! ./hero */ "./lib/hero.js");
var Prize = __webpack_require__(/*! ./prize */ "./lib/prize.js");
var tada = document.getElementById('tada');
tada.volume = 0.5;

var LevelZero = function () {
  function LevelZero(canvas, ctx) {
    _classCallCheck(this, LevelZero);

    this.ctx = ctx;
    this.directions = ["LEVEL 0:", "Use A or the Left arrow to move LEFT.", "Use D or the Right arrow to move RIGHT.", "Use W or the spacebar to JUMP.", "Try to get to the other platform!"];
    this.challenge = ['                          Jump higher than the screen'];
    this.platforms = [new Platform({ padding: 0.1, pos: [0, 225], height: 30, width: canvas.width / 2 - 70, type: 'start' }), new Platform({ padding: 0.1, pos: [canvas.width / 2 + 70, 225], height: 30, width: 575, type: 'finish' })];
    this.jellyfish = [];
    this.hero = new Hero({ pos: [20, 100], vel: [0, 0], color: 'orange', height: 100, width: 40 });
    this.prize = new Prize({ pos: [700, 135] });
    this.easteregg = false;
    this.eggfound = false;
  }

  _createClass(LevelZero, [{
    key: "restart",
    value: function restart(canvas, ctx) {
      return new LevelZero(canvas, ctx);
    }
  }, {
    key: "draw",
    value: function draw(canvas, ctx) {
      var hero = this.hero;

      hero.draw(ctx);
      this.platforms.forEach(function (plat) {
        ctx.beginPath();
        ctx.rect(plat.pos[0], plat.pos[1], plat.width, plat.height);
        ctx.fillStyle = '#86592d';
        ctx.fill();
        ctx.closePath();
        hero.moveOnPlatform(plat);
      });
      this.jellyfish.forEach(function (jel) {
        jel.draw(ctx);
        jel.move();
        hero.bounceOffJellyfish(jel);
        hero.killedByJellyfish(jel);
      });
      hero.move(canvas);
      this.prize.draw(ctx, hero);
      if (hero.pos[1] < -27 && !this.easteregg) {
        tada.play();
        this.easteregg = true;
        this.eggfound = true;
      }
    }
  }]);

  return LevelZero;
}();

module.exports = LevelZero;

/***/ }),

/***/ "./lib/platform.js":
/*!*************************!*\
  !*** ./lib/platform.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = function Platform(options) {
  _classCallCheck(this, Platform);

  this.padding = options.padding;
  this.pos = options.pos;
  this.height = options.height;
  this.width = options.width;
  this.type = options.type;
};

module.exports = Platform;

/***/ }),

/***/ "./lib/prize.js":
/*!**********************!*\
  !*** ./lib/prize.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var woman1 = new Image();
woman1.src = "assets/cavewoman/woman1.png";
var woman2 = new Image();
woman2.src = "assets/cavewoman/woman2.png";
var woman3 = new Image();
woman3.src = "assets/cavewoman/woman3.png";
var woman4 = new Image();
woman4.src = "assets/cavewoman/woman4.png";
var woman5 = new Image();
woman5.src = "assets/cavewoman/woman5.png";
var woman6 = new Image();
woman6.src = "assets/cavewoman/woman6.png";
var woman7 = new Image();
woman7.src = "assets/cavewoman/woman7.png";
var woman8 = new Image();
woman8.src = "assets/cavewoman/woman8.png";
var animations = new Array(80);
for (var i = 0; i < 80; i++) {
  if (i < 10) {
    animations[i] = woman1;
  } else if (i < 20) {
    animations[i] = woman2;
  } else if (i < 30) {
    animations[i] = woman3;
  } else if (i < 40) {
    animations[i] = woman4;
  } else if (i < 50) {
    animations[i] = woman5;
  } else if (i < 60) {
    animations[i] = woman6;
  } else if (i < 70) {
    animations[i] = woman7;
  } else if (i < 80) {
    animations[i] = woman8;
  }
}

var Prize = function () {
  function Prize(options) {
    _classCallCheck(this, Prize);

    this.pos = options.pos;
  }

  _createClass(Prize, [{
    key: "draw",
    value: function draw(ctx, hero) {
      ctx.beginPath();
      if (hero.won) {
        ctx.drawImage(animations[0], this.pos[0], this.pos[1], 40, 100);
        animations = animations.slice(1).concat(animations[0]);
      } else {
        ctx.drawImage(animations[79], this.pos[0], this.pos[1], 40, 100);
      }
      ctx.closePath();
    }
  }]);

  return Prize;
}();

module.exports = Prize;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map