// Step 1: Selecting DOM elements and initializing variables

// Select the container element with the class "container"
const container_div = document.querySelector('.container');

// Select all seat elements that do not have the class "occupied"
const seat_divs = document.querySelectorAll('.row .seat:not(.occupied)');

// Select the element with the ID "count"
const count_span = document.getElementById('count');

// Select the element with the ID "total"
const total_span = document.getElementById('total');

// Select the element with the ID "movie"
const movieContainer_div = document.getElementById('movie');

// Initialize the ticketPrice variable with the value of the selected movie's price
let ticketPrice = +movieContainer_div.value;

// Step 2: Define a function to save selected movie index and price to localStorage

function setMovieData(movieIndex, moviePrice) {
    // Save the selected movie index and price to localStorage
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Step 3: Define a function to update the selected seats count and total price

function updateSelectedCount() {
    // Select all seats with the "selected" class
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Create an array of seat indices
    const seatIndex = [...selectedSeats].map(seat => [...seat_divs].indexOf(seat));

    // Save the selected seat indices to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    // Calculate the selected seats count
    const selectedSeatsCount = selectedSeats.length;

    // Update the displayed count and total based on the ticket price
    count_span.innerText = selectedSeatsCount;
    total_span.innerText = selectedSeatsCount * ticketPrice;
}

// Step 4: Define a function to populate UI with data from localStorage

function populateUI() {
    // Retrieve the selected seats data from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // If there are selected seats in localStorage, add the "selected" class to those seats
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seat_divs.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    // Retrieve the selected movie index from localStorage and set the corresponding option as selected
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieContainer_div.selectedIndex = selectedMovieIndex;
    }
}

// Step 5: Add event listeners

// Add an event listener to the movie select dropdown
movieContainer_div.addEventListener('change', e => {
    // Update the ticket price and save the selected movie data
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    // Update the selected seats count and total
    updateSelectedCount();
});

// Add an event listener to the container for seat clicks
container_div.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // Toggle the "selected" class for the clicked seat
        e.target.classList.toggle('selected');
        // Update the selected seats count and total
        updateSelectedCount();
    }
});

// Step 6: Initialize the count and total
updateSelectedCount();
