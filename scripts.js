const userSelectedLetters = [];
const onScreenUserSelectedLetters = document.querySelector(
  '.user-selected-letters'
);
let wrongGuessNumber = 0;
const submitButton = document.querySelector('.submit');
let secretWord = document.querySelector('.secret-word');
let submittedSecretWord = '';
let splitSecretWord = [];
let newArray = [];
//Handle name submit for the player, then create an object for the player to score name and score

let playerOne = {
  name: '',
  score: 0,
  turn: 0,
};
//playerOne.name = '';
let playerTwo = {
  name: 'Challenger',
  score: 0,
};
retrieveSaveData();
let submitNameButton = document.querySelector('.submit-name');
submitNameButton.addEventListener('click', handlePlayerOneName);
if (playerOne.name !== '') {
  document.querySelector('.user-name-input').classList.add('hidden');
}
// API for the random word generation
let randomWordButton = document.querySelector('.random-word');
randomWordButton.addEventListener('click', retrieveRandomWord);
function retrieveRandomWord() {
  fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '3427bc25dfmsh7043a8ebc4ae39cp1a655djsnb955d4690e12',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      submittedSecretWord = response.word;
      return response.word;
      //inside of .then test before submitted and if it has special charecter or space, discard and rerun
    })
    .then(handleSubmitButton)
    .catch((err) => {
      console.log(err);
    });
}
//load the game on restart
//this function loads the saved data from local storage
function retrieveSaveData() {
  let retrievedData = localStorage.getItem('playerOne');
  playerOne = retrievedData ? JSON.parse(retrievedData) : playerOne;
  let retrievedDataP2 = localStorage.getItem('playerTwo');
  playerTwo = retrievedDataP2 ? JSON.parse(retrievedDataP2) : playerTwo;
}

