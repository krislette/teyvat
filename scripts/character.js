import { fetchCharacterProfile, fetchCharacterIcon } from "./fetch.js";

async function displayCharacter() {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");

    if (characterId) {
        const characterProfile = await fetchCharacterProfile(characterId);
        const characterIcon = await fetchCharacterIcon(characterId);

        // ! TODO: Make real logic for dummy logic below
        document.querySelector(".character-name").textContent = characterProfile.name;
        document.querySelector(".character-icon").src = characterIcon;
        document.querySelector(".character-vision").src = `assets/icons/${characterProfile.vision.toLowerCase()}-icon.png`;
    } else {
        console.error("Character ID not found in URL.");
    }
}

document.addEventListener("DOMContentLoaded", displayCharacter);