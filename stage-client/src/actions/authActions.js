import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, SET_USER_EMAIL } from './types'

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/user/register", userData)
        .then(res => {
            if (userData.type === "actor") {
                dispatch({
                    type: SET_USER_EMAIL,
                    payload: { email: res.data.Email }
                })
                history.push('/signup/' + userData.type + '/profile')
            } else {
                history.push('/login')
            }
        }) // re-direct actor to complete sign up recruiter to login
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
// Register Actor
export const registerActor = (actorData, history) => dispatch => {
    axios
        .post("/actor", actorData)
        .then(res => history.push('/login')) // re-direct successful register
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/user/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token)
            // Set token to Auth header
            setAuthToken(token)
            // Decode token to get user data
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken")
    // Remove auth header for future requests
    setAuthToken(false)
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}