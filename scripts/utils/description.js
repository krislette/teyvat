const DESCRIPTION_LIMIT = 200;

export const formatDescription = (description) => description.length > DESCRIPTION_LIMIT ? description.substring(0, DESCRIPTION_LIMIT) + '..."' : description;
