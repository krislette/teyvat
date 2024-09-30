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

  // Sort characters by rarity
  filteredCharacters.sort((a, b) => b.rarity - a.rarity);

  // Then create HTML for the matching character/s
  const charactersHTML = filteredCharacters.map((character) => `
    <div class="character-container 
      ${character.id}-container 
      ${character.vision.toLowerCase()}-container 
      ${character.nation.toLowerCase()}-container 
      ${character.title}">
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
      <img src="/teyvat/assets/icons/paimon-icon.png" alt="Paimon Icon">
      <p>No characters found</p>
      <button class="button-primary view-all-button">
        View all characters
      </button>
    </div>
  `;

  const mainDiv = document.querySelector(".main");
  const headerContainer = document.querySelector(".heading-container");
  const charactersGrid = document.querySelector(".characters-grid");
  const messageContainer = document.querySelector(".message-container");

  if (filteredCharacters.length > 0) {
    // Populate and show the characters grid
    charactersGrid.innerHTML = charactersHTML;
    headerContainer.style.display = "flex";
    charactersGrid.style.display = "grid";
    messageContainer.style.display = "none";

    mainDiv.style.height = charactersGrid.scrollHeight > window.innerHeight ? "auto" : "100vh";
    mainDiv.classList.add("bottom");
  } else {
    // Hide the characters grid and the header to show the message
    messageContainer.innerHTML = noCharacterHTML;
    charactersGrid.style.display = "none";
    headerContainer.style.display = "none";
    messageContainer.style.display = "flex";
    mainDiv.style.height = "100vh";
    handleViewAll();
  }

  handleViewButtons();
}

function showLoadingScreen() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentTime = new Date().getTime();
  const oneHour = 1 * 60 * 60 * 1000;

  // Check if the last visit was more than an hour ago
  if (!lastVisit || currentTime - lastVisit > oneHour) {
    document.querySelector(".loading-screen").style.display = "flex";
    localStorage.setItem("lastVisit", currentTime.toString());
  } else {
    document.querySelector(".loading-screen").style.display = "none";
    document.querySelector(".hero").style.display = "flex";
  }
}

async function hideLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");

  // Trigger fade-out transition for loading screen
  loadingScreen.classList.add("hidden");

  setTimeout(() => {
    loadingScreen.style.display = "none";

    // Display the hero section
    const heroSection = document.querySelector(".hero");
    heroSection.style.display = "flex";

    setTimeout(() => {
      heroSection.classList.add("hero-visible");
    }, 50);
  }, 1000);
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
  return characters.filter((character) => {
    const id = character.id ? character.id.toLowerCase() : "";
    const vision = character.vision ? character.vision.toLowerCase() : "";
    const nation = character.nation ? character.nation.toLowerCase() : "";
    const title = character.title ? character.title.toLowerCase() : "";

    return id.includes(search) ||
           vision.includes(search) || 
           nation.includes(search) || 
           title.includes(search);
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
  showLoadingScreen();
  await displayCharacters();
  hideLoadingScreen();
  displayNations();
  scrollToCharacter();
  handleSearch();
  handleAnchorSearch();
});
