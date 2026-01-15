const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");

let playerX = 130;
let score = 0;
let speed = 3;
let gameOver = false;

// Move player
document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  }

  if (e.key === "ArrowRight" && playerX < 260) {
    playerX += 20;
  }

  player.style.left = playerX + "px";
});

// Create falling enemy
function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.floor(Math.random() * 260) + "px";
  game.appendChild(enemy);

  let enemyY = 0;

  const fall = setInterval(() => {
    if (gameOver) {
      clearInterval(fall);
      return;
    }

    enemyY += speed;
    enemy.style.top = enemyY + "px";

    // Collision detection
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      alert("Game Over! Score: " + score);
      gameOver = true;
      location.reload();
    }

    // Enemy passed bottom
    if (enemyY > 400) {
      enemy.remove();
      clearInterval(fall);
      score++;
      scoreText.textContent = "Score: " + score;
    }
  }, 20);
}

// Spawn enemies
setInterval(createEnemy, 1000);
