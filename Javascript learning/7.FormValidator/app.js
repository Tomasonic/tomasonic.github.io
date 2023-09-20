// 1 - Select DOM elements using their IDs
const form_element = document.getElementById('form'); // Select the form element
const username_label = document.getElementById('username'); // Select the username input field
const email_label = document.getElementById('email'); // Select the email input field
const password_label = document.getElementById('password'); // Select the password input field
const password2_label = document.getElementById('password2'); // Select the confirm password input field

// Function to show an error message for an input field
function showError(input, message) {
    // Get the parent element of the input field
    const formControl = input.parentElement;
    // Set the class of the parent element to 'form-control error' for styling
    formControl.className = 'form-control error';
    // Find the <small> element within the parent element and set its text content to the error message
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show a success outline for an input field
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function to check if an email is valid using a regular expression
function checkEmail(input) {
    // Regular expression for email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Test the input value against the regular expression
    if (re.test(input.value.trim())) {
        // If it's valid, show a success outline
        showSuccess(input);
    } else {
        // If it's not valid, show an error message
        showError(input, 'Email is not valid');
    }
}

// Function to check if required fields are filled out
function checkRequired(inputArr) {
    // Loop through an array of input elements
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            // If the input is empty, show an error message with the field name
            showError(input, `${getFieldName(input)} is required`);
        } else {
            // If the input is not empty, show a success outline
            showSuccess(input);
        }
    });
}

// Function to check the length of an input field
function checkLength(input, min, max) {
    if (input.value.length < min) {
        // If the input is too short, show an error message with the field name
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        // If the input is too long, show an error message with the field name
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        // If the input length is within the valid range, show a success outline
        showSuccess(input);
    }
}

// Function to check if passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        // If passwords do not match, show an error message for the confirm password field
        showError(input2, 'Passwords do not match');
    }
}

// Function to get a formatted field name with the first letter capitalized
function getFieldName(input) {
    // Get the ID of the input field, capitalize the first letter, and concatenate it with the rest of the ID
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Add an event listener to the form's submit event
form_element.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Perform various validations when the form is submitted
    checkRequired([username_label, email_label, password_label, password2_label]);
    checkLength(username_label, 3, 15);
    checkLength(password_label, 6, 25);
    checkEmail(email_label);
    checkPasswordsMatch(password_label, password2_label);
});
