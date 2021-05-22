export const USER_TYPE = ["ACTOR", "RECRUITER"]
export const UNIT_TYPE = ["CM", "Inch"]
export const GENDER_TYPE = ["Male", "Female", "Other"]
export const BODY_TYPE = ["Thin", "Curve", "Fit", "Muscular"]
export const HAIR_TYPE = ["Brunette", "Black", "Blond", "Reddish", "Gray"]
export const EYES_TYPE = ["Green", "Blue", "Brown"]
export const SKILL_TYPE = ["Dancing", "Singing", "Musician", "Mimic", "Acrobatics", "Clowning"]
export const LANGUAGE_TYPE = ["English", "Spanish", "French", "Arabic", "Italian", "German", "Russian"]
export const AUDITION_TYPE = ["Commercial", "Theatre", "Cinema", "TV series", "Musical"]
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
