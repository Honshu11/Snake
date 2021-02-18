"use strict";

const canvas = document.getElementById("snake-game");
const context = canvas.getContext("2d");

// class

class SnakeBody {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//global variables

let gameSpeed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let snakeHeadX = 10;
let snakeHeadY = 10;
let xSpeed = 0;
let ySpeed = 0;
let appleX = 5;
let appleY = 5;
const snakeBody = [];
let tailLength = 1;

let score = 0;

// event listener

document.body.addEventListener("keydown", keyDown);

//loops the game
function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }
  clearGame();
  eatApple();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / gameSpeed);
}

function isGameOver() {
  let gameOver = false;

  if (ySpeed === 0 && xSpeed === 0) {
    return false; //detects that game has not started and wont display GameOver before game starts.
  }

  if (snakeHeadX < 0) {
    gameOver = true;
  } else if (snakeHeadX === tileCount) {
    gameOver = true;
  } else if (snakeHeadY < 0) {
    gameOver = true;
  } else if (snakeHeadY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    // displays "Game Over" once snake touches body or touches border
    context.fillStyle = "white";
    context.font = "50px Verdana";
    context.fillText("Game Over!", canvas.width / 6, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  context.fillStyle = "white";
  context.font = "12px Verdana";
  context.fillText("Score " + score, canvas.width - 50, 10); // display score upper right hand side.
}

function clearGame() {
  context.fillStyle = "black"; // sets canvas background to black
  context.fillRect(0, 0, canvas.width, canvas.height); // x, y, 500 , 500
}

function drawSnake() {
  context.fillStyle = "white"; // body color of snake
  for (let i = 0; i < snakeBody.length; i++) {
    let body = snakeBody[i];
    context.fillRect(
      body.x * tileCount,
      body.y * tileCount,
      tileSize,
      tileSize
    );
  }

  snakeBody.push(new SnakeBody(snakeHeadX, snakeHeadY)); // adding rectagle to where the head was before.
  if (snakeBody.length > tailLength) {
    snakeBody.shift(); // removes furthest item from the snakeBody and allows pieces to move with head of body
  }

  context.fillStyle = "green"; // head color of snake
  context.fillRect(
    snakeHeadX * tileCount,
    snakeHeadY * tileCount,
    tileSize,
    tileSize
  ); // 10 * 500 / 20 -2, 10 * 500 / 20 - 2, 20 , 20
}

function drawApple() {
  context.fillStyle = "red"; // delicious apple :)
  context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize); // starting position of apple.
  score++;
}

function eatApple() {
  if (appleX === snakeHeadX && appleY === snakeHeadY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++; // increments body size of snake when it eats the apple.
  }
}

function changeSnakePosition() {
  snakeHeadX = snakeHeadX + xSpeed;
  snakeHeadY = snakeHeadY + ySpeed;
}

function keyDown(event) {
  if (event.keyCode == 38) {
    // event keycode is 38 for UP key
    if (ySpeed == 1) {
      return; // this exits the keyDown function and stops the rest of the code from executing
    }
    ySpeed = -1;
    xSpeed = 0;
  }

  if (event.keyCode == 40) {
    // event keycode is 40 for DOWN key
    if (ySpeed == -1) {
      return; // exits the keyDown function, should not allow to crash into snake own body.
    }
    ySpeed = 1;
    xSpeed = 0;
  }

  if (event.keyCode == 37) {
    // event keycode is 37 for LEFT key
    if (xSpeed == 1) {
      return;
    }
    ySpeed = 0;
    xSpeed = -1;
  }

  if (event.keyCode == 39) {
    // event keycode is 39 for RIGHT key
    if (xSpeed == -1) {
      return;
    }
    ySpeed = 0;
    xSpeed = 1;
  }
}

drawGame();
