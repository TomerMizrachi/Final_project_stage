import { SET_ACTORS, SET_REC_AUDITIONS, SET_DM, SET_SUBMITTED } from '../actions/types'

const initialState = {
    actors: [],
    auditions: [],
    submitted: [],
    DM: false
}

export default function recruiterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTORS:
            return {
                ...state,
                actors: action.payload
            }
        case SET_REC_AUDITIONS:
            return {
                ...state,
                auditions: action.payload
            }
        case SET_DM:
            return {    
                ...state,
                DM: action.payload
            }
        case SET_SUBMITTED:
            return{
                ...state,
                submitted: action.payload
            }
        default:
            return state
    }
}