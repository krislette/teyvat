import { fetchCharacters, fetchCharacterProfile, fetchCharacterIcon } from "./fetch.js";

export let characters = [];

// Function to load character data and populate the characters array
export async function loadCharacters() {
    try {
        const genshinCharacters = await fetchCharacters();

        const characterPromises = genshinCharacters.map(async (character) => {
            const characterProfile = await fetchCharacterProfile(character);
            const characterIcon = await fetchCharacterIcon(character);

            return {
                ...characterProfile,
                icon: characterIcon,
            };
        });

        characters = await Promise.all(characterPromises);
    } catch (error) {
        console.error(error.message);
    }
}

export function getCharacterById(id) {
    return characters.find((character) => character.id === id);
}