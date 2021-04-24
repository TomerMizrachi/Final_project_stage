<<<<<<< HEAD
import React from 'react'
import Audio from './Audio'
//import WaveSurfer from 'wavesurfer.js';
// import TsEBMLEngine from 'videojs-record/dist/plugins/videojs.record.ts-ebml.js';
//import FFmpegjsEngine from 'videojs-record/dist/plugins/videojs.record.ffmpegjs.js';
//import FFmpegWasmEngine from 'videojs-record/dist/plugins/videojs.record.ffmpeg-wasm.js';

/*const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 600,
    height: 300,
    fluid: false,
    autoplay: false,
    loop: false,
    muted: false,
    plugins: {
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
        record: {
            audio: true,
            video: false,
            maxLength: 20,
            debug: true,
            displayMilliseconds: true,
            convertEngine: 'ffmpeg.js',
            // convert recorded data to MP3
            convertOptions: ['-f', 'mp3', '-codec:a', 'libmp3lame', '-qscale:a', '2'],
            // specify MP3 output mime-type
            pluginLibraryOptions: {
                outputType: 'audio/mpeg'
            },
            // use MP4 encoding worker (H.264 & AAC & MP3 encoders)
            convertWorkerURL: '/ffmpeg.js/ffmpeg-worker-mp4.js',
            // or use WebM encoding worker (VP8 & Opus encoders)
            //convertWorkerURL: '../../node_modules/ffmpeg.js/ffmpeg-worker-webm.js'
        }
    }
};*/

const header = {
    textAlign: 'center',
}

const video = {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)'
}

const TextTrainer = () => {
    return (
        <div>
            <h3 style={header}>Text Trainer</h3>
            <div style={video}>
                <Audio style={video}/*{...videoJsOptions}*/></Audio>
            </div>
        </div>
    )
}

=======
import React from 'react'
import Audio from './Audio'
//import WaveSurfer from 'wavesurfer.js';
// import TsEBMLEngine from 'videojs-record/dist/plugins/videojs.record.ts-ebml.js';
//import FFmpegjsEngine from 'videojs-record/dist/plugins/videojs.record.ffmpegjs.js';
//import FFmpegWasmEngine from 'videojs-record/dist/plugins/videojs.record.ffmpeg-wasm.js';

/*const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 600,
    height: 300,
    fluid: false,
    autoplay: false,
    loop: false,
    muted: false,
    plugins: {
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
        record: {
            audio: true,
            video: false,
            maxLength: 20,
            debug: true,
            displayMilliseconds: true,
            convertEngine: 'ffmpeg.js',
            // convert recorded data to MP3
            convertOptions: ['-f', 'mp3', '-codec:a', 'libmp3lame', '-qscale:a', '2'],
            // specify MP3 output mime-type
            pluginLibraryOptions: {
                outputType: 'audio/mpeg'
            },
            // use MP4 encoding worker (H.264 & AAC & MP3 encoders)
            convertWorkerURL: '/ffmpeg.js/ffmpeg-worker-mp4.js',
            // or use WebM encoding worker (VP8 & Opus encoders)
            //convertWorkerURL: '../../node_modules/ffmpeg.js/ffmpeg-worker-webm.js'
        }
    }
};*/

const header = {
    textAlign: 'center',
}

const video = {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)'
}

const TextTrainer = () => {
    return (
        <div>
            <h3 style={header}>Text Trainer</h3>
            <div style={video}>
                <Audio style={video}/*{...videoJsOptions}*/></Audio>
            </div>
        </div>
    )
}

>>>>>>> 362bc6b821a8f65acf6362a56176a80557d1f276
export default TextTrainer