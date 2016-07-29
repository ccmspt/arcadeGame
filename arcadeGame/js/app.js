// Using 'strict mode' to improve security
'use strict';



// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = this.randInt(100, 500);
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    // If enemey hits right side of screen reset postion
    // and assign random speed and random lane position
    var lane = [60,145,225];
    var p = this.randInt(0, 3);
    if (this.x >= 500) {
        this.x = -100;
        this.y = lane[p];
        this.speed = this.randInt(100, 500);
    }
};

// Creates random number to vary speed of enemies and lane choosing
Enemy.prototype.randInt = function(min, max) {
    this.min = min;
    this.max = max;
    var enemySpeed = 0;
    enemySpeed = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    return enemySpeed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Function to detect collision between player and enemy
Player.prototype.checkCollisions = function() {
    for (var i = 0, len = allEnemies.length; i < len; i++) {
        if ((allEnemies[i].x) <= player.x + 50 &&
            (allEnemies[i].x + 50) >= (player.x) &&
            (allEnemies[i].y)<= player.y + 50 &&
            (allEnemies[i].y + 50) >= (player.y)) {
          // If collision reset player to starting position
          this.reset();
        }
    }
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x*dt;
    this.y*dt;
    this.checkCollisions();
};

Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// Keyboard input to move player around board
Player.prototype.handleInput = function(direction){
    if(direction === 'left' && this.x > 0){
        this.x -= 101;
    }
    if(direction === 'up' && this.y > 50){
        this.y -= 85;
    }
    if(this.y < 50){
        // Reset player position if water is reached
        this.reset();
    }
    if(direction === 'right' && this.x < 400){
        this.x += 101;
    }
    if(direction === 'down' && this.y < 400){
        this.y += 85;}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-100, 60, 0);
var enemy2 = new Enemy(-100, 145, 0);
var enemy3 = new Enemy(-100, 225, 0);

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
