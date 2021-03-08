export const USER_TYPE = ["ACTOR", "RECRUITER"]
export const UNIT_TYPE = ["CM", "Inch"]
export const GENDER_TYPE = ["male", "female", "other "]
export const BODY_TYPE = ["thin", "curve", "fit", "muscular"]
export const HAIR_TYPE = ["brunette", "black", "blond", "reddish", "gray"]
export const EYES_TYPE = ["green", "blue", "brown"]
export const SKILL_TYPE = ["dancing", "singing", "musician", "mimic", "acrobatics", "clowning"]
export const LANGUAGE_TYPE = ["English", "Spanish", "French", "Arabic", "Italian", "German", "Russian"]
export const AUDITION_TYPE = ["commercial", "theatre", "cinema", "TV series", "musical"]
export const HEIGHT_RANGE = ["0 - 150", "150 - 160", "160 - 170", "170 - 180", "180 - 190", "200 - 230"]


export const TYPECAST_OBJ = {
    age: string,
    gender: GENDER_TYPE[number],
    body_structure: BODY_TYPE[number],
    height_range: HEIGHT_RANGE[number],
    hair: HAIR_TYPE[number],
    eyes: EYES_TYPE[number],
    skills: SKILLS_TYPE[number],
    language: LANGUAGE_TYPE[number]
} 