import { characters, getCharacterById, loadCharacters } from "../data/data.js";

export function handleConsButtons() {
  document.querySelectorAll(".js-cons-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { consLvl } = button.dataset;
      displayOverlay(consLvl);
    });
  });

  document.querySelector(".js-close-button").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  });
}

function displayOverlay(consLvl) {
  // Fetch character & the corresponding cons
  loadCharacters();
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");
  const character = getCharacterById(characters, characterId);
  const constellations = character.constellations;
  
  // Then prepar overlay
  const overlay = document.querySelector(".overlay");
  const overlayInfo = document.querySelector(".overlay-info");
  
  // Find cons from character cons list
  const constellation = constellations.find((cons) => cons.level === parseInt(consLvl));

  if (constellation) {
    overlayInfo.innerHTML = `
      <div class="cons-img-title">
        <img src="${character[`cons${consLvl}`]}" alt="Constellation Level ${consLvl}">
        <h2>${constellation.name}</h2>
      </div>
      <p><strong>Unlock:</strong> ${constellation.unlock}</p>
      <p>${constellation.description}</p>
    `;
  } else {
    overlayInfo.innerHTML = "<p>No information available.</p>";
  }

  overlay.style.display = "flex";
}
