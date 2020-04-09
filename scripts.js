console.log('js is working');
//Get the array of chosen letters to display on screen
const userSelectedLetters = [];
const onScreenUserSelectedLetters = document.querySelector(
	'.user-selected-letters'
);
//Later, two seperate arrays that will put incorrect letters on one side, correct letters on the other
const submitButton = document.querySelector('.submit');
let secretWord = document.querySelector('.secret-word');
let submittedSecretWord = '';
submitButton.addEventListener('click', handleSubmitButton);

function handleSubmitButton() {
	submittedSecretWord = secretWord.value;
	//cant figure out how to reset the field
	secretWord.reset();
	console.log(submittedSecretWord);
}

const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click', handleKeyClick);

function handleKeyClick(event) {
	userSelectedLetters.push(event.target.innerText);
	onScreenUserSelectedLetters.innerText = `Letters you chose: ${userSelectedLetters}`;
	console.log(userSelectedLetters);
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
