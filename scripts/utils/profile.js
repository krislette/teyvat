const PROFILE_LIMIT = 23;

export const formatProfile = (information) => information.length > PROFILE_LIMIT ?  information.substring(0, PROFILE_LIMIT) + "..." : information;