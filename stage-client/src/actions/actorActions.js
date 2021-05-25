import axios from 'axios'
import { SET_ACTOR, SET_AUDITIONS, GET_RELEVANT_AUDITIONS, GET_ERRORS, REGISTER_TO_AUDITION } from './types'

export const getActorInfo = (user_id) => dispatch => {
    axios.
        get("/actor/info", { params: { user_id: user_id } })
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
    console.log(actor_id)
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

export const registerToAudition = (actor_id, audition_id) => dispatch => {
    axios({
        method: 'post',
        url: '/actor-audition',
        data: {
            actor_id: actor_id,
            lastName: audition_id,
            DM: false,
        }
    }).then(res => {
        dispatch({
            type: REGISTER_TO_AUDITION,
            payload: res
        })
    })
}

export const getMyRelevantAuditions = (actor_id) => dispatch => {
    //Michal- to check complex params after the beta
    axios
        .get("/user/" + actor_id)
        .then(data => {
            let actorId = data.data.actor_collection_id
            axios.get("/actor/" + actorId)
                .then(res => {
                    let params = {}
                    console.log("Details", res)
                    // if (res.data.age)
                    //     params.age= res.data.age
                    // if (res.height)
                    //     params.height= res.height
                    if (res.data.gender)
                        params.gender = res.data.gender
                    // if (res.data.body_structure)
                    //     params.body_structure=res.data.body_structure
                    if (res.data.eyes)
                        params.eyes = res.data.eyes
                    // if (res.data.skills)
                    //     params.skills = { $all: res.data.skills }
                    // if (res.data.languages)
                    //     params.languages = { $all: res.data.languages }
                    console.log(params)
                    axios
                        .get("audition/getRelevantAuditions", { params: params })
                        .then(res => {
                            console.log("allAuditions", res)
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

                })
        })
}