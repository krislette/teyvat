import { displayCharacters, scrollToCharacter } from "../main.js";

export function handleSearch() {
  const searchButton = document.querySelector(".js-search-button");
  const searchBar = document.querySelector(".js-search-bar");

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await updateSearchResults();
  });

  searchBar.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await updateSearchResults();
    }
  });

  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  if (search) {
    searchBar.value = search === "none" || search === "all" ? "" : search;
  }
}

async function updateSearchResults() {
  const search = document.querySelector(".js-search-bar").value.toLowerCase();
  window.history.pushState({}, "", search === "" ? "/teyvat/index?search=none" : `/teyvat/index?search=${search}`);

  await displayCharacters();
  scrollToCharacter();
}
