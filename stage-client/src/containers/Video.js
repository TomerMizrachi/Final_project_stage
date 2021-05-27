/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'

import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import '@videojs/plugin-concat';
import 'webrtc-adapter';

import RecordRTC from 'recordrtc';
import hark from 'hark';
import Blob from 'blob';
import auditionText from './textForAudition.txt';

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';


class Video extends Component {
    constructor(props) {
        super(props);
        console.log(this)
        this.state = {
            actor_id: props.data.actor_id,
            auto_record_active: false,
            status: "",
            entireText: "",
            currentLineIterator: 0,
            lineToRead: "",
            finishedText: false,
            sumSimilariyScore: 0,
            sumExactScore: 0,
            finalScore: {},
            roleSpeaking: "NONE",
            videoURL: ""

        }
        this.toggleAutoRecord = this.toggleAutoRecord.bind(this);
        this.sendRecording = this.sendRecording.bind(this);
    }
    calculateTotalScore() {
        //avg of sumSimilarty and sumExcat divided by length of sentence/2, taking into consideration the actorLine and actor has one line each. Should be replaced.
        var similarityScore = this.state.sumSimilariyScore / (this.state.entireText.length / 2)
        var exactScore = this.state.sumExactScore / (this.state.entireText.length / 2)
        var finalScore = {
            "similarityScore": similarityScore,
            "exactScore": exactScore,
        }
        this.setState({
            finalScore: finalScore
        })
        return JSON.stringify(finalScore)
    }
    readText() {
        fetch(auditionText)
            .then((r) => r.text())
            .then(text => {
                this.setState({
                    entireText: text.split("\n")
                })
            })
    }

