const progress_div = document.getElementById("progress"); // Get reference to the progress bar
const prev_btn = document.getElementById("prev"); // Get reference to the "Previous" button
const next_btn = document.getElementById("next"); // Get reference to the "Next" button
const circles_divs = document.querySelectorAll(".circle"); // Get references to all circle elements

let activeCircle = 1; // Initialize the active circle to the first step

next_btn.addEventListener("click", () => { // Add click event listener to "Next" button
  activeCircle++; // Increment the active circle by 1
  if (activeCircle > circles_divs.length) {
    activeCircle = circles_divs.length; // Ensure it doesn't exceed total circles
  }
  update(); // Refresh the UI
});

prev_btn.addEventListener("click", () => { // Add click event listener to "Previous" button
  activeCircle--; // Decrement the active circle by 1
  if (activeCircle < 1) {
    activeCircle = 1; // Ensure it doesn't go below the first step
  }
  update(); // Refresh the UI
});

function update() { // Define the update function for UI changes
  circles_divs.forEach((circle, index) => { // Loop through all circles
    if (index < activeCircle) {
      circle.classList.add("active"); // Add 'active' class to circles before the active one
    } else {
      circle.classList.remove("active"); // Remove 'active' class from others
    }
  });

  const actives = document.querySelectorAll(".active"); // Get all elements with 'active' class
  progress_div.style.width = ((actives.length - 1) / (circles_divs.length - 1)) * 100 + "%"; // Set progress bar width

  prev_btn.disabled = activeCircle === 1; // Disable "Previous" button at the first step
  next_btn.disabled = activeCircle === circles_divs.length; // Disable "Next" button at the last step
}

update(); // Initialize the UI
