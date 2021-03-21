import React from 'react'
import Video from './Video'


const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
        record: {
            audio: true,
            video: true,
            maxLength: 60000,
            debug: true,
            // convertEngine: 'ts-ebml'
        }
    }
};

const header = {
    textAlign: 'center',
}

const video = {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)'
}

const Filming = () => {
    return (
        <div>
            <h3 style={header}>film your audiiton</h3>
            <div style={video}>
                <Video style={video}{...videoJsOptions}></Video>
            </div>
        </div>
    )
}

export default Filming
