import { SET_ACTORS, SET_REC_AUDITIONS, SET_DM } from '../actions/types'

const initialState = {
    actors: [],
    auditions: [],
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
            let DM = initialState.DM
            return {    
                ...state,
                DM: !DM
            }
        default:
            return state
    }
}