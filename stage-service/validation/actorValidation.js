import Validator from 'validator'
import isEmpty from 'is-empty'

const validateActorInput = (data) => {
    let errors = {}
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : ""
    let age = !isEmpty(data.age) ? data.age.toString() : ""
    data.gender = !isEmpty(data.gender) ? data.gender : ""
    data.body_structure = !isEmpty(data.body_structure) ? data.body_structure : ""
    let height = !isEmpty(data.height) ? data.height.toString() : ""
    let skills = !isEmpty(data.skills) ? data.skills.toString() : ""
    let languages = !isEmpty(data.languages) ? data.languages.toString() : ""
    data.img = !isEmpty(data.img) ? data.img : ""
    data.info = !isEmpty(data.info) ? data.info : ""
    // Password checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required"
    }
    if (Validator.isEmpty(age)) {
        errors.age = "age field is required"
    }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = "gender field is required"
    }
    if (Validator.isEmpty(data.body_structure)) {
        errors.body_structure = "body_structure field is required"
    }
    if (Validator.isEmpty(height)) {
        errors.height = "height field is required"
    }
    if (Validator.isEmpty(skills)) {
        errors.skills = "skills field is required"
    }
    if (Validator.isEmpty(languages)) {
        errors.languages = "languages field is required"
    }
    // if (Validator.isEmpty(data.img)) {
    //     errors.img = "img field is required"
    // }
    // if (Validator.isEmpty(data.info)) {
    //     errors.info = "info field is required"
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export { validateActorInput }