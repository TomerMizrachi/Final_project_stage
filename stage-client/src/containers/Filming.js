import React from 'react'
import Video from './Video'
// import FFmpegjsEngine from 'videojs-record/dist/plugins/videojs.record.ffmpegjs.js';


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
            // convertEngine: 'ffmpeg.js',
            
            // convertWorkerURL: 'ffmpeg.js/ffmpeg-worker-mp4.js',
            // // convert recorded data to MP4 (and copy over audio data without encoding)
            // // convertOptions: ['-f', 'mp3', '-codec:a', 'libmp3lame', '-qscale:a', '2'],
            // convertOptions: ['-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-c:a', 'copy', '-f', 'mp4'],
            // pluginLibraryOptions: {
            //     outputType: 'video/mp4'
            //     // outputType: 'video/x-matroska'
            // },
            // fire the timestamp event every 100ms
            timeSlice: 100,
            videoMimeType: 'video/mp4',
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

const Filming = (props) => {
    const actor_id = props
    console.log("actor_id", actor_id)
    return (
        <div>
            <div style={video}>
                <Video style={video}{...videoJsOptions} data={actor_id}></Video>
            </div>
        </div>
    )
}

export default Filming
