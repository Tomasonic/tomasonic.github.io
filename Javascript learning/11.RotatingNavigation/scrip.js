const open_button = document.getElementById('open'); // Get the 'open' button element by its ID.
const close_button = document.getElementById('close'); // Get the 'close' button element by its ID.
const container_div = document.querySelector('.container'); // Get the '.container' div element.

open_button.addEventListener('click', () => container_div.classList.add('show-nav')); // Add 'show-nav' class to 'container' when 'open' is clicked.
close_button.addEventListener('click', () => container_div.classList.remove('show-nav')); // Remove 'show-nav' class from 'container' when 'close' is clicked.
