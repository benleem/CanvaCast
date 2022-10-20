// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = 800;
const canvasWidth = 800;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

//Engine
const FPS = 60;
const FOV = 60;

const map = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const mapDepth = 10;
const mapSize = mapDepth * mapDepth;
const cellSize = canvasWidth / mapDepth;

const player = {
	size: 20,
	posX: canvasWidth * 0.5,
	posY: canvasHeight * 0.5,
	angle: 0,
	moveX: 0,
	moveY: 0,
	moveAngle: 0,
};

const clearScreen = () => {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const playerController = () => {
	const playerAngleX = Math.cos(player.angle);
	const playerAngleY = Math.sin(player.angle);
	const mapTargetX =
		Math.floor(player.posY / cellSize) * mapDepth +
		Math.floor((player.posX + playerAngleX * player.moveX) / cellSize);
	const mapTargetY =
		Math.floor((player.posY + playerAngleY * player.moveY) / cellSize) *
			mapDepth +
		Math.floor(player.posX / cellSize);

	if (player.moveX && map[mapTargetX] === 0) {
		player.posX += playerAngleX * player.moveX;
	}
	if (player.moveY && map[mapTargetY] === 0) {
		player.posY += playerAngleY * player.moveY;
	}
	if (player.moveAngle) {
		player.angle += convertToRad(5) * player.moveAngle;
	}
};

const drawMap = (mouseX, mouseY) => {
	for (let y = 0; y < canvasHeight; y += cellSize) {
		for (let x = 0; x < canvasWidth; x += cellSize) {
			// tile toggling
			if (
				mouseX &&
				mouseY &&
				mouseX >= x &&
				mouseY >= y &&
				mouseX <= x + cellSize &&
				mouseY <= y + cellSize
			) {
				if (map[(y / cellSize) * mapDepth + x / cellSize]) {
					map[(y / cellSize) * mapDepth + x / cellSize] = 0;
				} else {
					map[(y / cellSize) * mapDepth + x / cellSize] = 1;
				}
			}
			drawRectangle(x, y, cellSize, cellSize);
		}
	}
	drawPlayer();
};

const drawRectangle = (x, y, cellSize) => {
	if (map[(y / cellSize) * mapDepth + x / cellSize] === 1) {
		ctx.beginPath();
		ctx.rect(x, y, cellSize, cellSize);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	} else {
		ctx.beginPath();
		ctx.rect(x, y, cellSize, cellSize);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
	}
};

const drawPlayer = () => {
	ctx.fillStyle = "blue";
	ctx.fillRect(
		player.posX - player.size / 2,
		player.posY - player.size / 2,
		player.size,
		player.size
	);

	// player direction ray
	const rayLength = player.size;
	ctx.strokeStyle = "green";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(player.posX, player.posY);
	ctx.lineTo(
		player.posX + Math.cos(player.angle) * rayLength,
		player.posY + Math.sin(player.angle) * rayLength
	);
	ctx.closePath();
	ctx.stroke();
};

const convertToRad = (deg) => {
	return (deg * Math.PI) / 180;
};

const gameLoop = () => {
	clearScreen();
	playerController();
	drawMap();
};

window.onload = () => {
	setInterval(gameLoop, 1000 / FPS);
};

document.addEventListener("keydown", (event) => {
	if (event.key === "s") {
		player.moveX = -2;
		player.moveY = -2;
	} else if (event.key === "w") {
		player.moveX = 2;
		player.moveY = 2;
	}
	if (event.key === "a") {
		player.moveAngle = -1;
	} else if (event.key === "d") {
		player.moveAngle = 1;
	}
});

document.addEventListener("keyup", (event) => {
	if (event.key === "s" || event.key === "w") {
		player.moveX = 0;
		player.moveY = 0;
	}
	if (event.key === "a" || event.key === "d") {
		player.moveAngle = 0;
	}
});

canvas.addEventListener("click", (event) => {
	const rect = canvas.getBoundingClientRect();
	const mouseX = event.clientX - rect.left;
	const mouseY = event.clientY - rect.top;
	drawMap(mouseX, mouseY);
});
