import { 
    fetchCharacters, 
    fetchCharacterIcon, 
    fetchCharacterNamecard, 
    fetchCharacterFavicon,
    fetchCharacterTalents
} from "./fetch.js";

export let characters = [];

// Function to load character data and populate the characters array
export async function loadCharacters() {
    try {
        const genshinCharacters = await fetchCharacters();

        const characterPromises = genshinCharacters.map(async (character) => {
            // ! Remove toLowerCase() method after API is fixed
            const characterIcon = await fetchCharacterIcon(character.id.toLowerCase());
            const characterNamecard = await fetchCharacterNamecard(character.id.toLowerCase());
            const characterFavicon = await fetchCharacterFavicon(character.id.toLowerCase());
            const characterTalents = await fetchCharacterTalents(character.id.toLowerCase());

            // Return character data with other relevant data
            return {
                ...character,
                ...characterTalents,
                icon: characterIcon,
                namecard: characterNamecard,
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