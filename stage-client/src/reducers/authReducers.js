import { SET_USER_EMAIL, SET_CURRENT_USER, USER_LOADING } from '../actions/types'
import isEmpty from 'is-empty'

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false, 
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_EMAIL:
            return {
                ...state,
                user: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}