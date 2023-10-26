const searchDiv = document.querySelector('.search');
const inputEl = document.querySelector('.input');
const btnEl = document.querySelector('.btn');

btnEl.addEventListener('click', () => {
    searchDiv.classList.toggle('active')
    inputEl.focus()
});