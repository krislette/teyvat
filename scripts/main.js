import { characters, loadCharacters } from "./data/data.js";
import { handleSearch } from "./main/search.js";
import { handleViewButtons } from "./main/view.js";
import { handleViewAll } from "./main/all.js";
import { handleAnchorSearch } from "./main/anchor.js";
import { nations } from "./data/nations.js";
import { handleNationAudio } from "./main/audio.js";
import "./main/video.js";

export async function displayCharacters() {
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

  const mainDiv = document.querySelector(".main");
  const headerTag = document.querySelector(".characters-heading");
  const charactersGrid = document.querySelector(".characters-grid");
  const messageContainer = document.querySelector(".message-container");

  if (filteredCharacters.length > 0) {
    // Populate and show the characters grid
    charactersGrid.innerHTML = charactersHTML;
    headerTag.style.display = "flex";
    charactersGrid.style.display = "grid";
    messageContainer.style.display = "none";

    mainDiv.style.height = charactersGrid.scrollHeight > window.innerHeight ? "auto" : "100vh";
    mainDiv.classList.add("bottom");
  } else {
    // Hide the characters grid and the header to show the message
    messageContainer.innerHTML = noCharacterHTML;
    charactersGrid.style.display = "none";
    headerTag.style.display = "none";
    messageContainer.style.display = "flex";
    mainDiv.style.height = "100vh";
    handleViewAll();
  }

  handleViewButtons();
}

async function showLoadingScreen() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentTime = new Date().getTime();
  const oneHour = 1 * 60 * 60 * 1000;

  // Check if the last visit was more than an hour ago
  if (!lastVisit || currentTime - lastVisit > oneHour) {
    document.querySelector(".loading-screen").style.display = "flex";

    // Delay screen for 14 seconds before fading out
    await new Promise(resolve => setTimeout(resolve, 18000));

    // Trigger fade-out transition
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.classList.add("hidden");

    setTimeout(() => {
      loadingScreen.style.display = "none";
      document.querySelector(".hero").style.display = "flex";

      localStorage.setItem("lastVisit", currentTime.toString());
    }, 1000);
  } else {
    // Skip loading screen
    document.querySelector(".loading-screen").style.display = "none";
    document.querySelector(".hero").style.display = "flex";
  }
}

function displayNations() {
  const nationsHTML = nations.map((nation) => `
    <div class="nation-container ${nation.toLowerCase}-container">
      <img src="./assets/art/${nation.toLowerCase()}.png" alt="${nation}" class="nation-image">
      <img src="./assets/icons/${nation.toLowerCase()}-icon.png" alt="${nation} Icon" class="nation-icon">
    </div>
  `).join("");

  document.querySelector(".nations").innerHTML = nationsHTML;
  handleNationAudio();
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
    return character.id.toLowerCase().includes(search) ||
           character.vision.toLowerCase().includes(search) || 
           character.nation.toLowerCase().includes(search);
  });
}

export function scrollToCharacter() {
  setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollId = params.get("id");
    const scrollSearch = params.get("search");
    
    if (scrollId || scrollSearch) {
      const selector = scrollId ? `.${scrollId}-container` : "#main";
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, 300);
}

document.addEventListener("DOMContentLoaded", async () => {
  displayCharacters();
  showLoadingScreen();
  displayNations();
  scrollToCharacter();
  handleSearch();
  handleAnchorSearch();
});
