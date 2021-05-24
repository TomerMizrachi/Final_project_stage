import { SET_AUDITIONS,GET_RELEVANT_AUDITIONS } from '../actions/types'

const initialState = {
    auditions:[],
    relevantauditions:[]
}

export default function actorReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUDITIONS:
            return {
                ...state,
                auditions: action.payload
            }
        case GET_RELEVANT_AUDITIONS:{
            return{
                ...state,
                relevantauditions: action.payload
            }
        }
        default:
            return state
    }
}