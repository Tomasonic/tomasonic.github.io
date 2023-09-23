const userScore_span = document.getElementById("user-score"); // Get user score element
const computerScore_span = document.getElementById("computer-score"); // Get computer score element
const result_div = document.querySelector('.result > p'); // Get result element

const rock_div = document.getElementById('r'); // Get rock element
const paper_div = document.getElementById('p'); // Get paper element
const scissors_div = document.getElementById('s'); // Get scissors element

let userScore = 0; // Initialize user score
let computerScore = 0; // Initialize computer score

function getComputerChoice() { // Function to randomly choose computer's move
    const choices = ['r', 'p', 's']; // Define choices
    const randomIndex = Math.floor(Math.random() * 3); // Generate random index
    return choices[randomIndex]; // Return random choice
}

function convertToWord(letter) { // Function to convert choice letter to word form
    if (letter === 'r') return 'Rock'; // Rock
    if (letter === 'p') return 'Paper'; // Paper
    return 'Scissors'; // Scissors
}

function updateScore() { // Function to update scores in the DOM
    userScore_span.innerHTML = userScore; // Update user score
    computerScore_span.innerHTML = computerScore; // Update computer score
}

function updateResult(userChoice, computerChoice, result) { // Function to update result message
    const message = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. ${result}`; // Generate message
    result_div.innerHTML = message; // Update result message
}

function game(userChoice) { // Function to determine game outcome and update scores and result
    const computerChoice = getComputerChoice(); // Get computer's choice

    switch (userChoice + computerChoice) { // Check game outcome
        case 'rs':
        case 'pr':
        case 'sp':
            userScore++; // User wins
            updateResult(userChoice, computerChoice, 'You win!'); // Update result
            break;
        case 'rp':
        case 'ps':
        case 'sr':
            computerScore++; // Computer wins
            updateResult(userChoice, computerChoice, 'Computer wins!'); // Update result
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            updateResult(userChoice, computerChoice, 'It\'s a draw!'); // Draw
            break;
    }

    updateScore(); // Update scores
}

function main() { // Function to handle user clicks on rock, paper, and scissors
    rock_div.addEventListener('click', () => game('r')); // User chooses rock
    paper_div.addEventListener('click', () => game('p')); // User chooses paper
    scissors_div.addEventListener('click', () => game('s')); // User chooses scissors
}

main(); // Start the game
