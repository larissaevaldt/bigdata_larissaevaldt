const getRandom = document.getElementById("random");
const getByName = document.getElementById("search");
const category = document.querySelector(".category");
const alcohol = document.querySelector(".alcohol");
const glass = document.querySelector(".glass");
const instructions = document.querySelector(".instructions");
const ingredients = document.querySelector(".ingredients");

//getting random cocktail
getRandom.addEventListener("click", () => {
  const api = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let shadesEl = document.getElementById("cocktail-div");
      console.log(shadesEl);
      shadesEl.classList.remove("cocktail");
      shadesEl.classList.add("cocktail-click");

      document.getElementById("name").innerHTML = data.drinks[0].strDrink;
      document.getElementById("imageid").src = data.drinks[0].strDrinkThumb;
      alcohol.innerHTML = data.drinks[0].strAlcoholic;
      category.innerHTML = data.drinks[0].strCategory;
      glass.innerHTML = data.drinks[0].strGlass;
      instructions.innerHTML = data.drinks[0].strInstructions;

      let ingSection = document.querySelector("#ingredient-section");
      ingSection.innerHTML = "";

      for (var i = 1; i < 16; i++) {
        let ingredient = data.drinks[0][`strIngredient${i}`];
        let measure = data.drinks[0][`strMeasure${i}`];
        let ingRow = document.createElement("ons-list-item");

        if (ingredient != null && measure != null) {
          ingRow.innerHTML = measure + "    " + ingredient + "<br />";
        } else if (ingredient != null && measure == null) {
          ingRow.innerHTML = ingredient + "<br />";
        }

        ingSection.appendChild(ingRow);
      }
    });
});

getByName.addEventListener("click", () => {
  const api = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  const cocktailInput = document.getElementById("cocktail-name").value;
  cocktailInput.trim();
  cocktailInput.toLowerCase();
  let replaced = cocktailInput.replace(/ /g, "+");

  fetch(api + `${replaced}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
});
