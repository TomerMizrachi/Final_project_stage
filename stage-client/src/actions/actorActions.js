import axios from 'axios'
import { SET_AUDITIONS,GET_RELEVANT_AUDITIONS,GET_ERRORS } from './types'


export const getMyAuditions = (actor_id) => dispatch => {
    console.log("HERE!")
    axios
        .get("/actor-audition/actor", { params: { actor_id: actor_id } })
        .then(res => res.data)
        .then(data => {
            let auditions = data
            auditions.forEach(element => {
                axios
                    .get("/audition/actor", { params: { audition_id: element.audition_id } })
                    .then(res => {
                        element.auditionInfo = res.data
                        console.log(res.data)
                        console.log("AUDITIONS HERE",auditions)

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

export const getMyRelevantAuditions = (actor_id) => dispatch => {
    axios
        .get("/actor-audition/actor", { params: { actor_id: actor_id } })
        .then(res => res.data)
        .then(data => {
            let auditions = data
            auditions.forEach(element => {
                axios
                    .get("/audition/actor", { params: { audition_id: element.audition_id } })
                    .then(res => {
                        element.auditionInfo = res.data
                        console.log(res.data)
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

