import axios from 'axios'
import { GET_ERRORS } from './types'

export const publishAudition = (audData, history) => dispatch => {
    console.log(audData, "recruiter action publish")
    axios
        .post("/audition", audData)
        .then(res => history.push('/recruiter')) // re-direct successful register
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}