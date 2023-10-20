'strict'

const inputGuess = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const scoreSPAN = document.querySelector('.score');
const showMessage = document.querySelector('.message');
const mainNumber = document.querySelector('.number');

const getRandomNumber = () => Math.trunc(Math.random() * 20) + 1;
let score = 20;
let randomNumber = getRandomNumber();
mainNumber.textContent = randomNumber;

const updateMessage = (message) => {
    showMessage.textContent = message;
};

const updateScore = (newScore) => {
    score = newScore;
    scoreSPAN.textContent = score;
};

const handleCorrectGuess = () => {
    updateMessage('Correct Number!!!');
    document.body.style.backgroundColor = 'green';
    mainNumber.style.width = '30rem';
};

const handleIncorrectGuess = (isTooHigh) => {
    if (isTooHigh) {
        if (score > 1) {
            updateMessage('Too High!');
            updateScore(score - 1);
        } else {
            updateMessage('You lost the game!!!');
        }
    } else {
        updateMessage('Too Low!');
        updateScore(score - 1);
    }
};

checkBtn.addEventListener('click', function () {
    const guess = Number(inputGuess.value);
    console.log(guess, typeof guess);

    if (!guess) {
        updateMessage('No number!!');
    } else if (guess === randomNumber) {
        handleCorrectGuess();
    } else if (guess > randomNumber) {
        handleIncorrectGuess(true);
    } else if (guess < randomNumber) {
        handleIncorrectGuess(false);
    }
});