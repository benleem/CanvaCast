// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = 600;
const canvasWidth = 800;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

//Engine
const map = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const mapX = 10;
const mapY = 10;
const mapSize = mapX * mapY;

const drawMap = () => {
	let stepX = canvasWidth / mapX;
	let stepY = canvasHeight / mapY;
	let x, y;
	for (y = 0; y <= canvasHeight; y += stepY) {
		for (x = 0; x <= canvasWidth; x += stepX) {
			if (map[(y / stepY) * mapX + x / stepX] === 1) {
				ctx.beginPath();
				ctx.rect(x, y, stepX, stepY);
				ctx.fillStyle = "white";
				ctx.fill();
			} else {
				ctx.beginPath();
				ctx.rect(x, y, stepX, stepY);
				ctx.fillStyle = "black";
				ctx.fill();
			}
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvasHeight);
			ctx.stroke();
			ctx.moveTo(0, y);
			ctx.lineTo(canvasWidth, y);
			ctx.stroke();
		}
	}
};

drawMap();
