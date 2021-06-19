import axios from 'axios'
import { GET_ERRORS, SET_ACTORS, SET_REC_AUDITIONS, SET_DM, SET_SUBMITTED } from './types'

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

export const mySubmitted = (id) => dispatch => {

    axios
        .get("/actor-audition/submitted", { params: { id: id } })
        .then(res => {
            console.log(res.data)
            dispatch({
                type: SET_SUBMITTED,
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
            dispatch({
                type: SET_DM,
                payload: true
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
} 

export const falseDM = () => dispatch =>{
    dispatch({type: SET_DM,
        payload: false})
}
