let count = 0; // Set the initial count to 0
const value = document.querySelector("#value"); // Select the HTML element with the id "value" and store it in the 'value' variable
const btns = document.querySelectorAll(".btn"); // Select all the HTML elements with the class "btn" and store them in the 'btns' variable

btns.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    const buttonStyle = event.currentTarget.classList; // Get the classList of the clicked button

    if (buttonStyle.contains("decrease")) {
      count--; // If the "decrease" button was clicked, decrement the count
    } else if (buttonStyle.contains("increase")) {
      count++; // If the "increase" button was clicked, increment the count
    } else {
      count = 0; // If the "reset" button was clicked, reset the count to 0
    }

    value.textContent = count; // Update the text content of the 'value' element with the current count

    if (count > 0) {
      value.style.color = "green"; // Set text color to green for positive count
    } else if (count < 0) {
      value.style.color = "red"; // Set text color to red for negative count
    } else {
      value.style.color = "black"; // Set text color to black for zero count
    }
  });
});
