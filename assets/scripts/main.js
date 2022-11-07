// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.

  if (localStorage.getItem('recipes') === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem('recipes'));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  let main = document.querySelector('main');
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for (let i = 0; i < recipes.length; i++) {
    let card = document.createElement('recipe-card');
    card.data = recipes[i];
    main.appendChild(card);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element (holds info of new card to add)
  let form = document.querySelector('form');
  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // B4. TODO - Create a new FormData object from the <form> element reference above
    let inputData = new FormData(form);
    // B5
    let recipeObject = {};
    for (let [key, value] of inputData.entries()) {
      recipeObject[key] = value;
    }

    //B6
    let newCard = document.createElement('recipe-card');
    //B7
    newCard.data = recipeObject;
    //B8
    let main = document.querySelector('main');
    main.append(newCard);
    //B9
    let stored_recipes = getRecipesFromStorage();
    stored_recipes.push(recipeObject);
    saveRecipesToStorage(stored_recipes);
  });

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clearButton = document.getElementById('clear');
  // B11. TODO - Add a click event listener to clear local storage button
  clearButton.addEventListener('click', () => {
    // B12. TODO - Clear the local storage
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    document.querySelector("main").innerHTML = "";
  });
}
