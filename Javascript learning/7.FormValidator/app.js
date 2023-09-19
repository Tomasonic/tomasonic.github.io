//1 - pull all the DOM elements

const form_element = document.getElementById('form');
const username_label = document.getElementById('username');
const email_label = document.getElementById('email');
const password_label = document.getElementById('password');
const password2_label = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

// Check email is valid 
function isValidEm {
    
}

//event listeners
form_element.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(username.value);

    if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email, 'Email is required');
    } else {
        showSuccess(email);
    } 

    if (password2.value === '') {
        showError(password2, 'Password 2 is required');
    } else {
        showSuccess(password2);
    }
});