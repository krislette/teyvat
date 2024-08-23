import { getCharacterById } from "./data.js";

function displayCharacter() {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");

    if (characterId) {
        const character = getCharacterById(characterId);

        // ! TODO: Replace dummy code with actual character data
        if (character) {
            document.querySelector(".character-name").textContent = character.name;
            document.querySelector(".character-icon").src = character.icon;
            document.querySelector(".character-vision").src = `assets/icons/${character.vision.toLowerCase()}-icon.png`;
        } else {
            console.error("Character not found.");
        }
    } else {
        console.error("Character ID not found in URL.");
    }
}

document.addEventListener("DOMContentLoaded", displayCharacter);