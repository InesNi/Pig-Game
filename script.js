'use strict';

// Selecting elements
const player0Element = document.getElementById('player--0');
const player1Element = document.getElementById('player--1');
const activePlayerElement = document.getElementById(
  `player--${activePlayer}`
).textContent;
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currentScoreElement = document.getElementById(
  `current--${activePlayer}`
).textContent;
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const winningScore = 100;

// We will keep track of the scores in an array where first element will be the score of player 1 and the second of player 2. Due to this we will use index values to represent the active player(e.g when Player 1 is active it will be represented as activePlayer = 0, rather than 1)
let activePlayer, score, currentScore, playing;

function setGame() {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  activePlayer = 0;
  activePlayerElement.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  score = [0, 0];
  currentScore = 0;
  playing = true;
}

function switchPlayer() {
  currentScore = 0;
  activePlayer = activePlayer ? 0 : 1;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

setGame();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${roll}.png`;

    if (roll === 1) {
      // Switch player and reset currentScore
      switchPlayer();
    } else {
      // Add roll to currentScore
      currentScore += roll;
    }
    // Display the current score
    currentScoreElement = currentScore;
  }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    currentScore = 0;
    if (score[activePlayer] >= winningScore) {
      //style change for win
      activePlayerElement.classList.add('player--winner');
      activePlayerElement.classList.remove('player--active');
      playing = false;
    } else {
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
      switchPlayer();
    }
    currentScoreElement = currentScore;
  }
});

// New Game functionality
btnNew.addEventListener('click', function () {
  setGame();
});
