// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = 600;
const canvasWidth = 800;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

//Engine
const tick = 30;
const map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const mapX = map[0].length;
const mapY = map.length;
const mapSize = mapX * mapY;

const player = {
	size: 20,
	posX: canvasWidth * 0.5,
	posY: canvasHeight * 0.5,
	angle: 0,
	speed: 0,
};

const clearScreen = () => {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const playerController = () => {
	player.posX += Math.cos(player.angle) * player.speed;
	player.posY += Math.sin(player.angle) * player.speed;
};

const drawMap = (mouseX, mouseY, rays) => {
	let stepX = canvasWidth / mapX;
	let stepY = canvasHeight / mapY;
	let x, y;
	for (y = 0; y < canvasHeight; y += stepY) {
		for (x = 0; x < canvasWidth; x += stepX) {
			if (
				mouseX &&
				mouseY &&
				mouseX >= x &&
				mouseY >= y &&
				mouseX <= x + stepX &&
				mouseY <= y + stepY
			) {
				if (map[y / stepY][x / stepX] === 1) {
					map[y / stepY][x / stepX] = 0;
				} else {
					map[y / stepY][x / stepX] = 1;
				}
			}
			drawRectangle(x, y, stepX, stepY);
			drawGrid(x, y);
		}
	}
	drawPlayer();
};

const drawRectangle = (x, y, stepX, stepY) => {
	if (map[y / stepY][x / stepX] === 1) {
		ctx.beginPath();
		ctx.rect(x, y, stepX, stepY);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
	} else {
		ctx.beginPath();
		ctx.rect(x, y, stepX, stepY);
		ctx.fillStyle = "grey";
		ctx.fill();
		ctx.closePath();
	}
};

const drawGrid = (x, y) => {
	ctx.strokeStyle = "black";

	ctx.moveTo(x, 0);
	ctx.lineTo(x, canvasHeight);
	ctx.stroke();
	ctx.moveTo(0, y);
	ctx.lineTo(canvasWidth, y);
	ctx.stroke();
};

const drawPlayer = () => {
	ctx.fillStyle = "blue";
	ctx.fillRect(
		player.posX - player.size / 2,
		player.posY - player.size / 2,
		player.size,
		player.size
	);

	// test ray
	let rayLength = player.size * 2;
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.moveTo(player.posX, player.posY);
	ctx.lineTo(
		player.posX + Math.cos(player.angle) * rayLength,
		player.posY + Math.sin(player.angle) * rayLength
	);
	ctx.closePath();
	ctx.stroke();
};

const gameLoop = () => {
	clearScreen();
	playerController();
	drawMap();
};

setInterval(gameLoop, tick);

const convertToRad = (deg) => {
	return (deg * Math.PI) / 180;
};

document.addEventListener("keydown", (event) => {
	if (event.key === "w") {
		player.speed = 2;
	} else if (event.key === "s") {
		player.speed = -2;
	}
});

document.addEventListener("keyup", (event) => {
	if (event.key === "w" || event.key === "s") {
		player.speed = 0;
	}
});

document.addEventListener("mousemove", (event) => {
	player.angle += convertToRad(event.movementX);
});

canvas.addEventListener("click", (event) => {
	let rect = canvas.getBoundingClientRect();
	let mouseX = event.clientX - rect.left;
	let mouseY = event.clientY - rect.top;
	drawMap(mouseX, mouseY);
});
