import React from 'react'
import TextTrainer from '../TextTrainer/TextTrainer'
import Filming from '../Filming'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import StyledActorFrame from './ActorFrame.styles';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const linkStyle = {
    paddingRight: 30
}
const container = {
    position: 'relative',
}



const ActorFrame = () => {
    return (
        <DashboardLayout>
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
        </DashboardLayout>
    )
}

export default ActorFrame


