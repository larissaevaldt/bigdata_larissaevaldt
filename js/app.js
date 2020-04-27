const api_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?";

//select the submit button
const submit = document.getElementById("submit");
//add an event listener to execute this code when the button is clicked
submit.addEventListener("click", async (event) => {
  //select the value user entered in the input box
  const cocktailname = document.getElementById("cocktailname").value;
  console.log(cocktailname);

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const api = `${proxy}https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailname}`;
  // fetch(api)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });

  //make a get request to the api
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
});
