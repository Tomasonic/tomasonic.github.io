let convertBtn = document.getElementById("convert-btn")
let inputEl = document.getElementById("input")
let lengthEl = document.getElementById("length-el")
let litersEl = document.getElementById("liters-el")
let massEl = document.getElementById("mass-el")

const meterToFeet = 3.281
const litersToGallon = 0.264
const kiloToPound = 2.204

convertBtn.addEventListener("click", function(){
    let baseValue=inputEl.value
    lengthEl.textContent = `${baseValue} meter = ${baseValue * meterToFeet} feet`
    litersEl.textContent = `${baseValue} liters = ${baseValue * litersToGallon} gallons`
    massEl.textContent = `${baseValue} kilos = ${baseValue * kiloToPound} pounds`
})
