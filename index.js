
var gamePaddle;
var gameObstacle = [];
var gameScore; 

function startGame() {
    gamePaddle = new component(30, 30, "#f00", 10, 120);
    gameScore = new component("20px", "Consolas", "#000", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"), //<canvas></canvas>
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.frameNo = 0;

        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', (e) => {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', (e) => {
            myGameArea.key = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
       clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {
    ctx = myGameArea.context;
    if (type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y)
    }
    else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
    this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
}

this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, minHeight, maxHeight, gap, minGap, maxGap;

    for (i = 0; i < gameObstacle.length; i+= 1) {
        if (gamePaddle.crashWith(gameObstacle[i])) {
            myGameArea.stop();
            alert("Ouch!, You lost!")
            return;
        }
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    if (myGameArea.frameNo == 1 || eachInt(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight= 200;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1)+ minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap - minGap + 1)+ minGap);

        gameObstacle.push(new component(10, height, "#01232d", x, 0));
        gameObstacle.push(new component(10, x- height - gap, "#01232d", x, height + gap));
    }

    for (i = 0; i < gameObstacle.length; i+= 1) {
        gameObstacle[i].x += -1;
        gameObstacle[i].update();
    }
    if (myGameArea.frameNo === 10001) {
        gameScore.text = "YOU ARE A WINNER!"
    } else {
    gameScore.text = "SCORE: " + myGameArea.frameNo;
    }
    gameScore.update();

    if (myGameArea.frameNo === 10001) {
        alert("You won");
        myGameArea.stop();
    }

    gamePaddle.newPos();
    gamePaddle.update();
    gamePaddle.speedX += 0;
    gamePaddle.speedY += 0;
    if (myGameArea.key && myGameArea.key == 37) {gamePaddle.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {gamePaddle.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {gamePaddle.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {gamePaddle.speedY = 1; }
    
    /*if (gamePaddle.crashWith(gameObstacle)) {
        myGameArea.stop();
    } else {
    myGameArea.clear();
    gamePaddle.newPos();
    gameObstacle.update();
    gameObstacle.x -= 1;
    gamePaddle.speedX += 0;
    gamePaddle.speedY += 0;
    if (myGameArea.key && myGameArea.key == 37) {gamePaddle.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {gamePaddle.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {gamePaddle.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {gamePaddle.speedY = 1; }
    gamePaddle.update();
    }*/
}

function eachInt(n) {
    if((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function moveUp() {
    gamePaddle.speedY -= 1;
}

function moveDown() {
    gamePaddle.speedY += 1;
}

function moveRight() {
    gamePaddle.speedX -= 1;
}

function moveLeft() {
    gamePaddle.speedX += 1;
}

function stopMove() {
    gamePaddle.speedX = 0;
    gamePaddle.speedY = 0;
}

function reportUsers() {
    alert("In this game, you have to save the red box from the obstcales, you'll be declared as a winner when your score touches 10000, so are you ready? You can also use your arrow keys to move the paddle")
}