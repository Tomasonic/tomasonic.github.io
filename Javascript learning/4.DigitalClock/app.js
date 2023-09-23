function clock() {
  const fullDate = new Date(); // Create a new Date object to get the current date and time
  let hours = fullDate.getHours(); // Get the current hours
  let mins = fullDate.getMinutes(); // Get the current minutes
  let secs = fullDate.getSeconds(); // Get the current seconds

  if (hours < 10) {
    hours = "0" + hours; // Add leading zero if hours is less than 10
  }
  if (mins < 10) {
    mins = "0" + mins; // Add leading zero if minutes is less than 10
  }
  if (secs < 10) {
    secs = "0" + secs; // Add leading zero if seconds is less than 10
  }

  // Update the HTML elements with the formatted time
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = `:${mins}`;
  document.getElementById("second").innerHTML = `:${secs}`;
}

// Call the 'clock' function initially to display the current time
clock();

// Update the clock every 100 milliseconds (0.1 seconds) using setInterval
setInterval(clock, 100);