    saveToS3() {
        var react_comp = this
        var merged_blob = new Blob(react_comp.currSessionBlobs);
        react_comp.currSessionBlobs = [];
        var FormData_ = new FormData()
        FormData_.append('file', merged_blob)
        console.log("[finish] Auto record active", react_comp.state.auto_record_active)
        console.log("recording", this.speaking)
        console.log("reached here!")
        axios({
            method: "get",
            url: "http://localhost:8001/actor-audition/get_signed_url",
        }).then(function (response) {
            var postURL = response.data.postURL;
            var video = response.data.getURL;
            react_comp.setState({ videoURL: video })
            console.log("can you see me", react_comp.state)
            delete axios.defaults.headers.common['Authorization']
            axios({
                method: "put",
                url: postURL,
                data: FormData_.get('file'),
                headers: {
                    'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                }
            }).then(res => {
                var data = JSON.stringify({ "video": "https://stage-video.s3.amazonaws.com/bc710352-3922-493d-b2e7-d6d47d27cb2a" });
                var config = {
                    method: 'put',
                    url: `http://localhost:8001/actor-audition/${this.actor_id}`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }).catch(error => {
                console.log(error);
            })
            console.log(video, postURL);
            return video;
        }).catch(function (error) {
            console.log(error);
        })

    }
    componentDidMount() {
        this.readText()

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
                    //react_comp.videoPlayer.recordToggle.handleClick()

                }
                if(react_comp.speaking == false){
                    react_comp.startSpeechTimestamp = new Date().getTime();
                }
                react_comp.speaking = true;
                console.log('started speaking!');
                clearTimeout(react_comp.speach_timeout);

            });
            speechEvents.on('stopped_speaking', function () {
                if (react_comp.speaking == false) return;

                this.speach_timeout = setTimeout(function () {
                    console.log(react_comp.recording)
                    if (react_comp.recording) {
                        //react_comp.videoPlayer.recordToggle.handleClick()
                    }
                    react_comp.speaking = false;
                    react_comp.need_s2t = true;
                    console.log('Stopped speaking')
                }, 1 * 1000);

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

        this.videoPlayer.on('timestamp', (timestamp, timestamps) => {
            console.log('in timestamp need s2t', react_comp.need_s2t)
            if(react_comp.need_s2t){
                console.log('timestamps',timestamps)
                console.log('timestamp',timestamp)
                react_comp.need_s2t = false;
                var duration_ms = (react_comp.startSpeechTimestamp - react_comp.startRecordTimestamp);
                if(duration_ms < 0) duration_ms = 0;

                react_comp.sendSpeech2Text(new Blob(react_comp.videoPlayer.recordedData), duration_ms)
            }
        });

        this.videoPlayer.on('finishRecord', () => {
            console.log("this is finish")
            this.isSaveDisabled = false
            if (this.retake == 0) {
                this.isRetakeDisabled = false
            }
            var formData = new FormData()
            formData.append('file', this.videoPlayer.recordedData)
            react_comp.currSessionBlobs.push(this.videoPlayer.recordedData);
            if (this.state.currentLineIterator < this.state.entireText.length) {
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/speechToTextVideo",
                    data: formData,
                    headers: {
                        'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                    }
                }).then(res => {
                    react_comp.state.auto_record_active = false
                    console.log(res)
                    let resultTranscript = res.data.transcript
                    let expectedText = this.state.entireText[this.state.currentLineIterator].replace('actor:', '')
                    this.setState({ currentLineIterator: this.state.currentLineIterator + 1, roleSpeaking: "ACTOR", lineToRead: this.state.entireText[this.state.currentLineIterator] })
                    axios({
                        method: "get",
                        url: "http://127.0.0.1:12345/compare",
                        params: {
                            inputText: resultTranscript,
                            expectedText: expectedText
                        }
                    }).then(res => {
                        this.setState({ roleSpeaking: "VOCAL_SERVICE", sumExactScore: parseFloat(this.state.sumExactScore) + parseFloat(res.data.exactScore), sumSimilariyScore: parseFloat(this.state.sumSimilariyScore) + parseFloat(res.data.similarityScore) })
                        react_comp.state.auto_record_active = true
                        console.log("video reached")
                        axios.get("http://127.0.0.1:5000/textToSpeech", {
                            params: {
                                textToRead: this.state.entireText[this.state.currentLineIterator].replace('otherLine:', '')
                            }
                        }).then(res => {
                            if (this.state.currentLineIterator < this.state.entireText.length) {
                                console.log(res.data.data)
                                var base64string = res.data.data
                                var snd = new Audio("data:audio/wav;base64," + base64string);
                                snd.play()
                                this.setState({ currentLineIterator: this.state.currentLineIterator + 1 })
                                if (this.state.currentLineIterator == this.state.entireText.length) {
                                    console.log("test")
                                    this.setState({ finishedText: true, finalScore: this.calculateTotalScore() })
                                    this.saveToS3(() => {}).then(res=>{this.setState({videoURL:res,finishedText: true, finalScore: this.calculateTotalScore() })
                                    })
                                    react_comp.state.auto_record_active = false
                                }
                                else {
                                    this.saveToS3(() => {}).then(res=>{this.setState({videoURL:res,finishedText: true, finalScore: this.calculateTotalScore() })
                                })
                                    console.log("No more texts to read")
                                    this.setState({ finishedText: true, finalScore: this.calculateTotalScore() })
                                    react_comp.state.auto_record_active = false
                                    console.log(this.state.finalScore)
                                }

                            }
                        }).catch(function (error) {
                            console.log(error);
                        })

                    }).catch(function (error) {
                        console.log(error);
                    })
                })
            }
            else {
                this.setState({ finishedText: true, finalScore: this.calculateTotalScore() })
                this.saveToS3(() => {}).then(res=>{this.setState({videoURL:res,finishedText: true, finalScore: this.calculateTotalScore() })
            })
                console.log("no more text to read")
                this.setState({ finishedText: true, finalScore: this.calculateTotalScore() })
                react_comp.state.auto_record_active = false


            }
            // }
            console.log("react_comp.state.auto_record_active", react_comp.state.auto_record_active);


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

    sendSpeech2Text(blob, startDurationMS){
        console.log('Sending blob to Speech2Text')
        var formData = new FormData();
        formData.append('file', blob)
        formData.append('start_duration', startDurationMS)

        axios({
            method: "post",
            url: "http://127.0.0.1:5000/speechToTextVideo",
            data: formData,
            headers: {
                'Content-Type': 'video/mp4', "AllowedHeaders": "*", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
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
    }

    sendRecording(blob){
        var formData = new FormData()
        formData.append('file', blob)

        axios({
            method: "get",
            url: "http://localhost:8001/actor-audition/get_signed_url",
        }).then(function (response) {
            var postURL = response.data.postURL;
            var video = response.data.getURL;
            delete axios.defaults.headers.common['Authorization']
            axios({
                method: "put",
                url: postURL,
                data: formData.get('file'),
                headers: {
                    'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                }
            }).then(res => {

                var data = JSON.stringify({"video":"https://stage-video.s3.amazonaws.com/bc710352-3922-493d-b2e7-d6d47d27cb2a"});

                var config = {
                  method: 'put',
                  url: 'http://localhost:8001/actor-audition/6084204bdb649568101fede1',
                  headers: { 
                    'Content-Type': 'application/json'
                  },
                  data : data
                };
                
                axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                })
                .catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            })
            console.log(video, postURL);
        }).catch(function (error) {
            console.log(error);
        })
    }

    toggleAutoRecord() {
        console.log("this is", this)
        console.log("Toggling recording from", this.state.auto_record_active)
        if (!this.state.auto_record_active) {
            // Meaning we will now turn it on
            this.currSessionBlobs = [];
            this.startRecordTimestamp = new Date().getTime();
        }else if(!this.speaking){
            // About to turn off
            this.sendRecording(new Blob(this.currSessionBlobs))
        }
        var react_comp = this
        this.state.auto_record_active = true
        this.setState(state => {
            if (react_comp.state.auto_record_active && !react_comp.videoPlayer.paused()) {
                react_comp.videoPlayer.recordToggle.handleClick()
            }
            return { auto_record_active: !state.auto_record_active }
        });
    }
    render() {
        const isFinishedText = this.state.finishedText;
        if (!this.state.finishedText) {
            return (

                <div>
                    <button onClick={this.toggleAutoRecord}>{this.state.auto_record_active ? "Stop" : "Start"}</button>
                    <div data-vjs-player>
                        <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
                    </div>
                </div>


            );
        }
        else {
            if (this.state.videoURL){
            console.log(this.state.videoURL)
            return (
                <div>
                    <p>{(this.state.finalScore)}</p>
                    <p>Want to watch your audition?</p>

                    <video controls>
                        <source src={(this.state.videoURL)} type="video/mp4" />
                             Your browser does not support the <code>video</code> element.
                            </video>
                        </div>
            )
            }

            else{
                return(<p></p>)
            }
        }
        }
    }


export default Video;