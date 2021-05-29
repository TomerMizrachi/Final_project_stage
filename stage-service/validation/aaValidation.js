import Validator from 'validator'
import isEmpty from 'is-empty'

const validateAAInput = (data) => {
    let errors = {}
    // Convert empty fields to an empty string so we can use validator functions
    data.audition_id = !isEmpty(data.audition_id) ? data.audition_id : ""
    data.actor_id = !isEmpty(data.actor_id) ? data.actor_id : ""
    data.DM = !isEmpty(data.DM) ? data.DM : ""
    // Password checks
    if (Validator.isEmpty(data.audition_id)) {
        errors.audition_id = "please choose specific audition before sending DM"
    }
    if (Validator.isEmpty(data.actor_id)) {
        errors.actor_id = "actor_id field is required"
    }
    if (Validator.isEmpty(data.DM)) {
        errors.DM = "DM field is required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export { validateAAInput }