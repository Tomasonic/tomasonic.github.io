// Get all elements with the class 'panel' and store them in a variable
const panel_div = document.querySelectorAll('.panel');

// Add a click event listener to each 'panel' element
panel_div.forEach((panel) => {
    panel.addEventListener('click', () => {
        // Call the 'removeActiveClasses' function to remove 'active' class from all panels
        removeActiveClasses();

        // Add the 'active' class to the clicked panel, making it expand
        panel.classList.add('active');
    });
});

// Function to remove the 'active' class from all 'panel' elements
function removeActiveClasses() {
    panel_div.forEach(panel => {
        panel.classList.remove('active');
    });
}
