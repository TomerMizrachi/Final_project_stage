import Validator from 'validator'
import isEmpty from 'is-empty'

const validateAuditionInput = (data) => {
    let errors = {}
    // Convert empty fields to an empty string so we can use validator functions
    data.recruiter_id = !isEmpty(data.recruiter_id) ? data.recruiter_id : ""
    data.name = !isEmpty(data.name) ? data.name : ""
    data.type = !isEmpty(data.type) ? data.type : ""
    data.role = !isEmpty(data.role) ? data.role : ""
    data.text_file = !isEmpty(data.text_file) ? data.text_file : ""
    data.due_date = !isEmpty(data.due_date) ? data.due_date : ""
    data.availability_date = !isEmpty(data.availability_date) ? data.availability_date : ""
    data.open_to_all = !isEmpty(data.open_to_all) ? data.open_to_all : ""
    let typecast = !isEmpty(data.typecast) ? JSON.stringify(data.typecast) : ""
    data.is_active = !isEmpty(data.is_active) ? data.is_active : ""

    if (Validator.isEmpty(data.recruiter_id)) {
        errors.recruiter_id = "recruiter_id field is required"
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "name field is required";
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = "type field is required";
    }
    if (Validator.isEmpty(data.role)) {
        errors.role = "role field is required"
    }
    if (Validator.isEmpty(data.text_file)) {
        errors.text_file = "Audition text field is required"
    }
    if (Validator.isEmpty(data.due_date)) {
        errors.due_date = "due_date field is required"
    }
    if (Validator.isEmpty(data.availability_date)) {
        errors.availability_date = "availability_date field is required"
    }
    if (Validator.isEmpty(data.open_to_all)) {
        errors.open_to_all = "open_to_all field is required"
    }
    if (Validator.isEmpty(typecast)) {
        errors.typecast = "typecast field is required"
    }
    if (Validator.isEmpty(data.is_active)) {
        errors.is_active = "is_active field is required"
    }
    if(data.text_file){
        console.log(typeof(data.text_file))
        const lines = data.text_file.split('\n')
        console.log(lines)
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export { validateAuditionInput }