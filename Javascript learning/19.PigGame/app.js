'strict'

let currentResultOne = document.getElementById('current--0');
let playerOneTotalResult = document.getElementById('score--0');
const playerOne = document.querySelector('.player--0');

let currentResultTwo = document.getElementById('current--1');
let playerTwoTotalResult = document.getElementById('score--1');
const playerTwo = document.querySelector('.player--1');

const diceRerollImg = document.querySelector('.dice');
const playerActive = document.querySelectorAll('.player--active ')


const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const diceArray = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];

let currentPlayer = 1;

function resetScore() {
    currentResultOne.textContent = 0;
    playerOneTotalResult.textContent = 0;
    currentResultTwo.textContent = 0;
    playerTwoTotalResult.textContent = 0;
    currentPlayer = 1;
    // Add 'player--active' class to player 1 to set it as the initial active player
    playerOne.classList.add('player--active');
    // Remove 'player--active' class from player 2
    playerTwo.classList.remove('player--active');

};
newGameBtn.addEventListener('click', resetScore);

///////////////////////////////////////////////////
function rollDice() {
    let diceRoller = Math.floor(Math.random() * 6 + 1);
    diceRerollImg.src = diceArray[diceRoller - 1];

    console.log(diceRoller);

    if (diceRoller > 1) {
        if (currentPlayer === 1) {
            let addRolls = parseInt(currentResultOne.textContent, 10);
            let sum = addRolls + diceRoller;
            currentResultOne.textContent = sum;

        } else {
            let addRolls = parseInt(currentResultTwo.textContent, 10);
            let sum = addRolls + diceRoller;
            currentResultTwo.textContent = sum;
        }
    } else {
        // Reset the current player's current result to 0
        if (currentPlayer === 1) {
            currentResultOne.textContent = 0;


            currentPlayer = 2; // Switch to player 2
        } else {
            currentResultTwo.textContent = 0;
            currentPlayer = 1; // Switch back to player 1
        }
        playerOne.classList.toggle('player--active');
        playerTwo.classList.toggle('player--active');
    }
}
////////////////////////////////////////////////////////

function holdButton() {
    let currentScore;
    let totalScore;

    if (currentPlayer === 1) {
        currentScore = parseInt(currentResultOne.textContent, 10);
        totalScore = parseInt(playerOneTotalResult.textContent, 10);
        totalScore += currentScore;
        currentResultOne.textContent = 0;
        playerOneTotalResult.textContent = totalScore;
        currentPlayer = 2;

    } else {
        currentScore = parseInt(currentResultTwo.textContent, 10);
        totalScore = parseInt(playerTwoTotalResult.textContent, 10);
        totalScore += currentScore;
        currentResultTwo.textContent = 0;
        playerTwoTotalResult.textContent = totalScore;
        currentPlayer = 1;

    }
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');


}


holdBtn.addEventListener('click', holdButton);


rollDiceBtn.addEventListener('click', rollDice);