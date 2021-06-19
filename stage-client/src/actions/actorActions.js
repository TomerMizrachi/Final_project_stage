import axios from 'axios'
import { SET_ACTOR, SET_AUDITIONS, GET_RELEVANT_AUDITIONS, GET_ERRORS, REGISTER_TO_AUDITION } from './types'

export const getActorInfo = (user_id) => dispatch => {
    axios
        .get("/actor/info", { params: { user_id: user_id } })
        .then(res => {
            dispatch({
                type: SET_ACTOR,
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

export const UpdateProfile = (actor) => dispatch => {
    axios
        .put("/actor", actor)
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const getMyAuditions = (actor_id) => dispatch => {
    axios
        .get("/actor-audition/actor", { params: { actor_id: actor_id } })
        .then(res => {
            dispatch({
                type: SET_AUDITIONS,
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


export const getAuditionMetrics = (actor_id) => dispatch => {
    // let trainingsArr=getMyAuditions(actor_id)
    // console.log("efdsfsh",trainingsArr)
}

export const registerToAudition = (actor_id, audition_id) => dispatch => {
    console.log("reg", actor_id)
    axios({
        method: 'post',
        url: '/actor-audition',
        data: {
            actor_id: actor_id,
            audition_id: audition_id,
            DM: "false",
        }
    }).then(res => {
        dispatch({
            type: REGISTER_TO_AUDITION,
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

export const getMyRelevantAuditions = (params) => dispatch => {
    console.log(params)

    axios
        .get("audition/getRelevantAuditions", { params: params })
        .then(res => {
            dispatch({
                type: GET_RELEVANT_AUDITIONS,
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