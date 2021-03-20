/* eslint-disable */
import React, { Component } from 'react';

import '../App.css';

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

/*
// Required imports when recording audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
*/

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

class Video extends Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, () => {
            // print version information at startup
            const version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(version_info);
        });

        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');
        });
        this.player.on('startConvert', function () {
            console.log('started converting!');
        });
        // user completed recording and stream is available
        // this.player.on('finishRecord', () => {
        //     // recordedData is a blob object containing the recorded data that
        //     // can be downloaded by the user, stored on server etc.
        //     console.log('finished recording: ', this.player.recordedData);
        //     this.player.record().saveAs({ 'video': 'my-video-file-name.webm' });
        //     // this.player.record().saveAs({'video': 'my-video-file-name.mp4'}, 'convert');
        // });
        this.player.on('finishRecord', () => {
            this.isSaveDisabled = false;
            if (this.retake == 0) {
                this.isRetakeDisabled = false;
            }
            // the blob object contains the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', this.player.recordedData);
            var formData = new FormData();
            formData.append('audiovideo',this.player.recordedData);
            
            // Execute the ajax request, in this case we have a very simple PHP script
            // that accepts and save the uploaded "video" file
            xhr('/upload-video.php', formData, function (fName) {
                console.log("Video succesfully uploaded !");
            });
            
            // Helper function to send 
            function xhr(url, data, callback) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        callback(location.href + request.responseText);
                    }
                };
                request.open('POST', url);
                // console.log('hhh',data.get('audiovideo'),url)
                request.send(data);
            }
        });
        // this.player.on('finishConvert', function () {
        //     // show save as dialog
        //     // this.player.record().saveAs({'video': 'my-video-file-name.mp4'}, 'convert');
        //     console.log('finished converting: ', this.player.convertedData);

        // });

        // error handling
        this.player.on('error', (element, error) => {
            console.warn(error);
        });

        this.player.on('deviceError', () => {
            console.error('device error:', this.player.deviceErrorCode);
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
    render() {
        return (
            <div data-vjs-player>
                <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
            </div >
            
        );
    }
}

export default Video;