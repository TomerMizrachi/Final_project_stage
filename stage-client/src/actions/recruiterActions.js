import axios from 'axios'
import { GET_ERRORS, SET_ACTORS } from './types'

export const publishAudition = (audData, history) => dispatch => {
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

export const searchActors = (typecast) => dispatch => {
    axios
        .get("/actor",{params: typecast})
        .then(res => {
            dispatch({
                type: SET_ACTORS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
