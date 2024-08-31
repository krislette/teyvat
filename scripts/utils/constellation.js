const CONSTELLATION_LIMIT = 10;

export const formatConstellationLevel = (constellation) => constellation.length > CONSTELLATION_LIMIT ? constellation.substring(0, CONSTELLATION_LIMIT) + ".." : constellation; 