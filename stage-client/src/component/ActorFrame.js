import React from 'react'
import Filming from './Filming'
import TextTrainer from './TextTrainer'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import { Nav } from 'rsuite'

const linkStyle = {
    paddingRight: 10
}

const navStyle = {
    textAlign: 'center',
    marginLeft: '-40px'
}

const ActorFrame = () => {
    return (
        <Router>
            <div>
                <Nav style={navStyle}>
                    <NavLink to="/" style={linkStyle}>Home</NavLink>
                    <NavLink to="/TextTrainer" style={linkStyle}>TextTrainer</NavLink>
                    <NavLink to="/Filming" style={linkStyle}>Filming</NavLink>
                </Nav>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/TextTrainer">
                        <TextTrainer />
                    </Route>
                    <Route path="/Filming">
                        <Filming  />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default ActorFrame


