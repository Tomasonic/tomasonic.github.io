const modalBTN = document.querySelector('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBTN = document.querySelector('.close-btn');

modalBTN.addEventListener('click', function () {

    modalOverlay.classList.add('open-modal')

})

closeBTN.addEventListener('click', function () {

    modalOverlay.classList.remove('open-modal')

})