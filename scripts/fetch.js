export async function fetchCharacters() {
    const genshinCharactersApi = "https://genshin.jmp.blue/characters/";

    try {
        // Fetch the characters from the API
        const response = await fetch(genshinCharactersApi);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const genshinCharacters = await response.json();

        // This returns an array of characters based on the API
        return genshinCharacters;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchCharacterProfile(character) {
    const characterProfileApi = `https://genshin.jmp.blue/characters/${character}`;

    try {
        const response = await fetch(characterProfileApi);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const characterProfile = await response.json();

        // Return all character characteristics
        return characterProfile;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchCharacterIcon(character) {
    const characterIconApi = `https://genshin.jmp.blue/characters/${character}/icon-big`;

    try {
        const response = await fetch(characterIconApi);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const characterIconBlob = await response.blob();

        // Converet blob into an image
        const characterIcon = URL.createObjectURL(characterIconBlob);

        // Then return the image
        return characterIcon;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchCharacterNamecard(character) {
    const characterNamecardApi = `https://genshin.jmp.blue/characters/${character}/namecard-background`;

    try {
        const response = await fetch(characterNamecardApi);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const characterNamecardBlob = await response.blob();

        // Convert blob into an image
        const characterNamecard = URL.createObjectURL(characterNamecardBlob);

        // Then return the image
        return characterNamecard;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchCharacterFavicon(character) {
    // This should be icon-side but some characters doesn't have them
    // So I settled with the plain icon
    const characterFaviconApi = `https://genshin.jmp.blue/characters/${character}/icon`;

    try {
        const response = await fetch(characterFaviconApi);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const characterFaviconBlob = await response.blob();

        // Convert blob into an image
        const characterFavicon = URL.createObjectURL(characterFaviconBlob);

        // Then return the image
        return characterFavicon;
    } catch (error) {
        console.error(error.message);
    } 
}