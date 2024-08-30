import {
  fetchCharacters,
  fetchCharacterIcon,
  fetchCharacterNamecard,
  fetchCharacterFavicon,
  fetchCharacterTalents,
} from "./fetch.js";

export let characters = [];

const indexedDb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db; // Store the opened database instance

const dbPromise = new Promise((resolve, reject) => {
  const request = indexedDb.open("charactersDb", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const store = db.createObjectStore("characters", { keyPath: "id" });
    store.createIndex("id", ["id"], { unique: true });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully.");
    resolve(db);
  };

  request.onerror = (event) => {
    console.error("Failed to open database:", event.target.error);
    reject(new Error("Failed to open database"));
  };
});

function saveToIndexedDB(data) {
  if (!db) {
    console.error("Database is not opened yet!");
    return;
  }

  const transaction = db.transaction("characters", "readwrite");
  const store = transaction.objectStore("characters");
  data.forEach((character) => store.put(character));

  transaction.oncomplete = () => {
    console.log("All data successfully saved to IndexedDB.");
  };

  transaction.onerror = (event) => {
    console.error("Transaction failed:", event.target.error);
  };
}

function getFromIndexedDB() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not opened yet!"));
      return;
    }

    const transaction = db.transaction("characters", "readonly");
    const store = transaction.objectStore("characters");
    const request = store.getAll();

    request.onsuccess = () => {
      console.log("Data retrieved from IndexedDB:", request.result);
      resolve(request.result);
    };

    request.onerror = () =>
      reject(new Error("Failed to retrieve data from IndexedDB"));
  });
}

// Function to load character data and populate the characters array
export async function loadCharacters() {
  // Wait for the database to be ready before all 
  await dbPromise;

  const storedData = await getFromIndexedDB();

  if (storedData.length > 0) {
    console.log("Loading characters from IndexedDB...");
    characters = storedData;
    console.log("Successfully loaded characters from IndexedDB.");
  } else {
    console.log("Fetching all characters...");
    try {
      const genshinCharacters = await fetchCharacters();

      const characterPromises = genshinCharacters.map(async (character) => {
        // Fetch base64 assets
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
          favicon: characterFavicon,
        };
      });

      characters = await Promise.all(characterPromises);

      // Save characters to IndexedDB
      console.log("Saving data to IndexedDB...");
      saveToIndexedDB(characters);
      console.log("Successfully fetched all characters.");
    } catch (error) {
      console.error(error.message);
    }
  }
}

export function getCharacterById(characters, id) {
  return characters.find((character) => character.id === id);
}
