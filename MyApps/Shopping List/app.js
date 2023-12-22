import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://mojapp-c166b-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
let inputValue;



const inputfieldEl = document.getElementById('input-field');
const buttonEl = document.getElementById('btn');
const shoppingListEl = document.getElementById('shopping-list');
const buttonClearEl = document.getElementById('btnClear');



buttonEl.addEventListener('click', function () {

    let inputValue = inputfieldEl.value;

    push(shoppingListInDB, inputValue);

    clearFieldEl()


});

buttonClearEl.addEventListener('click', function () {
    clearShoppingListFromDB();
    clearShoppingListEl()
});

inputfieldEl.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addItemAndPushToDB();
    }
});

// Rest of your existing code...

function addItemAndPushToDB() {
    let inputValue = inputfieldEl.value.trim();

    if (inputValue !== '') {
        push(shoppingListInDB, inputValue);
        addItemToList([null, inputValue]);
        clearFieldEl();
    }
}



onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addItemToList(currentItem)
        }

    } else {
        shoppingListEl.innerHTML = 'No items in basket'
    }



})

function clearFieldEl() {
    inputfieldEl.value = '';
};

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
};


function addItemToList(item) {

    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement('li')

    newEl.textContent = itemValue
    newEl.addEventListener("click", function () {
        let exactLocationOfTheItem = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfTheItem, null)

    });



    shoppingListEl.append(newEl)
};

function clearShoppingListFromDB() {



    // Remove all items in shoppingList node
    remove(shoppingListInDB)
        .then(() => {
            console.log('Shopping list cleared from the database.');
        })
        .catch((error) => {
            console.error('Error clearing shopping list:', error);
        });
}