// Enemies our player must avoid
var Enemy = function (enemyX, enemyY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyX;
    this.y = enemyY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt;
    if (this.x > 5)
        this.x = -1;
    //collision detect and restart player
    if ((player.posX + 0.75 > this.x && player.posX - 0.75 < this.x) && (player.posY + 0.75 > this.y && player.posY - 0.75 < this.y)) {
        player.posX = 2;
        player.posY = 5;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.posX = 2;
        this.posY = 5;
    }
    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.posX * 101, this.posY * 83);
    }
    handleInput(key) {
        if (key === "left" && this.posX !== 0) {
            this.posX -= 1;
        } else if (key === "right" && this.posX !== 4) {
            this.posX += 1;
        } else if (key === "down" && this.posY !== 5) {
            this.posY += 1;
        } else if (key === "up" && this.posY !== 0) {
            this.posY -= 1;
        }
        if (this.posY === 0) {
            setTimeout(reset, 200);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(-0.75, 1));
allEnemies.push(new Enemy(-1, 2));
allEnemies.push(new Enemy(-3.25, 3));
allEnemies.push(new Enemy(-4, 1));
allEnemies.push(new Enemy(-5.5, 2));
allEnemies.push(new Enemy(-5.75, 3));

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
function reset() {
    player.posX = 2;
    player.posY = 5;
    allEnemies = [];
    allEnemies.push(new Enemy(-0.75, 1));
    allEnemies.push(new Enemy(-1, 2));
    allEnemies.push(new Enemy(-3.25, 3));
    allEnemies.push(new Enemy(-4, 1));
    allEnemies.push(new Enemy(-5.5, 2));
    allEnemies.push(new Enemy(-5.75, 3));
    window.alert("You won!");
}