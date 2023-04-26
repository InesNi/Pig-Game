'use strict';

const WINNING_SCORE = 100;

// Selecting elements
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/* 
Storing player related elements in lists of 2, where first element is belonging to player 1 and the second is equivalent element belonging to player 2. 
Active player will be represented by responding index value (activePlayer = 0 for Player 1, activePlayer = 1 for Player 2) which enables us to access the wanted elements using activePlayer variable as index.
*/

const playerElements = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

const scoreElements = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];

const currentScoreElements = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];

// 'playing' variable represents state of the game, used to stop btn functionality when game is won
let activePlayer, playing, scores, currentScore;

function setGame() {
  // 1. Clean up if not first game
  try {
    playerElements[activePlayer].classList.remove(
      'player--winner',
      'player--active'
    );
    currentScoreElements[activePlayer].textContent = 0;
  } catch (err) {
    // Do nothing, if errors it's the first game(activePlayer not set up yet), no need for clean up
  }

  // 2. Re/set the scores and state
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  // 3. Re/set display
  scoreElements.forEach(el => (el.textContent = 0));
  diceElement.classList.add('hidden');

  // 4. Set Player 1 as active player
  activePlayer = 0;
  playerElements[0].classList.add('player--active');
}

function switchPlayer() {
  currentScoreElements[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer ? 0 : 1;
  playerElements[0].classList.toggle('player--active');
  playerElements[1].classList.toggle('player--active');
}

setGame();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  // 1. Generate random dice roll
  const roll = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice roll
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${roll}.png`;

  // 3. Check if roll is 1
  if (roll !== 1) {
    currentScore += roll;
    currentScoreElements[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  // 1. Update and display active player's scores
  scores[activePlayer] += currentScore;
  currentScore = 0;
  currentScoreElements[activePlayer].textContent = currentScore;
  scoreElements[activePlayer].textContent = scores[activePlayer];

  // Check if score >= WINNING_SCORE
  if (scores[activePlayer] >= WINNING_SCORE) {
    // Finish game
    playerElements[activePlayer].classList.add('player--winner');
    diceElement.classList.add('hidden');
    playing = false;
  } else {
    // Switch to new player
    switchPlayer();
  }
});

// New Game functionality
btnNew.addEventListener('click', setGame);
