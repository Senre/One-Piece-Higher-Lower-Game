let round = 0;
let highScore = 0;

let allBounties = [	['Monkey D. Luffy', 1500000000, 'luffypic.jpg'],
					['Jinbe', 438000000, 'jinbepic.jpg'],
					['Donquixote Doflamingo', 340000000, 'doflamingo.jpeg'],
					['Sanji', 330000000, 'sanjipic.jpg'],
					['Roronoa Zoro', 320000000, 'zoropic.jpg'],
					['Caesar Clown', 300000000, 'caesarclown.jpg'],
					['Bartholomew Kuma', 296000000, 'kumapic.png'],
					['Bellamy', 295000000, 'bellamy.png'],
					['Fisher Tiger', 230000000, 'fishertiger.jpeg'],
					['Usopp', 200000000, 'usopppic.png'],
					['Nico Robin', 130000000, 'robinpic2.jpg'],
					['Pica', 99000000, 'pica.png'],
					['Franky', 94000000, 'frankypic.png'],
					['Brook', 83000000, 'brookpic.jpeg'],
					['Crocodile', 81000000, 'crocodile.png'],
					['Boa Hancock', 80000000, 'boahancock.png'],
					['Daz Bones', 75000000, 'dazbones.png'],
					['Nami', 66000000, 'namipic.png'],
					['Senor Pink', 58000000, 'senorpink.png'],
					['Boa Sandersonia', 40000000, 'boasandersonia.png'],
					['Miss Doublefinger', 35000000, 'missdoublefinger.png'],
					['Bon Clay', 32000000, 'bonclay.png'],
					['Miss Goldenweek', 29000000, 'missgoldenweek.jpg'],
					['Galdino', 24000000, 'galdino.png'],
			        ['Tony Tony Chopper', 100, 'chopperpic.jpeg'],

			       // ['Gecko Moria',320000000,'geckomoria.png'],
			       ];

let bountiesLength = allBounties.length;

function clickedButton(choice) {
	revealBounty();

	let outcome = rightOrWrong(choice);
	checkOutcome(outcome);
	changeRoundAndScore(outcome);
	nextRoundOrEnd(outcome);
}

function nextRoundOrEnd(outcome) {
	setTimeout(function() {
		if (outcome) {
			if (round < allBounties.length - 1) {
				newRound();
			} else {
				gameResult('win');
			}
		} else {
			gameResult('lose');
		}
	}, 2000);
}

function changeRoundAndScore(outcome) {
	round++;
	
	if (round > highScore && outcome) {
		highScore = round;
	}
}

function checkOutcome(outcome) {
	if (outcome) {
		document.getElementById('result').style.background = 'limegreen';
	} else {
		document.getElementById('result').style.background = 'red';
	}

	document.getElementById('result').style.transition = '1s opacity';
	setTimeout(function() {
		document.getElementById('result').style.opacity = '1';
		}, 800);
}

function revealBounty() {
	document.getElementById('btn-group').style.display = 'none';
	let bountyElement = document.getElementById('bounty');
	bountyElement.innerHTML = `<h5>${allBounties[round+1][1].toLocaleString()}</h5>`;
	bountyElement.style.transition = '1s opacity';
	bountyElement.style.opacity = '1';
}

function newRound() {

	changeScore();
	changeLeftSide();
	changeRightSide();
	if (round+2 < bountiesLength) {
		loadimage();
	}
	showResult();

	document.getElementById('btn-group').style.display = 'block';
}

function showResult() {
	document.getElementById('result').style.transition = '0s opacity';
	document.getElementById('result').style.opacity = '0';
}

function changeLeftSide() {
	document.getElementById('left-side').style = `background-image: linear-gradient(rgba(0, 0, 0, 0.7),
																	rgba(0, 0, 0, 0.5)), 
																	url('imgs/${allBounties[round][2]}');`;

	document.getElementById('left-side-stats').innerHTML = `<h3>${allBounties[round][0]}'s</h3>
															<h4>bounty is</h4>
															<h5>${allBounties[round][1].toLocaleString()}</h5>`;
}

function changeRightSide() {
	document.getElementById('right-side').style = `background-image: linear-gradient(rgba(0, 0, 0, 0.7),
																	rgba(0, 0, 0, 0.5)), 
																	url('imgs/${allBounties[round+1][2]}');`;

	document.getElementById('right-side-stats').innerHTML = `<h3>${allBounties[round+1][0]}'s</h3>
															<h4>bounty is</h4>`;
	document.getElementById('bounty').style.transition = '0s opacity';
	document.getElementById('bounty').style.opacity = '0';
}

function loadimage() {
	document.getElementById('loadimg').style = `background-image: url('imgs/${allBounties[round+2][2]}');`;
}

function changeScore() {
	document.getElementById('score').innerHTML = `<h4>Score: ${round}<h4>`;
	document.getElementById('highScore').innerHTML = `<h4>High Score: ${highScore}<h4>`;
}

function newGame() {
	randomiseBounties();
	newRound();
}

function rightOrWrong(choice) {
	let result = document.getElementById('result');
	if (choice === 'higher') {
		if (allBounties[round][1] < allBounties[round + 1][1]) {
			result.innerHTML = '&#10004';
			return true;
		} else {
			result.innerHTML = '&#10008';
			return false;
		}
	} else {
		if (allBounties[round][1] > allBounties[round + 1][1]) {
			result.innerHTML = '&#10004';
			return true;
		} else {
			result.innerHTML = '&#10008';
			return false;
		}
	}
};

function randomiseBounties() {
	allBounties = allBounties.sort(() => Math.random() - 0.5);
}

function startGame(currScreen) {
	round = 0;
	newGame();
	document.getElementById(`${currScreen}Screen`).style.display = 'none';
	document.getElementById('gameScreen').style.display = 'block';
}

function goToMenu(currScreen) {
	document.getElementById(`${currScreen}Screen`).style.display = 'none';
	document.getElementById('startScreen').style.display = 'block';
}

function gameResult(result) {
	document.getElementById('gameScreen').style.display = 'none';
	document.getElementById(`${result}Screen`).style.display = 'block';
	document.getElementById(`${result}Score`).innerHTML = `Score: ${round}`;
}

function switchStartInstructions(close, open) {
	document.getElementById(close).style.display = 'none';
	document.getElementById(open).style.display = 'block';
}

function startFromInstructions() {
	document.getElementById('instructions').style.display = 'none';
	document.getElementById('menu').style.display = 'block';
	startGame('start')

}
