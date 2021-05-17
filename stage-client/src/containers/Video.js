/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'


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
        console.log(this)
        this.state = { auto_record_active: false }
        this.toggleAutoRecord = this.toggleAutoRecord.bind(this);
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
        this.recording = false
        this.state.auto_record_active = false;
        var react_comp = this

        // device is ready
        this.videoPlayer.on('deviceReady', () => {
            console.log('Video device is ready!!');
        });

        this.videoPlayer.onStateChanged = function (state) {
            console.log('Video player state changed', state)
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (camera) {
            var speechEvents = hark(camera, {});
            console.log(react_comp.videoPlayer)
            speechEvents.on('speaking', function () {
                console.log('[speaking] Auto record active =', react_comp.state.auto_record_active);
                if (react_comp.state.auto_record_active == false) return;
                if (!react_comp.recording) {
                    console.log('Toggle record one', react_comp.videoPlayer)
                    react_comp.videoPlayer.recordToggle.handleClick()

                }
                react_comp.speaking = true;
                console.log('started speaking!');
                clearTimeout(react_comp.speach_timeout);

            });
            speechEvents.on('stopped_speaking', function () {
                if (react_comp.speaking == false) return;

                this.speach_timeout = setTimeout(function () {
                    if (react_comp.recording) {
                        react_comp.videoPlayer.recordToggle.handleClick()
                    }
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
            react_comp.recording = true
            console.log('started recording!');
            react_comp.state.auto_record_active = true;
        });

        this.videoPlayer.on('finishRecord', () => {
            react_comp.recording = false
            console.log("this is finish")
            this.isSaveDisabled = false
            if (this.retake == 0) {
                this.isRetakeDisabled = false
            }
            var formData = new FormData()
            formData.append('file', this.videoPlayer.recordedData)
            react_comp.currSessionBlobs.push(this.videoPlayer.recordedData);

            axios({
                method: "post",
                url: "http://127.0.0.1:5000/speechToTextVideo",
                data: formData,
                headers: {
                    'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                }
            }).then(res => {
                let resultTranscript = res.data.transcript
                let expectedText = 'to be or not to be this is the question'
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
            // }
            console.log("react_comp.state.auto_record_active", react_comp.state.auto_record_active)
            if (!react_comp.state.auto_record_active) {
                var merged_blob = new Blob(react_comp.currSessionBlobs);
                react_comp.currSessionBlobs = [];
                var FormData_ = new FormData()
                FormData_.append('file', merged_blob)

                // save in S3
                console.log("[finish] Auto record active", react_comp.state.auto_record_active)
                console.log("recording", react_comp.speaking)
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
                        data: FormData_.get('file'),
                        headers: {
                            'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                        }
                    }).then(res => {
                        console.log("Response from s3")
                    }).catch(error => {
                        console.log(error);
                    })
                    console.log(getURL, postURL);
                }).catch(function (error) {
                    console.log(error);
                })
            }

        }) // End event "record finished"

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
    toggleAutoRecord() {
        console.log("this is", this)
        console.log("Toggling recording from", this.state.auto_record_active)
        if (!this.state.auto_record_active) {
            // Meaning we will now turn it on
            this.currSessionBlobs = [];
        }
        var react_comp = this
        this.setState(state => {
            console.log("im hereeee");
            if(react_comp.state.auto_record_active && !react_comp.videoPlayer.paused()) {
                react_comp.videoPlayer.recordToggle.handleClick()
            }
            return { auto_record_active: !state.auto_record_active }
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.toggleAutoRecord}>{this.state.auto_record_active ? "Stop" : "Start"}</button>
                <div data-vjs-player>
                    <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
                </div>
            </div>


        );
    }
}

export default Video;