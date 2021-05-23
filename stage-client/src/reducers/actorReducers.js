import { SET_AUDITIONS } from '../actions/types'

const initialState = {
    auditions:[]
}

export default function actorReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUDITIONS:
            return {
                ...state,
                auditions: action.payload
            }
        default:
            return state
    }
}