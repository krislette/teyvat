import { fetchCharacters, fetchCharacterProfile, fetchCharacterIcon, fetchCharacterFavicon } from "./fetch.js";

export let characters = [];

// Function to load character data and populate the characters array
export async function loadCharacters() {
    try {
        const genshinCharacters = await fetchCharacters();

        const characterPromises = genshinCharacters.map(async (character) => {
            const characterProfile = await fetchCharacterProfile(character);
            const characterIcon = await fetchCharacterIcon(character);
            const characterFavicon = await fetchCharacterFavicon(character);

            return {
                ...characterProfile,
                icon: characterIcon,
                favicon: characterFavicon
            };
        });

        characters = await Promise.all(characterPromises);
    } catch (error) {
        console.error(error.message);
    }
}

export function getCharacterById(characters, id) {
    return characters.find((character) => character.id === id);
}