export const formatBirthday = (birthday) => birthday.split("-").slice(1).map((date) => date.startsWith("0") ? date.substring(1) : date).join("-");