// This function save the player score data in local storage
function saveData() {
  localStorage.setItem('playerOne', JSON.stringify(playerOne));
  localStorage.setItem('playerTwo', JSON.stringify(playerTwo));
}
// This function is for the listener that submits the players name
function handlePlayerOneName() {
  playerOne.name = document.querySelector('.player-name').value;
  localStorage.setItem('playerOne', playerOne);
  saveData();
  // document.querySelector('.user-name-input').classList.add('hidden')
}
document.querySelector('.player-one-name').innerText = playerOne.name;
submitButton.addEventListener('click', handleSubmitButton);
//This function is to handle the submit button after the user selects a word
function handleSubmitButton() {
  submittedSecretWord = secretWord.value
    ? secretWord.value
    : submittedSecretWord;
  splitSecretWord = submittedSecretWord.split('');
  secretWord.value = '';
  newArray = Array(splitSecretWord.length).fill(' ');
  for (let i = 0; i < splitSecretWord.length; i++) {
    let div = document.createElement('div');
    div.classList.add('secret-div');
    div.innerText = '_ ';
    document.querySelector('.secret-word-on-screen').append(div);
  }
}
//event listener for keyboard keys
const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click', handleKeyClick);
// this is the function to handle what happens when a key is clicked
function handleKeyClick(event) {
  // if statement to make sure im clicking on right thing, code only works if event. target is the actual
  if (event.target.classList.contains('keyboard-keys')) {
    userSelectedLetters.push(event.target.innerText);
    event.target.setAttribute('disabled', true);
    if (playerOne.turn % 2 === 0) {
      onScreenUserSelectedLetters.innerText = `${
        playerOne.name
      }'s Chosen Letters: ${userSelectedLetters.join('')}`;
    } else if (playerOne.turn % 2 !== 0) {
      onScreenUserSelectedLetters.innerText = `${
        playerTwo.name
      }'s Chosen Letters: ${userSelectedLetters.join('')}`;
    }
    evaluateUserGuess(event);
    checkForWin();
  }
}
//This is the function that evaluates wether the key pressed matches a letter in the string
function evaluateUserGuess(event) {
  if (splitSecretWord.indexOf(event.target.innerText) >= 0) {
    for (let i = 0; i < splitSecretWord.length; i++) {
      if (event.target.innerText === splitSecretWord[i]) {
        const nodeList = document.querySelectorAll('.secret-div');
        nodeList[i].innerText = event.target.innerText;
        newArray[i] = event.target.innerText;
        console.log(newArray); //  <-- :-(
      }
    }
  }

  if (splitSecretWord.indexOf(event.target.innerText) <= -1) {
    console.log('oops'); //  <-- :-(
    wrongGuessNumber++;
  }
  // If you rename your images so that the name matches the
  // wrong guesses, you could simplify all the ifs down to one line:
  // document.querySelector('main').style.backgroundImage =
  //  	"url('images/hangman" + wrongGuessNumber + ".png')";
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
    gameOverOnLoss();
  }
}
// the functionality for displaying the players scores
let playerOneScoreDisplay = document.querySelector('#player-one-score-set');
playerOneScoreDisplay.innerText = playerOne.score;
let playerTwoScoreDisplay = document.querySelector('#player-two-score-set');
playerTwoScoreDisplay.innerText = playerTwo.score;
// this function checks if the player won
function checkForWin() {
  if (newArray.join('') === submittedSecretWord && playerOne.turn % 2 == 0) {
    playerOne.score++;
    playerOneScoreDisplay.innerHTML = playerOne.score;
    playerOne.turn++;
    saveData();
    gameOverOnWin();
  } else if (
    newArray.join('') === submittedSecretWord &&
    playerOne.turn % 2 !== 0
  ) {
    playerTwo.score++;
    playerTwoScoreDisplay.innerHTML = playerTwo.score;
    playerOne.turn++;
    saveData();
    gameOverOnWin();
  }
}
// this updates the game over screen to display the result if it was a loss
function gameOverOnLoss() {
  document.querySelector('#game-over').style.display = 'flex';
  if (playerOne.turn % 2 === 0) {
    let playerReset = `Oh No! The correct word was "${submittedSecretWord}"! Nice try. <em>Challenger<em> receives <span id="red-name">+1</span>! Now it's The Challenger's turn. <span id="red-name">${playerOne.name}<span> pick a new secret word!!`;
    document.querySelector('.game-over-screen-text').innerHTML = playerReset;
    playerTwo.score++;
    playerOne.turn++;
    saveData();
  } else if (playerOne.turn % 2 !== 0) {
    let playerReset = `Oh No! The correct word was "${submittedSecretWord}"! Nice try. <em>${playerOne.name}<em> receives <span id="red-name">+1</span>! Now it's ${playerOne.name}'s turn. <span id="red-name">Challenger<span> pick a new secret word!!`;
    document.querySelector('.game-over-screen-text').innerHTML = playerReset;
    playerOne.score++;
    playerOne.turn++;
    saveData();
  }
}
// same thing as before, but for the win conditions
function gameOverOnWin() {
  document.querySelector('#game-over').style.display = 'flex';
  if (playerOne.turn % 2 === 0) {
    let playerOneReset = `Congrats <em>Player One</em>! You correctly guessed "${submittedSecretWord}"! Now it's <em>The Challenger's</em> turn. <span id='red-name'>Player One</span> pick a secret word!`;
    document.querySelector('.game-over-screen-text').innerHTML = playerOneReset;
    saveData();
  } else if (playerOne.turn % 2 !== 0) {
    let playerOneReset = `Congrats <em>Challenger</em>! You correctly guessed "${submittedSecretWord}"! Now it's <em>player one's</em> turn. <span id="red-name">Challenger</span> pick a secret word!`;
    document.querySelector('.game-over-screen-text').innerHTML = playerOneReset;
    saveData();
  }
}
//this is the button that resets the game
let newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', resetGame);

function resetGame() {
  window.location.reload();
}
