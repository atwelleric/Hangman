const userSelectedLetters = [];
const onScreenUserSelectedLetters = document.querySelector(
	'.user-selected-letters'
);
let wrongGuessNumber = 0;
//Later, two seperate arrays that will put incorrect letters on one side, correct letters on the other
const submitButton = document.querySelector('.submit');
let secretWord = document.querySelector('.secret-word');
let submittedSecretWord = '';
let splitSecretWord = [];
let newArray = [];
//let playerOne = true;

// try turning players into an object, store a name, the value, and current score. accept user input for name.
let submitNameButton = document.querySelector('.submit-name');
submitNameButton.addEventListener('click', handlePlayerOneName);
let playerOne = {
	name: '',
	score: 0,
	turn: 0,
};

retrieveSaveData();
function retrieveSaveData() {
	let retrievedData = localStorage.getItem('playerOne');
	playerOne = JSON.parse(retrievedData);
}

function saveData() {
	localStorage.setItem('playerOne', JSON.stringify(playerOne));
}

function handlePlayerOneName() {
	playerOne.name = document.querySelector('.player-name').value;
	localStorage.setItem('playerOne', playerOne);
	saveData();
	// once stored make box disappear but add option for resetting stored name and score. maybe a pop up div warning saying it will reset score
}
document.querySelector('.player-one-name').innerText = playerOne.name;

//local storage always stores as string
//json .stingify can store object into a string, json parse turn sting into object
//let playerOneScore = 0;
let playerOneScoreDisplay = document.querySelector('#player-one-score-set');
playerOneScoreDisplay.innerText = playerOne.score;
parseInt(playerOne.score);
//let playerTwoScore = 0;
submitButton.addEventListener('click', handleSubmitButton);

// Define logic for player one = false, write to screen "player two its your turn to guess, player one pick a word"
// auto display player 2 chose word first since player one = true by default

function handleSubmitButton() {
	submittedSecretWord = secretWord.value;
	splitSecretWord = submittedSecretWord.split('');
	secretWord.value = ' ';
	newArray = Array(splitSecretWord.length).fill(' ');
	for (let i = 0; i < splitSecretWord.length; i++) {
		let div = document.createElement('div');
		div.classList.add('secret-div');
		div.innerText = '_ ';
		document.querySelector('.secret-word-on-screen').append(div);
	}
}
// for loop, append instead of inner text, append div for each letter
const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click', handleKeyClick);

function handleKeyClick(event) {
	// if statement to make sure im clicking on right thing, code only works if event. target is the actual
	// if (event.target.classList.contains(document.querySelector('.keyboard-keys'))){
	userSelectedLetters.push(event.target.innerText);
	event.target.setAttribute('disabled', true);
	onScreenUserSelectedLetters.innerText = `Letters you chose: ${userSelectedLetters.join(
		''
	)}`;
	evaluateUserGuess(event);
	checkForWin();
}

function evaluateUserGuess(event) {
	if (splitSecretWord.indexOf(event.target.innerText) >= 0) {
		//for loop find each index of the letter change inner text of that div to inner text of event target
		for (let i = 0; i < splitSecretWord.length; i++) {
			if (event.target.innerText === splitSecretWord[i]) {
				const nodeList = document.querySelectorAll('.secret-div');
				nodeList[i].innerText = event.target.innerText;
				newArray[i] = event.target.innerText;
				console.log(newArray);
			}
		}
	}

	if (splitSecretWord.indexOf(event.target.innerText) <= -1) {
		console.log('oops');
		wrongGuessNumber++;
	}
	if (wrongGuessNumber == 1) {
		document.querySelector('main').style.backgroundImage =
			"url('images/hangman2.png')";
	}
	if (wrongGuessNumber == 2) {
		document.querySelector('main').style.backgroundImage =
			"url('images/hangman3.png')";
	}
	if (wrongGuessNumber == 3) {
		document.querySelector('main').style.backgroundImage =
			"url('images/hangman4.png')";
	}
	if (wrongGuessNumber == 4) {
		document.querySelector('main').style.backgroundImage =
			"url('images/hangman5.png')";
	}
	if (wrongGuessNumber == 5) {
		document.querySelector('main').style.backgroundImage =
			"url('images/hangman6.png')";
	}
	if (wrongGuessNumber == 6) {
		document.querySelector('main').style.backgroundImage =
			"url('images/hangman7.png')";
		if ((playerOne.turn = 0)) {
			playerTwoScore++;
			playerOne.turn = 1;
		}
		alert('game over try again');
	}
}
function checkForWin() {
	if (newArray.join('') === submittedSecretWord) {
		playerOne.score++;
		playerOneScoreDisplay.innerHTML = playerOne.score;
		playerOne.turn = 1;

		gameOverOnWin();
	}
}

function gameOverOnWin() {
	document.querySelector('#game-over').style.display = 'flex';
	if (playerOne.turn === 1) {
		let playerOneReset = `Congrats <em>Player One</em>! you correctly guessed "${submittedSecretWord}"! Now it's <em>player two's</em> turn. <storng>Player One</strong> pick a secret word!`;
		document.querySelector('.game-over-screen-text').innerHTML = playerOneReset;
		saveData();
	}
}
let newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', resetGame);

function resetGame() {
	//saveData();
	window.location.reload();
}

//console.
//evaluate if the clicked button is equal to any part of the user input string
//if the letter is in the string, "reveal" all of those letters in the string
//accept user input and create string
//if user input contains special characters alert error
//submit button collects user input and clears input box
//break string into individual letters
//display string on screen with blank images instead of letters, but have length accounted for
//maybe send everything to uppercase automatically to avoid any issues with comparing

//if incorrect option is given, update to different img src
// when letter is chosen, change display to grey or some thing
