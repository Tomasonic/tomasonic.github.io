const celsiusInput = document.querySelector('#celsius>input'); // Get the Celsius input field
const fahrenheitInput = document.querySelector('#fahrenheit>input'); // Get the Fahrenheit input field
const kelvinInput = document.querySelector('#kelvin>input'); // Get the Kelvin input field

function roundNum(num) { return Math.round(num * 100) / 100; } // Function to round numbers to two decimal places

function converterCelsius() {
    const celTemp = parseFloat(celsiusInput.value); // Get Celsius input value
    const fahTemp = (celTemp * (9 / 5)) + 32; // Calculate Fahrenheit equivalent
    const kelTemp = (celTemp + 273.15); // Calculate Kelvin equivalent
    fahrenheitInput.value = roundNum(fahTemp); // Update Fahrenheit input
    kelvinInput.value = roundNum(kelTemp); // Update Kelvin input
}

function converterFahrenheit() {
    const fahTemp = parseFloat(fahrenheitInput.value); // Get Fahrenheit input value
    const celTemp = (fahTemp - 32) / 1.8; // Calculate Celsius equivalent
    const kelTemp = (fahTemp - 32) / 1.8 + 273.15; // Calculate Kelvin equivalent
    celsiusInput.value = roundNum(celTemp); // Update Celsius input
    kelvinInput.value = roundNum(kelTemp); // Update Kelvin input
}

function converterKelvin() {
    const kelTemp = parseFloat(kelvinInput.value); // Get Kelvin input value
    const celTemp = (kelTemp - 273.15); // Calculate Celsius equivalent
    const fahTemp = (kelTemp - 273.15) * 1.8 + 32; // Calculate Fahrenheit equivalent
    celsiusInput.value = roundNum(celTemp); // Update Celsius input
    fahrenheitInput.value = roundNum(fahTemp); // Update Fahrenheit input
}

function main() {
    celsiusInput.addEventListener('input', converterCelsius); // Add input event listener for Celsius input
    fahrenheitInput.addEventListener('input', converterFahrenheit); // Add input event listener for Fahrenheit input
    kelvinInput.addEventListener('input', converterKelvin); // Add input event listener for Kelvin input
}

main(); // Start the temperature converter by calling the main function
