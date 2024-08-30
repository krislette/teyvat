import {
  fetchCharacters,
  fetchCharacterIcon,
  fetchCharacterNamecard,
  fetchCharacterFavicon,
  fetchCharacterTalents,
} from "./fetch.js";

export let characters = [];

// Macro definitions for 24 hours refetch and last fetch key
const TIME_LIMIT = 24 * 60 * 60 * 1000;
const LAST_FETCH_KEY = "lastFetchTime";

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

    // Object store for characters
    const characterStore = db.createObjectStore("characters", { keyPath: "id" });
    characterStore.createIndex("id", ["id"], { unique: true });

    // And a separate object store for last fetch time
    const timeStore = db.createObjectStore("time", { keyPath: "key" });
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

function saveLastFetchTime() {
  const transaction = db.transaction("time", "readwrite");
  const store = transaction.objectStore("time");
  const lastFetchTime = { key: LAST_FETCH_KEY, timestamp: Date.now() };
  store.put(lastFetchTime);
}

function getLastFetchTime() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("time", "readonly");
    const store = transaction.objectStore("time");
    const request = store.get(LAST_FETCH_KEY);

    request.onsuccess = () => resolve(request.result?.timestamp || 0);
    request.onerror = () =>
      reject(new Error("Failed to retrieve last fetch time from IndexedDB"));
  });
}

export async function loadCharacters() {
  await dbPromise;

  const lastFetchTime = await getLastFetchTime();
  const now = Date.now();

  if (now - lastFetchTime > TIME_LIMIT) {
    console.log("Time limit exceeded. Fetching new data...");
    await fetchAndStoreCharacters();
    saveLastFetchTime();
  } else {
    const storedData = await getFromIndexedDB();
    if (storedData.length > 0) {
      console.log("Loading characters from IndexedDB...");
      characters = storedData;
    } else {
      console.log("Fetching data because no data is stored...");
      await fetchAndStoreCharacters();
    }
  }
}

async function fetchAndStoreCharacters() {
  try {
    const genshinCharacters = await fetchCharacters();
    console.log("Fetched characters:", genshinCharacters);

    const characterPromises = genshinCharacters.map(async (character) => {
      const characterId = character.id.toLowerCase();
      const characterIcon = await fetchCharacterIcon(characterId);
      const characterNamecard = await fetchCharacterNamecard(characterId);
      const characterFavicon = await fetchCharacterFavicon(characterId);
      const characterTalents = await fetchCharacterTalents(characterId);

      return {
        ...character,
        ...characterTalents,
        icon: characterIcon,
        namecard: characterNamecard,
        favicon: characterFavicon,
      };
    });

    characters = await Promise.all(characterPromises);
    saveToIndexedDB(characters);
    console.log("Successfully fetched and stored all characters.");
  } catch (error) {
    console.error(error.message);
  }
}

export function getCharacterById(characters, id) {
  return characters.find((character) => character.id === id);
}
