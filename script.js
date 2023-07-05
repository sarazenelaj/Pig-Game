'use strict';
//Selecing elements

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting conditions
let scores,currentScore, activePlayer, playing;
const init = function () {
  //Starting conditions
  //Alt+Arrow up/down to remove lines of code up/down;
  currentScore = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  diceEl.classList.remove('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Generate a rendom dice number
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check if dice rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //Add the Scores
    else {
      //Switch user
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active palyer's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
    
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
        document.querySelector(`#name--${activePlayer}`)
        .textContent="Winner!🏆";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
