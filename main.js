const SCREEN_SIZE_W = window.innerWidth - 40;
const SCREEN_SIZE_H = window.innerHeight - 40;

let can = document.getElementById("can");
can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;
let con = can.getContext("2d");

let hanabis = [];
let zanzos = [];

function updateObj(obj) {
	//スプライトのブロックを更新
	for (let i = obj.length - 1; i >= 0; i--) {
		obj[i].update();
		if (obj[i].kill) obj.splice(i, 1);
	}
}
function drawObj(obj) {
	//スプライトのブロックを更新
	for (let i = obj.length - 1; i >= 0; i--) {
		obj[i].draw();
	}
}

//毎フレーム毎の更新処理
function update() {
	updateObj(hanabis);
	updateObj(zanzos);
}

//毎フレーム毎の描画
function draw() {
	//画面を黒でクリア
	con.globalCompositeOperation = 'source-over';
	con.fillStyle = "#000000";
	con.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

	con.fillStyle = "#ffffff";
	con.fillText("H:" + hanabis.length, 10, 10);
	con.fillText("Z:" + zanzos.length, 10, 30);

	con.globalCompositeOperation = 'lighter';
	drawObj(zanzos);
	drawObj(hanabis);
}

function mainLoop() {
	update();
	draw();
	window.requestAnimationFrame(mainLoop);
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//キーボードが押された時に呼ばれる
document.onkeydown = function (e) {

	if (e.keyCode == 49 ||
		e.keyCode == 50 ||
		e.keyCode == 51 ||
		e.keyCode == 32
	) {
		let s;
		if (e.keyCode == 49) s = 0;
		if (e.keyCode == 50) s = 250;
		if (e.keyCode == 51) s = 520;

		let x = randInt(s, s + 250);
		if (e.keyCode == 32) x = randInt(0, SCREEN_SIZE_W);
		let y = randInt(SCREEN_SIZE_H - 50, SCREEN_SIZE_H);
		let sp = 600 + randInt(0, 400);
		let co = randInt(0, 3);
		hanabis.push(
			new Hanabi(x << 8, y << 8, co, 0, -800, 4)
		);
	}
}

mainLoop();
