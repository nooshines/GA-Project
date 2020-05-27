//fetch Drink based on search term
async function getCocktails(searchTerm) {
  const response = await $.ajax(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
  ).catch((e) => {
    console.log(e);
  });
  console.log(response);
  showCocktails(response, searchTerm);
}

//fetch drink based on ID
async function getCocktailById(id) {
  const res = await $.ajax(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  ).catch((e) => {
    console.log(e);
  });
  console.log(res);
  showDetails(res.drinks[0]);
}

function showCocktails(data, title) {
  //if type something that is not valid or is not in the api I want to give me feedback
  if (data.drinks === null) {
    $("#result-heading").append(
      `<p class="text-white m-5">There are no search result for '${title}' ,try again!</p>`
    );
  } else {
    $("#result-heading").empty();
    $("#result-heading").append(
      `<h4 class="text-white m-5">Search Result for ${title}:</h4>`
    );
    //update UI with the result
    data.drinks.forEach((drink) => {
      let output = $("#cocktails").append(`
       <div class="drink" data-drinkID="${drink.idDrink}">
         <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
         <div class="drink-info">
           <h6>${drink.strDrink}</h6>
         </div>
       </div>
      `);
    });
  }
  $("[data-drinkID]").on("click", (e) => {
    console.log(e.currentTarget);
    //I couldnt find the way to get the id with jquery syntaxt ??
    const drinkID = e.currentTarget.getAttribute("data-drinkID");
    console.log(drinkID);
    getCocktailById(drinkID);
  });
}

function ClearDom() {
  $("#alert").empty();
  $("#search").val("");
  $("#cocktails").empty();
}

//on ready
$(() => {
  $("#submit").on("submit", (e) => {
    e.preventDefault();
    const searchTerm = $("#search").val();
    //give alert if we dont put anything and press enter
    if (searchTerm.trim()) {
      getCocktails(searchTerm);
    } else {
      $("#alert").append(
        `<p class="text-danger m-3">please enter a search term .</p>`
      );
    }
    ClearDom();
  });
});
