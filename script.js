const player1 = {
	id: 1,
	name: "",
	color: "red",
	startPosition: 6,
	figurs: [
		{
			id: 1,
			position: 0,
			win: false,
			solder: document.getElementById("redSolder1"),
		},
		{
			id: 2,
			position: 0,
			win: false,
			solder: document.getElementById("redSolder2"),
		},
		{
			id: 3,
			position: 0,
			win: false,
			solder: document.getElementById("redSolder3"),
		},
		{
			id: 4,
			position: 0,
			win: false,
			solder: document.getElementById("redSolder4"),
		},
	],
};

const player2 = {
	id: 2,
	name: "",
	color: "blue",
	figurs: [
		{
			id: 1,
			position: 0,
			win: false,
			solder: document.getElementById("blueSolder1"),
		},
		{
			id: 2,
			position: 0,
			win: false,
			solder: document.getElementById("blueSolder2"),
		},
		{
			id: 3,
			position: 0,
			win: false,
			solder: document.getElementById("blueSolder3"),
		},
		{
			id: 4,
			position: 0,
			win: false,
			solder: document.getElementById("blueSolder4"),
		},
	],
};

let rules = {
	step: "step1",
	player: player1,
	zar: "",
};

const zar = document.getElementById("zar");
const playerTitle = document.getElementById("player");

playerTitle.innerText = "1 player";

const random = () => Math.floor(Math.random() * 5) + 1;

zar.addEventListener("click", () => {
	if (rules.step === "step1") {
		rules.step = "step2";
		let zarNum = random();
		rules.zar = zarNum;
		return (zar.innerHTML = `<h1>${zarNum}</h1>`);
	}
	if (rules.step === "step3") {
		rules.step = "step4";
		let zarNum = random();
		rules.zar = zarNum;

		return (zar.innerHTML = `<h1>${zarNum}</h1>`);
	}
	alert("wrong move");
});

player1.figurs.forEach((figur) => {
	figur.solder.addEventListener("click", () => {
		if (figur.win) {
			alert("wrong move");
			return;
		}
		if (rules.step === "step2") {
			figur.position += rules.zar;
			console.log(figur.position);
			zar.innerText = "click";
			rules.step = "step3";
			if (figur.position + rules.zar > 55) {
				figur.win = true;
				return document.querySelector("#win").appendChild(figur.solder);
			}
			const position = document.querySelector(
				`.redSolderPosition${figur.position}`
			);
			const loseMove = player2.figurs.find((enemy) => {
				if (
					(figur.position - 26 == enemy.position ||
						figur.position == enemy.position - 26) &&
					position.id != "star"
				) {
					return figur;
				}
			});
			if (loseMove !== undefined) {
				figur.position = 0;
				return document.getElementById("redBase").appendChild(figur.solder);
			}
			playerTitle.innerText = "2 player";
			return position.appendChild(figur.solder);
		}
		alert("wrong move");
	});
});

player2.figurs.forEach((figur) => {
	figur.solder.addEventListener("click", () => {
		if (figur.win) {
			alert("wrong move");
			return;
		}
		if (rules.step === "step4") {
			figur.position += rules.zar;
			console.log(figur.position);
			zar.innerText = "click";
			rules.step = "step1";
			if (figur.position + rules.zar > 55) {
				figur.win = true;
				return document.querySelector("#win").appendChild(figur.solder);
			}
			const position = document.querySelector(
				`.blueSolderPosition${figur.position}`
			);
			const loseMove = player1.figurs.find((enemy) => {
				if (
					(figur.position - 26 == enemy.position ||
						figur.position == enemy.position - 26) &&
					position.id != "star"
				) {
					return figur;
				}
			});
			if (loseMove !== undefined) {
				figur.position = 0;
				return document.getElementById("blueBase").appendChild(figur.solder);
			}
			playerTitle.innerText = "1 player";
			return position.appendChild(figur.solder);
		}
		alert("wrong move");
	});
});

const player1wins = player1.figurs.filter((figur) => {
	figur.win == true;
});

const player2wins = player2.figurs.filter((figur) => {
	figur.win == true;
});

if (player1wins.length == 4) {
	alert("Player 1 Wins");
	window.location = "http://127.0.0.1:5500/";
}

if (player2wins.length == 4) {
	alert("Player 2 Wins");
	window.location = "http://127.0.0.1:5500/";
}
