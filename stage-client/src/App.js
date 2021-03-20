import React from 'react'
import './index.css'
import ActorFrame from './component/ActorFrame';

const wrapper = {
    display: "flex",
    flexDirection: "column",
}
const header = {
    textAlign: 'center',
}
const App = () => {
    return (
        <div style={wrapper}>
            <h2 style={header}>Actor</h2>
            <ActorFrame></ActorFrame>
        </div>
    )
}



export default App


