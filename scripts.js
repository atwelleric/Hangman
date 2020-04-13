console.log('js is working');
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
submitButton.addEventListener('click', handleSubmitButton);

function handleSubmitButton() {
	submittedSecretWord = secretWord.value;
	splitSecretWord = submittedSecretWord.split('');
	secretWord.value = ' ';
	newArray = Array(splitSecretWord.length).fill(' ');
	// document.querySelector('.secret-word-on-screen').innerText =
	// 	'_' splitSecretWord.length;
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

// if ((handleKeyClick = false)) {
// 	console.log('wrong');
// 	wrongGuessNumber++;
// }
function handleKeyClick(event) {
	userSelectedLetters.push(event.target.innerText);
	event.target.setAttribute('disabled', true);
	onScreenUserSelectedLetters.innerText = `Letters you chose: ${userSelectedLetters.join(
		''
	)}`;
	evaluateUserGuess(event);
	checkForWin();
	console.log(wrongGuessNumber);
	console.log(splitSecretWord);
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
		document.querySelector('.hangman-img').src = './images/hangman2.png';
	}
	if (wrongGuessNumber == 2) {
		document.querySelector('.hangman-img').src = './images/hangman3.png';
	}
	if (wrongGuessNumber == 3) {
		document.querySelector('.hangman-img').src = './images/hangman4.png';
	}
	if (wrongGuessNumber == 4) {
		document.querySelector('.hangman-img').src = './images/hangman5.png';
	}
	if (wrongGuessNumber == 5) {
		document.querySelector('.hangman-img').src = './images/hangman6.png';
	}
	if (wrongGuessNumber == 6) {
		document.querySelector('.hangman-img').src = './images/hangman7.png';
		alert('game over try again');
	}
}
function checkForWin() {
	//.includes
	// empty is false, array itteration methods, if at least one thing is false SOME
	if (newArray.join('') === submittedSecretWord) {
		alert('winner');
	}
	console.log(newArray.join());
	console.log(submittedSecretWord);
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
