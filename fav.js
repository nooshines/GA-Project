//show faves
function showFaves() {
  let faves = JSON.parse(localStorage.getItem("faves"));
  faves.forEach((drink, index) => {
    $("#showFaves").append(`
     <div class="drink">
       <img data-drinkID="${drink.idDrink}" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
      
       <div class="drink-info">
         <h6 class="mt-2">${drink.strDrink}</h6>
       </div>
     </div>
    `);
  });
}

$(() => {
  showFaves();
  //on click favourites
  $("#fave").on("click", () => {
    showFaves();
  });
});
