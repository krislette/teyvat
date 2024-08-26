import { characters, getCharacterById, loadCharacters } from "./data.js";

async function displayCharacter() {
    // Fetch the character to be displayed from the URL
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");
    
    if (characterId) {
        await loadCharacters();

        const character = getCharacterById(characters, characterId);

        // ! TODO: Replace dummy code with actual character data
        if (character) {
            // Change the icon of the website based on the character
            document.querySelector(".favicon").href = character.favicon;
            document.querySelector("title").textContent = `View ${character.name}`;
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