'use strict'

const modalBtns = document.querySelectorAll('.show-modal');
const modalHidden = document.querySelector('.hidden');
const overlayHidden = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');

const openModal = function () {
    modalHidden.classList.remove('hidden');
    overlayHidden.classList.remove('hidden');
};

const closeModal = function () {
    modalHidden.classList.add('hidden');
    overlayHidden.classList.add('hidden');
}

for (let i = 0; i < modalBtns.length; i++)
    modalBtns[i].addEventListener('click', openModal)


closeButton.addEventListener('click', closeModal);
overlayHidden.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalHidden.classList.contains('hidden')) {
        closeModal();
    }
});