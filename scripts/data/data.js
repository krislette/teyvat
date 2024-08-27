import { 
    fetchCharacters, 
    fetchCharacterProfile, 
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
            const characterProfile = await fetchCharacterProfile(character);
            const characterIcon = await fetchCharacterIcon(character);
            const characterNamecard = await fetchCharacterNamecard(character);
            const characterFavicon = await fetchCharacterFavicon(character);
            const characterTalents = await fetchCharacterTalents(character);

            return {
                ...characterProfile,
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