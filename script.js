// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = 600;
const canvasWidth = 800;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

//Engine
const tick = 30;
const fov = 60;
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
const cellX = canvasWidth / mapX;
const cellY = canvasHeight / mapY;

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

const drawMap = (mouseX, mouseY) => {
	for (let y = 0; y < canvasHeight; y += cellY) {
		for (let x = 0; x < canvasWidth; x += cellX) {
			// tile toggling
			if (
				mouseX &&
				mouseY &&
				mouseX >= x &&
				mouseY >= y &&
				mouseX <= x + cellX &&
				mouseY <= y + cellY
			) {
				if (map[y / cellY][x / cellX] === 1) {
					map[y / cellY][x / cellX] = 0;
				} else {
					map[y / cellY][x / cellX] = 1;
				}
			}

			// collision
			if (
				player.posX + player.size / 2 > x &&
				player.posX - player.size / 2 < x + cellX &&
				player.posY + player.size / 2 > y &&
				player.posY - player.size / 2 < y + cellY &&
				map[y / cellY][x / cellX] === 1
			) {
				console.log("Wall");
			}

			// drawing
			drawRectangle(x, y, cellX, cellY);
			drawGrid(x, y);
		}
	}
	drawPlayer();
};

const drawRectangle = (x, y, cellX, cellY) => {
	if (map[y / cellY][x / cellX] === 1) {
		ctx.beginPath();
		ctx.rect(x, y, cellX, cellY);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
	} else {
		ctx.beginPath();
		ctx.rect(x, y, cellX, cellY);
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

	// player direction ray
	const rayLength = player.size * 0.5;
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
	const rect = canvas.getBoundingClientRect();
	const mouseX = event.clientX - rect.left;
	const mouseY = event.clientY - rect.top;
	drawMap(mouseX, mouseY);
});
