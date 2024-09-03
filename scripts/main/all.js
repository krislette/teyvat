import { displayCharacters, scrollToCharacter } from "../main.js";

export function handleViewAll() {
  document.querySelector(".view-all-button").addEventListener("click", async (event) => {
    event.preventDefault();
    window.history.pushState({}, "", "/index.html?search=all");

    await displayCharacters();
    scrollToCharacter();
  });
}
