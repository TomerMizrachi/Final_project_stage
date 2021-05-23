import { SET_ACTORS } from '../actions/types'

const initialState = {
    actors:[]
}

export default function recruiterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTORS:
            return {
                ...state,
                actors: action.payload
            }
        default:
            return state
    }
}