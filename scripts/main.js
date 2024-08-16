import { fetchCharacters, fetchCharacterProfile, fetchCharacterIcon } from "./fetch.js";

async function displayCharacters() {
    const genshinCharacters = await fetchCharacters();

    const characterPromises = genshinCharacters.map(async (character) => {
        const characterProfile = await fetchCharacterProfile(character);
        const characterIcon = await fetchCharacterIcon(character);
        const characterRarity = characterProfile.rarity === 5 ? "five-star" : "four-star";
        const chararacterVision = characterProfile.vision.toLowerCase();

        return `
            <div class="character-container">
                <div class="character-image-container ${characterRarity}">
                    <img class="character-image" src="${characterIcon}">
                    <div class="character-rarity">
                        <img src="assets/icons/${characterRarity === "five-star" ? "five" : "four"}-star-icon.png">
                    </div>
                    <div class="character-vision">
                        <img src="assets/icons/${chararacterVision}-icon.png">
                    </div>
                </div>

                <div class="character-profile">
                    <h3>${characterProfile.name}</h3>
                    <span class="character-title">${characterProfile.title ? characterProfile.title : "Honorary Knight"}</span>
                </div>

                <div class="character-spacer">
                </div>

                <button class="character-view-button button-primary" data-character-id="${characterProfile.id}">
                    View Character
                </button>
            </div>
        `;
    });

    const charactersHTML = (await Promise.all(characterPromises)).join("");
    document.querySelector(".characters-grid").innerHTML = charactersHTML;

    // Delay screen for 8 seconds before fading out
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Trigger fade-out transition
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.classList.add("hidden");

    // Wait for the transition to complete before fully hiding the loading screen
    setTimeout(() => {
        loadingScreen.style.display = "none";
        document.querySelector(".hero").style.display = "flex";
    }, 1000);
}

document.addEventListener("DOMContentLoaded", displayCharacters);