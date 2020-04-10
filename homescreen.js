let playButton = document.querySelector('.multiplayer-button');
const submitButton = document.querySelector('.submit');
let secretWord = document.querySelector('.secret-word');

playButton.addEventListener('click', handlePlayButtonClick);

function handlePlayButtonClick() {
	//transfom screen to display input box, submit botton, and submit instructions. making the rest of the page options disapear.
	playButton.remove();
	let hiddenSubmit = document.querySelector('.hidden');
	hiddenSubmit.classList.toggle('hidden');
}
