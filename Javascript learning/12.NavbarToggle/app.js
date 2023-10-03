//classList - show/gets all classes
//contains - checks classList for specific class
//add - add class
//remove - remove class
//toggle - toggles class



const navToggleBTN = document.querySelector('.nav-toggle');
const linksUl = document.querySelector('.links');


navToggleBTN.addEventListener('click', () => {
    linksUl.classList.toggle('show-links');
});