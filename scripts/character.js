import { characters, getCharacterById, loadCharacters } from "./data.js";

const DESCRIPTION_LIMIT = 150;

async function displayCharacter() {
    // Fetch the character to be displayed from the URL
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");
    
    if (characterId) {
        await loadCharacters();

        const character = getCharacterById(characters, characterId);

        if (character) {
            // Change the icon of the website based on the character
            document.querySelector(".favicon").href = character.favicon;
            document.querySelector("title").textContent = `View ${character.name}`;
            document.querySelector(".left-page").innerHTML = createLeftPageHTML(character);
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
                    <span class="nation-label">Nation</span><span class="nation-value">${character.nation}</span>
                </div>
                <div class="vision">
                    <span class="vision-label">Vision</span><span class="vision-value">${character.vision}</span>
                </div>
            </div>

            <!-- Signature Box -->
            <div class="signature-box">
                <p class="signature-text">${formatDescription(character.description)}</p>
            </div>
        </div>
    `;
}

const formatDescription = (description) => description.length > DESCRIPTION_LIMIT ? description.substring(0, DESCRIPTION_LIMIT) + "..." : description;

document.addEventListener("DOMContentLoaded", displayCharacter);