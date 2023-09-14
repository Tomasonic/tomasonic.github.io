// we are setting const variable as kelvin to 293
const kelvin = 293;

// we are converting kelvins to celsius
const celsius = 291 - 273;

// we are calculating fahrenheits
let fahrenheit = celsius * (9 / 5) + 32;

// usally we are getting decimals and we are rounding down the numbers
fahrenheit = Math.floor(fahrenheit);


console.log(`The temperature is ${fahrenheit} degrees Fahrenheit`);
