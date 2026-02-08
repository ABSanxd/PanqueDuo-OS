const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("game-score");
const overlay = document.getElementById("game-overlay");
const startBtn = document.getElementById("start-game-btn");

let score = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1; 
let dy = 0;
let gameInterval = null;
const boxSize = 15;
const gameSpeed = 150; 

function drawSnake() {
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#bb86fc" : "#9965f4";
        ctx.fillRect(part.x * boxSize, part.y * boxSize, boxSize - 1, boxSize - 1);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.innerText = `Puntos: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
}

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / boxSize));
    food.y = Math.floor(Math.random() * (canvas.height / boxSize));
}

function drawHeart(x, y, size) {
    ctx.fillStyle = "#36f9f6";
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
}

function checkGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function showGameOver() {
    clearInterval(gameInterval);
    gameInterval = null;
    document.getElementById("final-score").innerText = score;
    overlay.style.setProperty('display', 'flex', 'important'); // Mostrar cartel de fin
}

function gameLoop() {
    if (checkGameOver()) {
        showGameOver();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHeart(food.x * boxSize + boxSize/2, food.y * boxSize, boxSize);
    moveSnake();
    drawSnake();
}

function startSnakeGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1; dy = 0; score = 0;
    scoreEl.innerText = "Puntos: 0";
    
    overlay.style.setProperty('display', 'none', 'important'); 
    startBtn.style.display = "none";
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
}

window.addEventListener("keydown", e => {
    const winGame = document.getElementById('win-game');
    if (winGame && winGame.style.display === 'block') {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code)) e.preventDefault();
        
        switch (e.key) {
            case "ArrowUp": if (dy === 0) { dx = 0; dy = -1; } break;
            case "ArrowDown": if (dy === 0) { dx = 0; dy = 1; } break;
            case "ArrowLeft": if (dx === 0) { dx = -1; dy = 0; } break;
            case "ArrowRight": if (dx === 0) { dx = 1; dy = 0; } break;
        }
    }
});