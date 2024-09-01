import { characters, loadCharacters } from "./data/data.js";
import { handleSearch } from "./main/search.js";
import { handleViewButtons } from "./main/view.js";
import { handleViewAll } from "./main/all.js";
import "./main/audio.js";
import "./main/video.js";

async function displayCharacters() {
  // Wait for characters array to get populated
  await loadCharacters();

  // Filter characters to display when a search happens
  const filteredCharacters = filterCharacters();

  // Then create HTML for the matching character/s
  const charactersHTML = filteredCharacters.map((character) => `
    <div class="character-container 
      ${character.id}-container 
      ${character.vision.toLowerCase()}-container 
      ${character.nation.toLowerCase()}-container">
      <div class="character-image-container ${
        character.rarity === 5 ? "five-star" : "four-star"
      }">
        <img class="character-image" src="${character.icon}">

        <div class="character-rarity">
          <img src="assets/icons/${
            character.rarity === 5 ? "five" : "four"
          }-star-icon.png">
        </div>

        <div class="character-vision">
          <img src="assets/icons/${
            character.vision.toLowerCase()
          }-icon.png">
        </div>
      </div>

      <div class="character-profile">
        <h3>${character.name}</h3>
        <span class="character-title">${
          character.title || "Honorary Knight"
        }</span>
      </div>

      <div class="character-spacer">
      </div>

      <button class="character-view-button button-primary js-character-view-button" data-character-id="${
        character.id
      }">
        View Character
      </button>
    </div>
  `).join("");

  const noCharacterHTML = `
    <div class="message-container">
      <img src="../assets/icons/paimon-icon.png" alt="Paimon Icon">
      <p>No characters found</p>
      <button class="button-primary view-all-button">
        View all characters
      </button>
    </div>
  `;

  if (filteredCharacters.length > 0) {
    document.querySelector(".characters-grid").innerHTML = charactersHTML 
  } else {
    document.querySelector(".main").innerHTML += noCharacterHTML;
    handleViewAll();
  }

  handleViewButtons();

  // Delay screen for 8 seconds before fading out
  // await new Promise(resolve => setTimeout(resolve, 8000));

  // // Trigger fade-out transition
  // const loadingScreen = document.querySelector(".loading-screen");
  // loadingScreen.classList.add("hidden");

  // // Wait for the transition to complete before fully hiding the loading screen
  // setTimeout(() => {
  //   loadingScreen.style.display = "none";
  //   document.querySelector(".hero").style.display = "flex";
  // }, 1000);
}

function filterCharacters() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search")?.toLowerCase() || "";

  // Added all search parameter for showing all
  if (search === "all") {
    return characters;
  }

  // Then proceed with returning filtered characters if required
  return characters.filter(character => {
    return character.id.includes(search) ||
           character.vision.toLowerCase().includes(search) || 
           character.nation.toLowerCase().includes(search);
  });
}

function scrollToCharacter() {
  setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    const scroll = params.get("id") || params.get("search");

    if (scroll) {
      const element = document.querySelector(`.${scroll}-container`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        document.querySelector("#main").scrollIntoView({ behavior: "smooth" });
      }
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", async () => {
  await displayCharacters();
  scrollToCharacter();
  handleSearch();
});
