// Get references to HTML elements for scores and results
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const result_div = document.querySelector('.result > p');

// Get references to HTML elements for rock, paper, and scissors
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

// Initialize user and computer scores
let userScore = 0;
let computerScore = 0;

// Function to randomly choose the computer's move
function getComputerChoice() {
    // Define an array of choices for the computer
    const choices = ['r', 'p', 's'];

    // Generate a random index to select a choice from the array
    const randomIndex = Math.floor(Math.random() * 3);

    // Return the randomly chosen computer's move
    return choices[randomIndex];
}

// Function to convert a choice letter to its word form
function convertToWord(letter) {
    // Use conditional statements to map choice letters to their full names
    if (letter === 'r') return 'Rock';
    if (letter === 'p') return "Paper";
    return "Scissors";
}

// Function to update the user and computer scores in the DOM
function updateScore() {
    // Update the HTML content of the score elements with the current scores
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
}

// Function to update the result message in the DOM
function updateResult(userChoice, computerChoice, result) {
    // Generate a result message using the user's and computer's choices
    const message = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. ${result}`;

    // Update the HTML content of the result element with the generated message
    result_div.innerHTML = message;
}

// Function to determine the game outcome and update scores and result
function game(userChoice) {
    // Get the computer's randomly chosen move
    const computerChoice = getComputerChoice();

    // Use a switch statement to determine the game outcome based on choices
    switch (userChoice + computerChoice) {
        case 'rs':
        case 'pr':
        case 'sp':
            // User wins: Increment the user's score and update the result message
            userScore++;
            updateResult(userChoice, computerChoice, 'You win!');
            break;
        case 'rp':
        case 'ps':
        case 'sr':
            // Computer wins: Increment the computer's score and update the result message
            computerScore++;
            updateResult(userChoice, computerChoice, 'Computer wins!');
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            // It's a draw: Update the result message
            updateResult(userChoice, computerChoice, 'It\'s a draw!');
            break;
    }

    // Update the scores displayed in the DOM
    updateScore();
}

// Function to handle user clicks on rock, paper, and scissors
function main() {
    // Add event listeners to the rock, paper, and scissors elements
    rock_div.addEventListener("click", function () {
        // When the user clicks on rock, call the game function with 'r'
        game('r'); // User chooses rock
    });

    paper_div.addEventListener("click", function () {
        // When the user clicks on paper, call the game function with 'p'
        game('p'); // User chooses paper
    });
    scissors_div.addEventListener("click", function () {
        // When the user clicks on scissors, call the game function with 's'
        game('s'); // User chooses scissors
    });
}

// Start the game by calling the main function when the page loads
main();
