//on ready
$(() => {});

//search cocktail
function searchCocktail(e) {
  e.preventDefault();
  const searchTerm = $("#search").val();
  console.log(searchTerm);
}

//event listeners
$("#submit").on("submit", searchCocktail);
