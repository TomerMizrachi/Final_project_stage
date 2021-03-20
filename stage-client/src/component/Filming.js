import React from 'react'
import Video from './Video'


const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
        /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            backend: 'WebAudio',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true,
            displayMilliseconds: true,
            plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                    bufferSize: 4096,
                    numberOfInputChannels: 1,
                    numberOfOutputChannels: 1,
                    constraints: {
                        video: false,
                        audio: true
                    }
                })
            ]
        },
        */
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
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
