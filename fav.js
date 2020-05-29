//show faves
function showFaves() {
  let faves = JSON.parse(localStorage.getItem("faves"));
  faves.forEach((drink, index) => {
    $("#showFaves").append(`
     <div class="drink" data-parentindex=${index}>
       <img data-drinkID="${drink.idDrink}" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
       <i class="fa fa-heart heart-icon toggle-heart" aria-hidden="true" data-drinksindex=${index} data-drinkID="${drink.idDrink}"></i>
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
  $(".heart-icon").on("click", (e) => {
    $(`[data-parentindex=${e.currentTarget.dataset.drinksindex}]`).remove();
    onFaveClick(e);
  });
});
