
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;
let messages = [
  "Matheus, você é meu mundo.",
  "Cada passo é por você.",
  "Tenho tanto orgulho de você.",
  "Você importa mais do que tudo.",
  "Te amo infinitamente. ❤️"
];
let msgIndex = 0;
let hero = { x: 50, y: canvas.height - 150, color: '#1f1f1f' };
let target = { x: canvas.width - 150, y: canvas.height - 150, color: '#ff4d6d' };


let felipeImg = new Image();
felipeImg.src = "felipe.png";
let matheusImg = new Image();
matheusImg.src = "matheus.png";

function drawStickman(x, y, color, isFelipe = true) {
  ctx.drawImage(isFelipe ? felipeImg : matheusImg, x - 16, y - 32, 32, 32);
}(x, y, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  // Head
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.stroke();
  // Body
  ctx.beginPath();
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x, y + 40);
  ctx.stroke();
  // Arms
  ctx.beginPath();
  ctx.moveTo(x - 15, y + 20);
  ctx.lineTo(x + 15, y + 20);
  ctx.stroke();
  // Legs
  ctx.beginPath();
  ctx.moveTo(x, y + 40);
  ctx.lineTo(x - 10, y + 60);
  ctx.moveTo(x, y + 40);
  ctx.lineTo(x + 10, y + 60);
  ctx.stroke();
}

function drawHeart(x, y) {
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 10, y - 10, x - 25, y + 10, x, y + 25);
  ctx.bezierCurveTo(x + 25, y + 10, x + 10, y - 10, x, y);
  ctx.fill();
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background ground
  ctx.fillStyle = "#6cbb3c";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Felipe (left)
  drawStickman(hero.x, hero.y, hero.color, true);

  // Matheus (right)
  drawStickman(target.x, target.y, target.color, false);

  // Message
  if (msgIndex < messages.length) {
    ctx.fillStyle = "#000";
    ctx.font = "24px sans-serif";
    ctx.fillText(messages[msgIndex], canvas.width / 2 - 200, 100);
  }

  if (hero.x < target.x - 50) {
    hero.x += 2;
  } else if (msgIndex < messages.length - 1) {
    msgIndex++;
    hero.x = 50;
  } else {
    // Final heart
    drawHeart(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "#000";
    ctx.font = "28px sans-serif";
    
    ctx.fillText("Felipe ❤️ Matheus – Um mundo só nosso", canvas.width / 2 - 200, canvas.height / 2 + 60);
    for (let i = 0; i < 10; i++) {
      drawHeart(Math.random() * canvas.width, Math.random() * canvas.height);
    }
    // beijo (coração central)
    drawHeart(hero.x + 40, hero.y);
    
  }

  requestAnimationFrame(drawScene);
}

drawScene();
