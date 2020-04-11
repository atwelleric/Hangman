console.log('js is working');
//Get the array of chosen letters to display on screen
const userSelectedLetters = [];
const onScreenUserSelectedLetters = document.querySelector(
	'.user-selected-letters'
);
const playButton = document.querySelector('.multiplayer-button');
const submitButton = document.querySelector('.submit');
let splitSecretWord = '';
let secretWord = document.querySelector('.secret-word');
let submittedSecretWord = '';


playButton.addEventListener('click', handlePlayButtonClick);

//Later, two seperate arrays that will put incorrect letters on one side, correct letters on the other

// let splitSecretWord = '';
// submitButton.addEventListener('click', handleSubmitButton);

// function handleSubmitButton() {
// 	submittedSecretWord = secretWord.value;
// 	//cant figure out how to reset the field
// 	//secretWord.reset();
// 	//or once submitted, toggle hidden class onto the input box and submit button. another option is have submit and input on different screen or page.
//     // also could set the .value of the input to an empty string after the button submits
// 	splitSecretWord = submittedSecretWord.split('');
// 	console.log(splitSecretWord);
// }
function handlePlayButtonClick() {
	//transfom screen to display input box, submit botton, and submit instructions. making the rest of the page options disapear.
	playButton.remove();
	let hiddenSubmit = document.querySelector('.hidden');
	hiddenSubmit.classList.toggle('hidden');
}
submitButton.addEventListener('click', handleSubmitButton);

function handleSubmitButton(event) {
    event.preventDefault();
	window.location.href = 'gamescreen.html';
    submittedSecretWord = secretWord.value;
	//or once submitted, toggle hidden class onto the input box and submit button. another option is have submit and input on different screen or page.
	// also could set the .value of the input to an empty string after the button submits
	splitSecretWord = submittedSecretWord.split('');
    console.log(splitSecretWord);
}

const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click', handleKeyClick);

function handleKeyClick(event) {
	userSelectedLetters.push(event.target.innerText);
	onScreenUserSelectedLetters.innerText = `Letters you chose: ${userSelectedLetters}`;
	for (let i = 0; i < splitSecretWord.length; i++) {
		if (event.target.innerText === splitSecretWord[i]) {
			console.log(splitSecretWord[i]);
			//can i update .length for only letters that dont exist? remove letters that have returned true from the array?
		} else {
			console.log('wrong');
			// if number of wrong returns equals .length, then add body part??
		}
	}
	//console.log(userSelectedLetters);
	//evaluate if the clicked button is equal to any part of the user input string
	//if the letter is in the string, "reveal" all of those letters in the string
}

//accept user input and create string
//if user input contains special characters alert error
//submit button collects user input and clears input box
//break string into individual letters
//display string on screen with blank images instead of letters, but have length accounted for
//maybe send everything to uppercase automatically to avoid any issues with comparing

//if incorrect option is given, update to different img src
// when letter is chosen, change display to grey or something
