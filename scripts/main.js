import { characters, loadCharacters } from "./data.js";
import { handleViewButtons } from "./view.js";

async function displayCharacters() {
    // Wait for characters array to get populated
    await loadCharacters();

    const charactersHTML = characters.map((character) => `
        <div class="character-container">
            <div class="character-image-container ${character.rarity === 5 ? "five-star" : "four-star"}">
                <img class="character-image" src="${character.icon}">

                <div class="character-rarity">
                    <img src="assets/icons/${character.rarity === 5 ? "five" : "four"}-star-icon.png">
                </div>

                <div class="character-vision">
                    <img src="assets/icons/${character.vision.toLowerCase()}-icon.png">
                </div>
            </div>

            <div class="character-profile">
                <h3>${character.name}</h3>
                <span class="character-title">${character.title || "Honorary Knight"}</span>
            </div>

            <div class="character-spacer"></div>

            <button class="character-view-button button-primary js-character-view-button" data-character-id="${character.id}">
                View Character
            </button>
        </div>
    `).join("");

    document.querySelector(".characters-grid").innerHTML = charactersHTML;

    handleViewButtons();

    // // Delay screen for 8 seconds before fading out
    // await new Promise(resolve => setTimeout(resolve, 8000));

    // // Trigger fade-out transition
    // const loadingScreen = document.querySelector(".loading-screen");
    // loadingScreen.classList.add("hidden");

    // // Wait for the transition to complete before fully hiding the loading screen
    // setTimeout(() => {
    //     loadingScreen.style.display = "none";
    //     document.querySelector(".hero").style.display = "flex";
    // }, 1000);
}

document.addEventListener("DOMContentLoaded", displayCharacters);