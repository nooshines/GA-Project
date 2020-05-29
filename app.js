//variables
let drinks;
let faveDrinks = [];
let allDrinks = [];

//save to favourites
function saveFave(index, listArray) {
  console.log(listArray, index);
  const faveItem = listArray[parseInt(index)];
  const currentSavedItem = faveDrinks.find((item) => {
    if (item.idDrink === faveItem.idDrink) {
      return true;
    }
  });
  if (!currentSavedItem) {
    faveDrinks.push(faveItem);
    localStorage.setItem("faves", JSON.stringify(faveDrinks));
  }
}

//Load Favourites
function loadFave() {
  let fave = localStorage.getItem("faves");
  if (fave) {
    faveDrinks = JSON.parse(fave);
  } else {
    faveDrinks = [];
  }
}
//fetch Drink based on name
async function getCocktails(searchTerm) {
  const response = await $.ajax(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
  ).catch((e) => {
    console.log(e);
  });
  console.log(response);
  drinks = response.drinks;
  showCocktails(response, searchTerm);
}

//fetch drink based on ID
async function getCocktailById(id) {
  const response = await $.ajax(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  ).catch((e) => {
    console.log(e);
  });
  console.log(response.drinks[0]);
  showDetails(response.drinks[0]);
}

//Show result based on cocktail search by ID
function showDetails(data) {
  const ingredients = [];
  for (let i = 1; i <= 10; i++) {
    if (data[`strIngredient${i}`]) {
      //check if there is an actual ingredient
      ingredients.push(
        `${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);

  $("#single-cocktail").append(`
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
              <h4 class="text-dark font-weight-bold">${data.strDrink}</h4>
              <button class="close">x</button>
           </div>
           <div class="modal-body">
             <div class="single-drink">
                  <img src="${data.strDrinkThumb}" alt="${data.strDrink}">
                   <h2 class="mt-4">Instructions:</h2>
                   <p class="text-dark">${data.strInstructions}</p>
                 <h2>Ingredients</h2>
                 <ul>
                  ${ingredients
                    .map((item) => `<li class="text-dark">${item}`)
                    .join("")}
                 </ul>
                </div>
               </div>
            </div>
        </div>
      </div>
    </div>    
  `);
  $(".close").on("click", () => {
    $("#myModal").modal("hide");
  });
  $("#myModal").modal("show");
}

//Show result based on cocktail search by name
function showCocktails(data, title) {
  if (data.drinks === null) {
    $("#result-heading").append(
      `<p class="text-white m-5">There are no search result for '${title}' ,try again!</p>`
    );
  } else {
    $("#result-heading").empty();
    $("#result-heading").append(
      `<h4 class="text-white m-5">Search Result for ${title}:</h4>`
    );
    data.drinks.forEach((drink, index) => {
      $("#cocktails").append(`
       <div class="drink">
         <img data-drinkID="${drink.idDrink}" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
         <i class="fa fa-heart heart-icon" aria-hidden="true" data-drinksindex=${index}></i>
         <div class="drink-info">
           <h6 class="mt-2">${drink.strDrink}</h6>
         </div>
       </div>
      `);
    });
  }
  //add event listener
  $("[data-drinkID]").on("click", (e) => {
    console.log(e.currentTarget);
    $("#single-cocktail").empty();
    const drinkID = e.currentTarget.dataset.drinkid;
    console.log(drinkID);
    getCocktailById(drinkID);
  });
  //event listener for favourite

  $(".heart-icon").on("click", (e) => {
    let drinksIndex = e.currentTarget.dataset.drinksindex;
    console.log("drinkindex:", drinksIndex);
    // saveFave(drinksIndex, drinks);
    // $(e.currentTarget).addClass("toggle-heart");
    $(e.currentTarget).toggleClass("toggle-heart");
    let detectFave = $(e.currentTarget).hasClass("toggle-heart");
    console.log("localstorage", faveDrinks);
    if (detectFave === true) {
      saveFave(drinksIndex, drinks);
    } else if (detectFave === false) {
      console.log("detectfave", detectFave);
      // localStorage.removeItem(faveDrinks[faveDrinks.length - 1].idDrink);
      console.log(
        "localstorageremoveitem:",
        localStorage.removeItem(
          JSON.stringify(faveDrinks[faveDrinks.length - 1])
        )
      );
      faveDrinks.pop();
    }
  });
}

//Clear Dom
function ClearDom() {
  $("#alert").empty();
  $("#search").val("");
  $("#cocktails").empty();
  $("#single-cocktail").empty();
  $("#result-heading").empty();
}

//on ready
$(() => {
  loadFave();
  $("#submit").on("submit", (e) => {
    e.preventDefault();
    const searchTerm = $("#search").val();
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
