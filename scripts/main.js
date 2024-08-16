import { fetchCharacters, fetchCharacterProfile, fetchCharacterIcon } from "./fetch.js";

async function displayCharacters() {
    const genshinCharacters = await fetchCharacters();
    let charactersHTML = "";

    genshinCharacters.forEach(async (character) => {
        const characterProfile = await fetchCharacterProfile(character);
        const characterIcon = await fetchCharacterIcon(character);

        charactersHTML += `
            <div class="character-container">
                <div class="character-image-container">
                    <img class="character-image" src="${characterIcon}">
                </div>

                <div class="character-name">
                    ${characterProfile.name}
                </div>

                <div class="character-title">
                    ${characterProfile.title}
                </div>

                <div class="character-spacer">
                </div>

                <button class="character-view-button" data-character-id="${characterProfile.id}">
                    View Character
                </button>
            </div>
        `;
    });

    document.querySelector(".characters-grid").innerHTML = charactersHTML;
}

await displayCharacters();