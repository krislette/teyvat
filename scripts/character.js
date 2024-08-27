import { characters, getCharacterById, loadCharacters } from "./data/data.js";
import { toggleButtons } from "./character/details.js";
import { formatDescription } from "./utils/description.js";
import { formatBirthday } from "./utils/birthday.js";

async function displayCharacter() {
    // Fetch the character to be displayed from the URL
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");
    
    if (characterId) {
        await loadCharacters();

        const character = getCharacterById(characters, characterId);

        if (character) {
            // Change the icon & title of the website based on the character
            document.querySelector(".favicon").href = character.favicon;
            document.querySelector("title").textContent = `View ${character.name}`;

            // Create left & right page HTMLs
            document.querySelector(".left-page").innerHTML = createLeftPageHTML(character);
            // document.querySelector(".right-page").innerHTML = createRightPageHTML(character);
        } else {
            console.error("Character not found.");
        }
    } else {
        console.error("Character ID not found in URL.");
    }

    toggleButtons();
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
                <p class="signature-text">${character.description ? formatDescription(character.description) : "No signature"}</p>
            </div>
        </div>
    `;
}

// function createRightPageHTML(character) {
//     return `
//         <div class="details-card">
//             <!-- Toggle buttons -->
//             <div class="details-toggle-buttons">
//                 <button class="toggle-button main-page-button active">
//                     Main Page
//                 </button>
//                 <button class="toggle-button constellations-button">
//                     Constellations
//                 </button>
//             </div>

//             <hr>

//             <!-- Birthday & Rarity -->
//             <div class="info-container">
//                 <!-- Rarity container -->
//                 <div class="info-box">
//                     <img src="./assets/icons/achievements-icon.png" alt="Rarity Icon">
                    
//                     <!-- Title and value -->
//                     <div class="title-value">
//                         <div class="info-title">
//                             Rarity
//                         </div>
//                         <div class="info-value">
//                             ${character.rarity}
//                         </div>
//                     </div>
//                 </div>
                
//                 <!-- Birthday Container -->
//                 <div class="info-box">
//                     <img src="./assets/icons/abyss-icon.png" alt="Birthday Icon">
                    
//                     <!-- Title and valule -->
//                     <div class="title-value">
//                         <div class="info-title">
//                             Birthday
//                         </div>
//                         <div class="info-value">
//                             ${formatBirthday(character.birthday)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

document.addEventListener("DOMContentLoaded", displayCharacter);