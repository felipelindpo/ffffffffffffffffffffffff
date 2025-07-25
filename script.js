 const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let felipe = { x: 50, y: 300, color: '#4169E1' };
let matheus = { x: 650, y: 300, color: '#FF69B4' };
let floorY = 330;
let hugged = false;
let hearts = [];

function drawStickman({ x, y, color }) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y - 20, 10, 0, Math.PI * 2); // cabeça
  ctx.fill();
  ctx.fillRect(x - 5, y - 10, 10, 20); // corpo
  ctx.fillRect(x - 15, y + 10, 10, 20); // perna esquerda
  ctx.fillRect(x + 5, y + 10, 10, 20); // perna direita
  ctx.fillRect(x - 15, y - 10, 10, 10); // braço esquerdo
  ctx.fillRect(x + 5, y - 10, 10, 10); // braço direito
}

function drawGround() {
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, floorY, canvas.width, 70);
}

function drawHearts() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "red";
  hearts.forEach(h => {
    ctx.fillText("❤️", h.x, h.y);
    h.y -= 1;
  });
}

function drawText() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "#ff1493";
  ctx.fillText("Matheus, eu te amo. Tenho orgulho de você todos os dias!", 120, 50);
  ctx.fillText("Obrigado por existir na minha vida ❤️ - Felipe", 160, 80);
}

function update() {
  if (!hugged) {
    if (felipe.x < matheus.x - 40) {
      felipe.x += 2;
    } else {
      hugged = true;
      for (let i = 0; i < 40; i++) {
        hearts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
      }
    }
  }
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawStickman(felipe);
  drawStickman(matheus);
  drawText();

  if (hugged) {
    // Beijo/abraço visual
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc((felipe.x + matheus.x) / 2, felipe.y - 30, 10, 0, Math.PI * 2);
    ctx.fill();
    drawHearts();
  }

  update();
  requestAnimationFrame(drawScene);
}

drawScene();
