import React from 'react'
import TextTrainer from '../TextTrainer/TextTrainer'
import Filming from '../Filming'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import { Nav } from 'rsuite'
import StyledActorFrame from './ActorFrame.styles';

const linkStyle = {
    paddingRight: 30
}
const container = {
    position: 'relative',
}



const ActorFrame = () => {
    return (
        <StyledActorFrame>
            <div style={container}>
                <Popup trigger={<button> Audio practice</button>} position="center" modal>
                    <TextTrainer></TextTrainer>
                </Popup>
                <Popup trigger={<button> Film Audition</button>} position="center" modal>
                    <Filming></Filming>
                </Popup>
            </div>
        </StyledActorFrame>
    )
}

export default ActorFrame


