const PROFILE_LIMIT = 25;

export function formatProfile(information, character = "normal") {
  if (character.startsWith("traveler")) {
    return information;
  }

  return information.length > PROFILE_LIMIT 
    ? information.substring(0, PROFILE_LIMIT) + ".." 
    : information;
}