# jumpinjellyfish

## Welcome to the jumpinjellyfish readme!

## [LIVE VERSION!](https://www.michaelmontalbano.com/jumpinjellyfish)

![jumpinjellyfish](https://i.imgur.com/ORE3jH0.jpg "Jumpin Jellyfish")

## Description
jumpinjellyfish is strategy game that also requires skilled timing. The goal is for the player to reach the lady friend on the platform on the right side of the screen. Each board starts with the player on a small platform on the left side of the screen. there are flying jellyfish objects that move in straight lines (or are stationary) in the empty space between the start and end platforms. To complete a level, the player must use the jellyfish as jumping points to bounce off of to reach the goal. A player may click on the jellyfish to stop them until unclicked, which will allow the player to 'set' the board.

## How it works
I used vanilla JavaScript with canvas for my game. The game is centered around collision detection, which was a bit of a challenge, since the objects are animated. Each object had a unique size at any given time using its current velocity, so there were a lot of specifics based on what the hero and jellyfish looked like at the moment of collision. Another tough but fun challenge was getting the jellyfish to freeze on being clicked, which was tough because they are not technically objects, they are a part of the canvas object. I did this using an event listener for click and recognizing (through a debugger) that each event actually has a pageX and pageY location, which I was able to match up with the jellyfish's location similarly to the collision detection with the hero:

```js
canvas.addEventListener('mousedown', function(event) {
  const x = event.pageX - canvasLeft;
  const y = event.pageY - canvasTop;
  clickpos = [x,y];
  canvas.addEventListener('mouseup', function() {
    clickpos = [1000, 1000];
  }, false);
}, false);

if (clickpos[0] > this.pos[0] && clickpos[0] < this.pos[0] + this.width + 60 &&
  clickpos[1] > this.pos[1] - 5 && clickpos[1] < this.pos[1] + 60
) {
  this.isClicked = true;
  this.color = '#f80aff'; ...
```
## Difficulty
I intentionally designed the levels to have increasing difficulty, and the second to last level suggests clicking the jellyfish but it isn't essential to complete the level. The final level however is very difficult and requires clicking and planning.

## Levels
I was able to have the user press enter after completing a level which would start the next level. I accomplished this by having the levels be in an array and the animate function is constantly drawing the level, but by pressing enter once the level completed modal pops up would call shift on the levels array.
