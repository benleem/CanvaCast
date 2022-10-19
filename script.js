// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = 600;
const canvasWidth = 800;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

//Engine
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
console.log(`The map size is ${mapSize} units`);

const drawMap = () => {
	let x, y;
	for (y = 0; y <= canvasHeight; y += canvasHeight / mapY) {
		for (x = 0; x <= canvasWidth; x += canvasWidth / mapX) {
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
