const celsiusInput = document.querySelector('#celsius>input');
const fahrenheitInput = document.querySelector('#fahrenheit>input');
const kelvinInput = document.querySelector('#kelvin>input');

function roundNum(num) {
    return Math.round(num * 100) / 100;
}

function converterCelsius() {
    const celTemp = parseFloat(celsiusInput.value);
    const fahTemp = (celTemp * (9 / 5)) + 32;
    const kelTemp = (celTemp + 273.15);
    fahrenheitInput.value = roundNum(fahTemp);
    kelvinInput.value = roundNum(kelTemp);

};

function converterFahrenheit() {
    const fahTemp = parseFloat(fahrenheitInput.value);
    const celTemp = (fahTemp - 32) / 1.8;
    const kelTemp = (fahTemp - 32) / 1.8 + 273.15;
    celsiusInput.value = roundNum(celTemp);
    kelvinInput.value = roundNum(kelTemp);

};

function converterKelvin() {
    const kelTemp = parseFloat(kelvinInput.value);
    const celTemp = (kelTemp - 273.15);
    const fahTemp = (kelTemp - 273.15) * 1.8 + 32;
    celsiusInput.value = roundNum(celTemp);
    fahrenheitInput.value = roundNum(fahTemp);
}

function main() {

    celsiusInput.addEventListener('input', converterCelsius);
    fahrenheitInput.addEventListener('input', converterFahrenheit);
    kelvinInput.addEventListener('input', converterKelvin);
}

main();