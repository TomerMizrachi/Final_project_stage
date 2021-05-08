import React from 'react'
import Video from './Video'
// import WaveSurfer from 'wavesurfer.js';
// import TsEBMLEngine from 'videojs-record/dist/plugins/videojs.record.ts-ebml.js';
// import FFmpegjsEngine from 'videojs-record/dist/plugins/videojs.record.ffmpegjs.js';
// import FFmpegWasmEngine from 'videojs-record/dist/plugins/videojs.record.ffmpeg-wasm.js';
// import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
// // Register videojs-wavesurfer plugin
// import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
// WaveSurfer.microphone = MicrophonePlugin;


const videoJsOptions = {
    controls: true,
    recordToggle: false,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
        // wavesurfer: {
        //     backend: 'WebAudio',
        //     waveColor: '#36393b',
        //     progressColor: 'black',
        //     debug: true,
        //     cursorWidth: 1,
        //     msDisplayMax: 20,
        //     hideScrollbar: true,
        //     displayMilliseconds: true,
        //     // plugins: [
        //     //     // enable microphone plugin
        //     //     WaveSurfer.microphone.create({
        //     //         bufferSize: 4096,
        //     //         numberOfInputChannels: 1,
        //     //         numberOfOutputChannels: 1,
        //     //         constraints: {
        //     //             video: false,
        //     //             audio: true
        //     //         }
        //     //     })
        //     // ]
        // },
        record: {
            audio: true,
            video: true,
            maxLength: 60000,
            debug: true,
            pluginLibraryOptions: {
                // outputType: 'video/mp4'
                outputType: 'video/x-matroska'
            },
            // fire the timestamp event every 2 seconds
            timeSlice: 2000
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
            <h3 style={header}>Film your audition</h3>
            <div style={video}>
                <Video style={video}{...videoJsOptions}></Video>
            </div>
        </div>
    )
}

export default Filming
