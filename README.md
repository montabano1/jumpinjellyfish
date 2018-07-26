# jumpinjellyfish

Welcome to the jumpinjellyfish readme!

Background
jumpinjellyfish is strategy game that also requires skilled timing. The goal is for the player to reach the key on the platform on the right side of the screen. Each board starts with the player on a small platform on the left side of the screen. there are flying jellyfish objects that move in straight lines (or are stationary) in the empty space between the start and end platforms. To complete a level, the player must use the jellyfish as jumping points to bounce off of to reach the goal. A player may click on the jellyfish to stop them until unclicked, which will allow the player to 'set' the board.

Functionality & MVPS
In monteclimbers, users will be able to:

 Start, pause, and reset the game board
 arrest moving jellyfish temporarily by clicking and holding on them
 move the player left, right or up.

In addition, this project will include:

An About modal describing the background and rules of the game
A production README


Wireframes
This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and the About modal.
Game controls will include left, right, up movement buttons, clicking for setting the board, and Start, Stop, and Reset buttons

![alt text](https://i.imgur.com/trNNjgc.png "First look")

Architecture and Technologies

This project will be implemented with the following technologies:

JavaScript for game logic,
Foo.js with HTML5 Baz for effects rendering,
Browserify to bundle js files.

The three scripts I plan on using in this project are:

board.js: this script will handle the logic for creating and updating the necessary Foo.js elements and rendering them to the DOM.

user.js: this script will handle the logic for the user object. The user will be using the keyboard to move the player.

jellyfish.js: this will handle the logic for the jellyfish. They will have set motions but their position will be haulted y a user grabbing on to them with the mouse
