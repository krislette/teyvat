import { characters, getCharacterById, loadCharacters } from "../data/data.js";

export async function displayOverlay(clickedItem, type) {
  await loadCharacters();

  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");
  const character = getCharacterById(characters, characterId);

  const overlay = document.querySelector(".overlay");
  const overlayInfo = document.querySelector(".overlay-info");

  let itemData, imageSrc;

  if (type === "constellation") {
    itemData = character.constellations.find((cons) => cons.level === parseInt(clickedItem));
    imageSrc = character[`cons${clickedItem}`];
  } else if (type === "talent") {
    itemData = character.skillTalents.find((talent) => talent.type === clickedItem);

    const characterTalents = {
      "NORMAL_ATTACK": "normalTalent",
      "ELEMENTAL_SKILL": "skillTalent",
      "ELEMENTAL_BURST": "burstTalent"
    };

    imageSrc = character[characterTalents[clickedItem]];
  }

  if (itemData) {
    overlayInfo.innerHTML = `
      <div class="cons-img-title">
        <img src="${imageSrc}" alt="${type === "constellation" ? `Constellation Level ${clickedItem}` : clickedItem}">
        <h2>${itemData.name}</h2>
      </div>
      <p><strong>Unlock:</strong> ${itemData.unlock}</p>
      <div class="description-text">
        <p>${itemData.description}</p>
      </div>
    `;
  } else {
    overlayInfo.innerHTML = "<p>No information available.</p>";
  }

  overlay.style.display = "flex";
}
