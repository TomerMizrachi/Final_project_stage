/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'

import '../App.css';

import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import '@videojs/plugin-concat';
import 'webrtc-adapter';

import RecordRTC from 'recordrtc';
import hark from 'hark'
import Blob from 'blob';
// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

class Video extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.currSessionBlobs = [];// collect all audio blobs until silence

        this.videoPlayer = videojs(this.videoNode, this.props, () => {
            // print version information at startup
            const version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(version_info);
        });

        // Allows start/stop recording
        this.videoPlayer.deviceButton.handleClick();
        this.speach_timeout = 0;
        this.speaking = false;
        this.auto_record_active = false;
        var react_comp = this

        // device is ready
        this.videoPlayer.on('deviceReady', () => {
            console.log('Video device is ready!!');
        });


        // Time Slice event
        this.videoPlayer.on('timestamp', function () {
            // timestamps
            console.log('timestamp recording', react_comp.speaking);
            if (react_comp.speaking) {
                var blob = react_comp.videoPlayer.recordedData[react_comp.videoPlayer.recordedData.length - 1];
                react_comp.currSessionBlobs.push(blob);// recorded blob array
            } else if (react_comp.currSessionBlobs) {
                console.log('This session blobs', react_comp.currSessionBlobs);
                var sessionBlobs = react_comp.currSessionBlobs;

                // Empty for next session
                react_comp.currSessionBlobs = [];
                var merged_blob = new Blob(sessionBlobs);
                console.log('Merged blob', merged_blob);
                var formDataAudio = new FormData()
                formDataAudio.append('file', merged_blob)
                // speechToText API
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/audio",
                    data: formDataAudio.get('file'),
                    headers: {
                        'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                    }
                }).then(res => {
                    let resultTranscript = res.data.transcript
                    let expectedText = 'to be or not to be that is the question'
                    console.log("Response from speechToText", resultTranscript)
                    axios({
                        method: "get",
                        url: "http://127.0.0.1:12345/compare",
                        params: {
                            inputText: resultTranscript,
                            expectedText: expectedText
                        }
                    }).then(function (response) {
                        console.log("Response from speechToText", response)

                    }).catch(function (error) {
                        console.log(error);
                    })

                }).catch(function (error) {
                    console.log(error);
                })
            }
        });

        this.videoPlayer.onStateChanged = function (state) {
            console.log('Video player state changed', state)
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (camera) {
            var speechEvents = hark(camera, {});
            console.log(react_comp.videoPlayer)
            speechEvents.on('speaking', function () {
                console.log('[speaking] Auto record active =',react_comp.auto_record_active);
                if (react_comp.auto_record_active == false) return;
                react_comp.speaking = true;
                console.log('started speaking!');
                clearTimeout(react_comp.speach_timeout);

            });
            speechEvents.on('stopped_speaking', function () {
                if (react_comp.speaking == false) return;

                this.speach_timeout = setTimeout(function () {
                    react_comp.speaking = false;
                    console.log('Stopped speaking')
                }, 3 * 1000);

                // logging  
                var seconds = 3;
                (function looper() {
                    console.log('Recording is going to be stopped in ' + seconds + ' seconds.');
                    seconds--;
                    if (seconds <= 0) {
                        return;
                    }
                    setTimeout(looper, 1000);
                })();
            });
        });
        // user clicked the record button and started recording
        this.videoPlayer.on('startRecord', () => {
            console.log('started recording!');
            react_comp.auto_record_active = true;
        });   
       
        this.videoPlayer.on('finishRecord', () => {
            this.videoPlayer.record().saveAs({'video': 'my-video-file-name.mp4'})
            react_comp.auto_record_active = false;
            console.log("this is finish")
            react_comp.speaking = false;
            this.isSaveDisabled = false
            if (this.retake == 0) {
                this.isRetakeDisabled = false
            }
            
            console.log("herree");
            var formData = new FormData()
            formData.append('file', this.videoPlayer.recordedData)
            // save in S3
            console.log("[finish] Auto record active", react_comp.auto_record_active)
            console.log("recording", react_comp.speaking);
            axios({
                method: "get",
                url: "http://localhost:8001/actor-audition/get_signed_url",
            }).then(function (response) {
                var postURL = response.data.postURL;
                var getURL = response.data.getURL;
                delete axios.defaults.headers.common['Authorization']
                axios({
                    method: "put",
                    url: postURL,
                    data: formData.get('file'),
                    headers: {
                        'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                    }
                }).then(res => {
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

        // error handling
        this.videoPlayer.on('error', (element, error) => {
            console.warn(error);
        });

        this.videoPlayer.on('deviceError', () => {
            console.error('device error:', this.videoPlayer.deviceErrorCode);
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.videoPlayer) {
            this.videoPlayer.dispose();
        }
        if (this.audioPlayer) this.audioPlayer.dispose();
    }

    render() {
        return (
            <div>
                <button>{this.auto_record_active ? "Stop" : "Start"}</button>
                <div data-vjs-player>
                    <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
                </div>
            </div>


        );
    }
}

export default Video;