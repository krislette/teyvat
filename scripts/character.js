import { characters, loadCharacters, getCharacterById } from "./data/data.js";
import { formatDescription } from "./utils/description.js";
import { formatBirthday } from "./utils/birthday.js";

let character = {};

async function displayCharacter() {
  // Fetch the character to be displayed from the URL
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");

  if (characterId) {
    await loadCharacters();

    character = getCharacterById(characters, characterId);

    if (character) {
      // Change the icon & title of the website based on the character
      document.querySelector(".favicon").href = character.favicon;
      document.querySelector("title").textContent = `View ${character.name}`;

      // Create left & right page HTMLs
      document.querySelector(".left-page").innerHTML = createLeftPageHTML(character);
      document.querySelector(".right-page").innerHTML = createRightPageMainPageHTML(character);

      toggleButtons();
    } else {
      console.error("Character not found.");
    }
  } else {
    console.error("Character ID not found in URL.");
  }
}

function createLeftPageHTML(character) {
  return `
    <div class="profile-card">
      <div class="character-cover">
        <img src="${character.namecard}" alt="Cover" class="image">
      </div>
      
      <!-- Character Icon -->
      <div class="character-icon">
        <img src="${character.icon}" alt="Icon" class="image">
      </div>

      <!-- Character Name -->
      <div class="name-container">
        <p class="character-name">${character.name}</p>
      </div>

      <!-- Nation Vision -->
      <div class="text-data">
        <div class="nation">
          <span class="nation-label">Nation</span><span class="nation-value">${
            character.nation
          }</span>
        </div>
        <div class="vision">
          <span class="vision-label">Vision</span><span class="vision-value">${
            character.vision
          }</span>
        </div>
      </div>

      <!-- Signature Box -->
      <div class="signature-box">
        <p class="signature-text">${
          character.description
            ? formatDescription(character.description)
            : "No signature"
        }</p>
      </div>
    </div>
  `;
}

function createRightPageMainPageHTML(character) {
  return `
    <div class="details-card">
      <!-- Toggle buttons -->
      <div class="details-toggle-buttons">
        <button class="toggle-button main-page-button active">
          Main Page
        </button>
        <button class="toggle-button constellations-button">
          Constellations
        </button>
      </div>

      <hr>

      <!-- Birthday & Rarity -->
      <div class="info-container">
        <!-- Rarity container -->
        <div class="info-box">
          <img src="./assets/icons/achievements-icon.png" alt="Rarity Icon">
          
          <!-- Title and value -->
          <div class="title-value">
            <div class="info-title">
              Rarity
            </div>
            <div class="info-value">
              ${character.rarity}
            </div>
          </div>
        </div>
        
        <!-- Birthday Container -->
        <div class="info-box">
          <img src="./assets/icons/abyss-icon.png" alt="Birthday Icon">
          
          <!-- Title and value -->
          <div class="title-value">
            <div class="info-title">
              Birthday
            </div>
            <div class="info-value">
              ${formatBirthday(character.birthday)}
            </div>
          </div>
        </div>
      </div>

      <!-- Character Details caption -->
      <div class="caption">
        <img src="./assets/icons/white-star-icon.png" alt="White Star Icon">
        <span>Character Details</span>
      </div>

      <hr>

      <div class="main-details">
        <div class="detail-line">
          <span class="span-label">Title</span><span>${
            character.title
          }</span>
        </div>
        <div class="detail-line">
          <span class="span-label">Gender</span><span>${
            character.gender
          }</span>
        </div>
        <div class="detail-line">
          <span class="span-label">Weapon</span><span>${
            character.weapon
          }</span>
        </div>
        <div class="detail-line">
          <span class="span-label">Affiliation</span><span>${
            character.affiliation
          }</span>
        </div>
        <div class="detail-line">
          <span class="span-label">Constellation</span><span>${
            character.constellation
          }</span>
        </div>
      </div>
        
      <!-- Character Talents caption -->
      <div class="caption">
        <img src="./assets/icons/white-star-icon.png" alt="White Star Icon">
        <span>Character Talents</span>
      </div>

      <hr>

      <div class="talents">
        <div class="talent-containers">
          <img src="${
            character.normalTalent
          }" alt="Normal Talent Icon">
        </div>
        <div class="talent-containers">
          <img src="${character.skillTalent}" alt="Skill Talent Icon">
        </div>
        <div class="talent-containers">
          <img src="${character.burstTalent}" alt="Burst Talent Icon">
        </div>
      </div>
    </div>
  `;
}

function createRightPageConstellationsHTML(character) {
  return `
    <div class="details-card">
      <!-- Toggle buttons -->
      <div class="details-toggle-buttons">
        <button class="toggle-button main-page-button">
          Main Page
        </button>
        <button class="toggle-button constellations-button active">
          Constellations
        </button>
      </div>

      <hr>

      <!-- Constellations Content -->
      <div class="constellations-container">
        <h2>${character.name} - Constellations</h2>
      </div>
    </div>
  `;
}

function toggleButtons() {
  const mainPageButton = document.querySelector(".main-page-button");
  const constellationsButton = document.querySelector(".constellations-button");

  mainPageButton.addEventListener("click", () => {
    document.querySelector(".right-page").innerHTML = createRightPageMainPageHTML(character);
    mainPageButton.classList.add("active");
    constellationsButton.classList.remove("active");
    toggleButtons();
  });

  constellationsButton.addEventListener("click", () => {
    document.querySelector(".right-page").innerHTML = createRightPageConstellationsHTML(character);
    constellationsButton.classList.add("active");
    mainPageButton.classList.remove("active");
    toggleButtons();
  });
}

document.querySelector(".js-return-button").addEventListener("click", () => {
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");
  window.location.href = `index.html?id=${characterId}`;
});

document.addEventListener("DOMContentLoaded", displayCharacter);
