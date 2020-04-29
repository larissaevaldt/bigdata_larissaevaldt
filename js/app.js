const getRandom = document.getElementById("random");
const getByName = document.getElementById("search");
const category = document.querySelector(".category");

//getting random cocktail
getRandom.addEventListener("click", () => {
  const api = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  // every time the button is clicked clear the divs inner html to clear the search
  document.getElementById("byname").innerHTML = "";
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createCocktail(data);
    });
});

getByName.addEventListener("click", () => {
  // every time the button is clicked clear the divs inner html to clear the search
  document.getElementById("byname").innerHTML = "";

  const api = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  //get the value the user entered
  const cocktailInput = document.getElementById("cocktail-name").value;
  //format the int(delete any extra spaces, make it lower case and replace spaces with plus sign)
  cocktailInput.trim();
  cocktailInput.toLowerCase();
  let replaced = cocktailInput.replace(/ /g, "+");
  //select the div the cocktails will be added to
  const cocktaildiv = document.getElementById("byname");
  //make get request to the api link and add what the user wants to search
  fetch(api + `${replaced}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createCocktail(data);
    });
});

function createCocktail(data) {
  const cocktaildiv = document.getElementById("byname");
  for (var i = 0; i < data.drinks.length; i++) {
    const insidediv = document.createElement("div");
    insidediv.classList.add("cocktail-click");

    const name = document.createElement("h3");
    name.innerHTML = data.drinks[i].strDrink;

    const photo = document.createElement("img");
    photo.src = data.drinks[i].strDrinkThumb;

    const alcoholic = document.createElement("h5");
    alcoholic.innerHTML = data.drinks[i].strAlcoholic;

    const category = document.createElement("h5");
    category.innerHTML = "Category: ";
    const categoryfromapi = document.createElement("span");
    categoryfromapi.innerHTML = data.drinks[i].strCategory;
    category.appendChild(categoryfromapi);

    const glass = document.createElement("h5");
    glass.innerHTML = "Served in: ";
    const glassfromapi = document.createElement("span");
    glassfromapi.innerHTML = data.drinks[i].strGlass;
    glass.appendChild(glassfromapi);

    const instructions = document.createElement("h5");
    instructions.innerHTML = "Instructions: ";
    const instructionsfromapi = document.createElement("span");
    instructionsfromapi.innerHTML = data.drinks[i].strInstructions;
    instructions.appendChild(instructionsfromapi);

    const ingredients = document.createElement("h5");
    ingredients.innerHTML = "Ingredients: ";
    const ingSection = document.createElement("span");
    for (var j = 1; j < 16; j++) {
      let ingredient = data.drinks[0][`strIngredient${j}`];
      let measure = data.drinks[0][`strMeasure${j}`];
      let ingRow = document.createElement("ons-list-item");

      if (ingredient != null && measure != null) {
        ingRow.innerHTML = measure + " " + ingredient + "<br />";
      } else if (ingredient != null && measure == null) {
        ingRow.innerHTML = ingredient + "<br />";
      }

      ingSection.appendChild(ingRow);
    }

    insidediv.appendChild(name);
    insidediv.appendChild(photo);
    insidediv.appendChild(alcoholic);
    insidediv.appendChild(category);
    insidediv.appendChild(glass);
    insidediv.appendChild(instructions);
    insidediv.appendChild(ingredients);
    insidediv.appendChild(ingSection);

    cocktaildiv.appendChild(insidediv);
  }
}
