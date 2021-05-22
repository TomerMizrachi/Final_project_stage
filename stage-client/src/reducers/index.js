import { combineReducers } from 'redux'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import recruiterReducer from './recruiterReducers'

export default combineReducers({
    auth: authReducer,
    recruiter: recruiterReducer,
    errors: errorReducer
})