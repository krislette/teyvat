// Helper function for all image fetch requests
async function fetchImage(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${apiUrl}: ${response.status}`);
    }

    // Convert into blob
    const blob = await response.blob();

    // Then convert blob into base 64
    return blobToBase64(blob);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Helper function to convert a blob to a Base64 string
async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
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
  if (character.startsWith("traveler")) {
    const response = await fetch("assets/traveler/traveler-namecard.png");
    const blob = await response.blob();
    return await blobToBase64(blob);
  }

  const characterNamecardApi = `https://genshin.jmp.blue/characters/${character}/namecard-background`;
  return fetchImage(characterNamecardApi);
}

export async function fetchCharacterFavicon(character) {
  if (character.startsWith("traveler")) {
    return "assets/traveler/traveler-icon-side.png";
  }

  const characterFaviconApi = `https://genshin.jmp.blue/characters/${character}/icon-side`;
  return fetchImage(characterFaviconApi);
}

export async function fetchCharacterTalents(character) {
  const characterNormalApi = `https://genshin.jmp.blue/characters/${character}/talent-na`;
  const characterSkillApi = `https://genshin.jmp.blue/characters/${character}/talent-skill`;
  const characterBurstApi = `https://genshin.jmp.blue/characters/${character}/talent-burst`;

  try {
    const [normalTalent, skillTalent, burstTalent] = await Promise.all([
      fetchImage(characterNormalApi),
      fetchImage(characterSkillApi),
      fetchImage(characterBurstApi),
    ]);

    // Return only the fetched talents
    return {
      normalTalent,
      skillTalent,
      burstTalent,
    };
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchCharacterConstellation(character) {
  const baseApiUrl = `https://genshin.jmp.blue/characters/${character}/constellation-shape`;

  const characterConstellationApi =
    character.startsWith("traveler") 
      ? `${baseApiUrl}-lumine`
      : baseApiUrl;

  const characterCons1Api = `https://genshin.jmp.blue/characters/${character}/constellation-1`;
  const characterCons2Api = `https://genshin.jmp.blue/characters/${character}/constellation-2`;
  const characterCons3Api = `https://genshin.jmp.blue/characters/${character}/constellation-3`;
  const characterCons4Api = `https://genshin.jmp.blue/characters/${character}/constellation-4`;
  const characterCons5Api = `https://genshin.jmp.blue/characters/${character}/constellation-5`;
  const characterCons6Api = `https://genshin.jmp.blue/characters/${character}/constellation-6`;

  try {
    const [constellationImage, cons1, cons2, cons3, cons4, cons5, cons6] = await Promise.all([
      fetchImage(characterConstellationApi),
      fetchImage(characterCons1Api),
      fetchImage(characterCons2Api),
      fetchImage(characterCons3Api),
      fetchImage(characterCons4Api),
      fetchImage(characterCons5Api),
      fetchImage(characterCons6Api)
    ]);

    return {
      constellationImage,
      cons1,
      cons2,
      cons3,
      cons4,
      cons5,
      cons6
    };
  } catch (error) {
    console.error(error.message);
  }
}
