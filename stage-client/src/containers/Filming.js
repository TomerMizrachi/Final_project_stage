import React from 'react'
import Video from './Video'


const videoJsOptions = {
    controls: true,
    recordToggle: true,
    bigPlayButton: true,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
        record: {
            audio: true,
            video: true,
            maxLength: 60000,
            debug: true,
            timeSlice: 100,
            videoMimeType: 'video/webm;codecs=H264',
        }
    }
}


const video = {
    position: 'relative',
}

const Filming = (props) => {
    return (
        <div>
            <div style={video}>
                <Video audition={props}{...videoJsOptions} data={props}></Video>
            </div>
        </div>
    )
}

export default Filming