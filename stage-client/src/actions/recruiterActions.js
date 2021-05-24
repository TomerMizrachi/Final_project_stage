import axios from 'axios'
import { GET_ERRORS, SET_ACTORS, SET_REC_AUDITIONS, SET_DM } from './types'

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
        .get("/actor", { params: typecast })
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

export const myAuditions = (id) => dispatch => {
    axios
        .get("/audition/rec", { params: { id: id } })
        .then(res => {
            dispatch({
                type: SET_REC_AUDITIONS,
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

export const sendDM = (data) => dispatch => {
    axios
        .post("/actor-audition", data)
        .then(res => {
            dispatch(toggleDMEvent())
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
} 

export const toggleDM = () => dispatch =>{
    dispatch(toggleDMEvent())
}

export const toggleDMEvent = () => {
    return {
        type: SET_DM
    }
}