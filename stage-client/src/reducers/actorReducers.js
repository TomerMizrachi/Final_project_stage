import { SET_AUDITIONS, GET_RELEVANT_AUDITIONS, SET_ACTOR, SET_ACT_AUDITION } from '../actions/types'

const initialState = {
    auditions: [],
    relevantauditions: [],
    profile: {},
    trainerAudition: {}
}

export default function actorReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUDITIONS:
            return {
                ...state,
                auditions: action.payload
            }
        case GET_RELEVANT_AUDITIONS: {
            return {
                ...state,
                relevantauditions: action.payload
            }
        }
        case SET_ACTOR: {
            return {
                ...state,
                profile: action.payload
            }
        }
        case SET_ACT_AUDITION: {
            return {
                ...state,
                trainerAudition: action.payload
            }
        }

        default:
            return state
    }
}