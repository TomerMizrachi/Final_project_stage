export const USER_TYPE = ["ACTOR", "RECRUITER"]
export const UNIT_TYPE = ["CM", "Inch"]
export const GENDER_TYPE = ["male", "female", "other"]
export const BODY_TYPE = ["thin", "curve", "fit", "muscular"]
export const HAIR_TYPE = ["brunette", "black", "blond", "reddish", "gray"]
export const EYES_TYPE = ["green", "blue", "brown"]
export const SKILL_TYPE = ["dancing", "singing", "musician", "mimic", "acrobatics", "clowning"]
export const LANGUAGE_TYPE = ["English", "Spanish", "French", "Arabic", "Italian", "German", "Russian"]
export const AUDITION_TYPE = ["commercial", "theatre", "cinema", "TV series", "musical"]
export const HEIGHT_RANGE = ["0 - 150", "150 - 155", "155 - 160", "160 - 165", "165 - 170", "170 - 175",
    "175 - 180", "185 - 190", "190 - 195", "195 - 200", "200 - 230"]


export const TYPECAST_OBJ = {
    age: Number,
    gender: GENDER_TYPE[Number],
    body_structure: BODY_TYPE[Number],
    height_range: HEIGHT_RANGE[Number],
    hair: HAIR_TYPE[Number],
    eyes: EYES_TYPE[Number],
    skills: SKILL_TYPE[Number],
    language: LANGUAGE_TYPE[Number]
} 
