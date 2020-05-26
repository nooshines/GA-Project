async function getCocktails(searchTerm) {
  const Cocktails = await $.ajax(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
  );
  console.log(Cocktails);
}

//on ready
$(() => {
  $("#submit").on("submit", (e) => {
    e.preventDefault();
    $("#search").empty();
    console.log("search works");
    const searchTerm = $("#search").val();
    getCocktails(searchTerm);
  });
});
