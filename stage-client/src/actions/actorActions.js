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

export const getMyAuditions = (actor_id) => dispatch => {
    console.log("actor_id", actor_id)
    axios
        .get("/actor-audition/actor", { params: { actor_id: actor_id } })
        .then(res => res.data)
        .then(data => {
            // console.log("dataTest",data)
            let auditions = data
            console.log("auditions", auditions)
            auditions.forEach(element => {
                axios
                    .get("/audition/actor", { params: { audition_id: element.audition_id } })
                    .then(res => {
                        element.auditionInfo = res.data
                    })
                    .then(res => {
                        dispatch({
                            type: SET_AUDITIONS,
                            payload: auditions
                        })
                    })
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

export const getMyRelevantAuditions = (actor_id, params) => dispatch => {

    axios
        .get("audition/getRelevantAuditions")
        .then(res => {
            // console.log("allAuditions", res)
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