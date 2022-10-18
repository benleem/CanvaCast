const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = canvas.width * (3 / 4);

window.onresize(() => {
	// context.canvas.height = window.innerHeight;
	// context.canvas.width = window.innerWidth;
	// context.canvas.height = (3 * window.innerWidth) / 4;
});
