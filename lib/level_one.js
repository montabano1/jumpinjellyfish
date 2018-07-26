const Platform = require("./platform");

class LevelOne {
  constructor(ctx) {
    this.ctx = ctx;
    this.platforms = [
      new Platform({padding: 0.1, pos: [0, 225], height: 30, width: 150}),
      new Platform({padding: 0.1, pos: [400, 225], height: 30, width: 75}),
    ];
  }

  draw(ctx) {
    this.platforms.forEach ((plat) => {
      ctx.beginPath();
      ctx.rect(
      plat.pos[0], plat.pos[1], plat.width, plat.height
      );
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    });
  }
}

module.exports = LevelOne;
