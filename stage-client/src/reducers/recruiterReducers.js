import { } from '../actions/types'

const initialState = {}

export default function recruiterReducer(state = initialState, action) {
    switch (action.type) {
        case action:
            return action.payload
        default:
            return state
    }
}