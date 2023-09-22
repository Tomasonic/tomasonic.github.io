const panel_div = document.querySelectorAll('.panel')

panel_div.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panel_div.forEach(panel => { panel.classList.remove('active')

    })
}