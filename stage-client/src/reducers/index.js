import { combineReducers } from 'redux'
import actorReducer from './actorReducers'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import recruiterReducer from './recruiterReducers'

export default combineReducers({
    auth: authReducer,
    recruiter: recruiterReducer,
    actor: actorReducer,
    errors: errorReducer
})