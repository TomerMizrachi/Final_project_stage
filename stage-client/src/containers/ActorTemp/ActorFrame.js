import React from 'react'
import Filming from '../Filming'  
import TextTrainer from '../TextTrainer'
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import { Nav } from 'rsuite'

const linkStyle = {
    paddingRight: 30
}
const container = {
    position: 'relative',
}



const ActorFrame = () => {
    return (
        <Router>
            <div style={container}>
                <Nav>
                    <NavLink to="/Profile" style={linkStyle}>Profile</NavLink>
                    <NavLink to="/TextTrainer" style={linkStyle}>TextTrainer</NavLink>
                    <NavLink to="/Filming" style={linkStyle}>Filming</NavLink>
                </Nav>
                <Switch>
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


