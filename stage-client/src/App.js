import React from 'react'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'

import { Provider } from "react-redux"
import store from "./store"

import Routes from '@router/Router'
import { ThemeProvider } from 'styled-components'
import themeConfig from '@config/theme.config'
import GlobalStyles from '@assets/styles/GlobalStyles'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken
    setAuthToken(token)
    // Decode token and get user info and exp
    const decoded = jwt_decode(token)
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))
    // Check for expired token
    const currentTime = Date.now() / 1000 // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser())
        // Redirect to login
        window.location.href = "./login"
    }
}

const App = () => { 
    return (
        <Provider store={store}>
            <ThemeProvider theme={themeConfig}>
                <>
                    <GlobalStyles />
                    <Routes />
                </>
            </ThemeProvider>
        </Provider>
    )
}

export default App
