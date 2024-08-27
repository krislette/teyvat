// Helper function for all image fetch requests
async function fetchImage(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${apiUrl}: ${response.status}`);
        }

        // Convert the blob into an image
        const blob = await response.blob();

        // Then return the image URL
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Helper function for all JSON fetch requests
async function fetchJson(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${apiUrl}: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
} 

export async function fetchCharacters() {
    // Used /all endpoint to get all characters w/ profile & removed fetchProfile function
    const genshinCharactersApi = "https://genshin.jmp.blue/characters/all";
    return fetchJson(genshinCharactersApi);
}

export async function fetchCharacterIcon(character) {
    const characterIconApi = `https://genshin.jmp.blue/characters/${character}/icon-big`;
    return fetchImage(characterIconApi);
}

export async function fetchCharacterNamecard(character) {
    const characterNamecardApi = `https://genshin.jmp.blue/characters/${character}/namecard-background`;

    if (character === "traveler-anemo" 
        || character === "traveler-geo"
        || character === "traveler-electro"
        || character === "traveler-dendro"
        || character === "traveler-hydro"
        || character === "traveler-pyro"
        || character === "traveler-cryo") {
        return `assets/traveler/traveler-namecard.png`;
    }

    return fetchImage(characterNamecardApi);
}

export async function fetchCharacterFavicon(character) {
    // This should be icon-side but some characters doesn't have them
    // So I settled with the plain icon
    const characterFaviconApi = `https://genshin.jmp.blue/characters/${character}/icon`;
    return fetchImage(characterFaviconApi);
}

export async function fetchCharacterTalents(character) {
    const characterNormalApi = `https://genshin.jmp.blue/characters/${character}/talent-na`;
    const characterSkillApi = `https://genshin.jmp.blue/characters/${character}/talent-skill`;
    const characterBurstApi = `https://genshin.jmp.blue/characters/${character}/talent-burst`;

    try {
        // Fetch all talents independently
        const [normalTalent, skillTalent, burstTalent] = await Promise.all([
            fetchImage(characterNormalApi),
            fetchImage(characterSkillApi),
            fetchImage(characterBurstApi),
        ]);

        // Return only the fetched talents
        return {
            normalTalent,
            skillTalent,
            burstTalent
        };
    } catch (error) {
        console.error(error.message);
    }
}