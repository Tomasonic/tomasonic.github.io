const panel_div = document.querySelectorAll(".panel"); // Select all elements with the class 'panel' and store them in panel_div.

panel_div.forEach((panel) => { // Add a click event listener to each 'panel' element.
    removeActiveClasses(); // Call the 'removeActiveClasses' function to remove the 'active' class from all panels, effectively closing any previously expanded panel.
    panel.classList.add("active"); // Add the 'active' class to the clicked panel, expanding it and changing its size.
});

function removeActiveClasses() { // Function to remove the 'active' class from all 'panel' elements.
    panel_div.forEach((panel) => { // Iterate through all 'panel' elements and remove the 'active' class.
        panel.classList.remove("active");
    });
}
