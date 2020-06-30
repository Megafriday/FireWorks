const SCREEN_SIZE_W = window.innerWidth;
const SCREEN_SIZE_H = window.innerHeight;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;


setInterval(mainLoop, 1000 / 60);

let hanabi = [];
let zanzo = [];

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
	updateObj(hanabi);
	updateObj(zanzo);
}

//毎フレーム毎の描画
function draw() {
	//画面を黒でクリア
	con.globalCompositeOperation = 'source-over';
	con.fillStyle = "#000000";
	con.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

	con.fillStyle = "#ffffff";
	//con.fillText("H:"+hanabi.length,10,10);
	//con.fillText("Z:"+zanzo.length,10,30);

	con.globalCompositeOperation = 'lighter';
	drawObj(zanzo);
	drawObj(hanabi);
}

function mainLoop() {
	update();
	draw();
}


function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//キーボードが押された時に呼ばれる
document.onkeydown = function (e) {

	if (e.keyCode == 97 ||
		e.keyCode == 98 ||
		e.keyCode == 99 ||
		e.keyCode == 32
	) {
		let s;
		if (e.keyCode == 97) s = 0;
		if (e.keyCode == 98) s = 250;
		if (e.keyCode == 99) s = 520;

		let x = rand(s, s + 250);
		if (e.keyCode == 32) x = rand(0, SCREEN_SIZE_W);
		let y = rand(SCREEN_SIZE_H - 50, SCREEN_SIZE_H);
		let sp = 600 + rand(0, 400);
		let co = rand(0, 3);
		hanabi.push(
			new Hanabi(x << 8, y << 8, co, 0, -800, 4)
		);
	}
}