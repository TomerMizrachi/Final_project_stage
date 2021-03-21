/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'

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
            this.isSaveDisabled = false
            if (this.retake == 0) {
                this.isRetakeDisabled = false
            }
            // the blob object contains the recorded data that
            // can be downloaded by the user, stored on server etc.
            var formData = new FormData()
            formData.append('file', this.player.recordedData)
            axios({
                method: "get",
                url: "http://localhost:8001/actor-audition/get_signed_url",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*'
                },
            }).then(function (response) {
                console.log("sss", response)
                var postURL = response.data.postURL;
                var getURL = response.data.getURL;
                axios({
                    method: "put",
                    url: postURL,
                    data: formData,
                    // headers: {
                    //     'Content-Type': 'video/webm', "AllowedHeaders": "*", 'Access-Control-Allow-Origin': 'https://stage-videos.s3.amazonaws.com'
                    // }
                }).then(result => {
                    console.log("Response from s3")
                    // this.setState({ success: true });
                }).catch(error => {
                    console.log(error);
                })
                console.log(getURL, postURL);
            }).catch(function (error) {
                console.log(error);
            })
        })
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