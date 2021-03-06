import React, { Component } from 'react'
import axios from 'axios'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import '@videojs/plugin-concat'
import 'webrtc-adapter'
import RecordRTC from 'recordrtc'
import hark from 'hark'
import Blob from 'blob'
import 'videojs-record/dist/css/videojs.record.css'
class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: props.data.audition._id,
            auto_record_active: false,
            status: "",
            entireText: "",
            currentLineIterator: 0,
            lineToRead: "",
            finishedText: false,
            sumSimilarityScore: 0,
            sumExactScore: 0,
            finalScore: {},
            roleSpeaking: "NONE",
            videoURL: "",
            conversationStarted: false,
            errorMessage: "",

        }
        this.startConversation = this.startConversation.bind(this)
        this.sendToS3 = this.sendToS3.bind(this)
    }
    calculateTotalScore() {
        //avg of sumSimilarty and sumExact divided by length of sentence/2, taking into consideration the actorLine and actor has one line each. Should be replaced.
        var similarityScore = this.state.sumSimilarityScore / (this.state.entireText.length / 2)
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
        console.log("text", this.props.audition.audition.auditionInfo[0].text_file)
        this.setState({ entireText: this.props.audition.audition.auditionInfo[0].text_file.split("\n") })
    }


    componentDidMount() {
        this.readText()
        this.currSessionBlobs = []// collect all audio blobs until silence

        this.videoPlayer = videojs(this.videoNode, this.props, () => {
            // print version information at startup
            const version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version
            videojs.log(version_info)
        })
        console.log(this.videoPlayer)
        // Allows start/stop recording
        this.videoPlayer.deviceButton.handleClick()
        this.speach_timeout = 0
        this.speaking = false
        this.recording = false
        this.state.auto_record_active = false
        this.speech_loop_counter_timeout = 0
        var react_comp = this
        // device is ready
        this.videoPlayer.on('deviceReady', () => {
            console.log('Video device is ready!!')
        })

        this.videoPlayer.onStateChanged = function (state) {
            console.log('Video player state changed', state)
        }
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (camera) {
            var speechEvents = hark(camera, {})
            speechEvents.on('speaking', function () {
                if (react_comp.state.auto_record_active !== true) {
                    return
                }
                if (react_comp.state.status !== 'recording') {
                    react_comp.setState({ status: "recording" })
                }
                if (react_comp.speaking == false) {
                    react_comp.startSpeechTimestamp = new Date().getTime()
                    console.log('started speaking!')
                }
                react_comp.speaking = true
                react_comp.setState({ errorMessage: ' ' })
                clearTimeout(react_comp.speech_timeout)
                clearTimeout(react_comp.speech_loop_counter_timeout)
            })
            speechEvents.on('stopped_speaking', function () {
                if (react_comp.speaking === false) {
                    return
                }
                console.log('Stopped speaking. State:', react_comp.state)
                let silence_timeout = 3
                react_comp.speech_timeout = setTimeout(function () {
                    if (react_comp.state.auto_record_active) {
                        react_comp.videoPlayer.recordToggle.handleClick()
                    }
                    react_comp.speaking = false
                    react_comp.setState({ status: "inactive", auto_record_active: false })
                    console.log('Stopped speaking')
                }, silence_timeout * 1000)

                // logging  
                var seconds = silence_timeout
                    (function looper() {
                        console.log('Recording is going to be stopped in ' + seconds + ' seconds.')
                        seconds--
                        if (seconds <= 0) {
                            return
                        }
                        react_comp.speech_loop_counter_timeout = setTimeout(looper, 1000)
                    })()
            })
        })
        // user clicked the record button and started recording
        this.videoPlayer.on('startRecord', () => {
            react_comp.recording = true
            console.log('started recording!')
            react_comp.state.auto_record_active = true
        })
        this.videoPlayer.on('finishRecord', () => {
            react_comp.recording = false
            console.log("this is finish")
            // this.isSaveDisabled = false
            if (this.retake == 0) {
                this.isRetakeDisabled = false
            }
            var formData = new FormData()
            // singleFormData
            react_comp.currSessionBlobs.push(this.videoPlayer.recordedData)
            formData.append('file', this.videoPlayer.recordedData)
            if (this.state.currentLineIterator < this.state.entireText.length) {
                this.setState({ status: "inactive", auto_record_active: false })
                axios({
                    method: "post",
                    url: "https://textualservices.herokuapp.com/speechToTextVideo",
                    data: formData,
                    headers: {
                        'Content-Type': 'video/mp4', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                    }
                }).then(res => {
                    let resultTranscript = res.data.transcript
                    let confidence = res.data.confidence
                    console.log("conf", confidence)
                    console.log(confidence)
                    if (confidence < 0.8) {
                        throw 'We could not hear you'
                    }
                    console.log('Result transcript', resultTranscript)
                    let expectedText = this.state.entireText[this.state.currentLineIterator].replace('actor:', '')
                    this.setState({ currentLineIterator: this.state.currentLineIterator + 1, roleSpeaking: "ACTOR", lineToRead: this.state.entireText[this.state.currentLineIterator] })
                    axios.get("https://sentencesimilaritystage.herokuapp.com/compare", {
                        params: {
                            inputText: resultTranscript,
                            expectedText: expectedText
                        }
                    }).then(res => {
                        this.setState({ roleSpeaking: "VOCAL_SERVICE", sumExactScore: parseFloat(this.state.sumExactScore) + parseFloat(res.data.exactScore), sumSimilarityScore: parseFloat(this.state.sumSimilarityScore) + parseFloat(res.data.similarityScore) })
                        axios.get("https://textualservices.herokuapp.com/textToSpeech", {
                            params: {
                                textToRead: this.state.entireText[this.state.currentLineIterator].replace('other actor:', '')
                            }
                        }).then(res => {
                            if (this.state.currentLineIterator < this.state.entireText.length) {
                                var base64string = res.data.data
                                var snd = new Audio("data:audio/wav;base64," + base64string)
                                snd.play()
                                snd.onended = () => {
                                    snd.currentTime = 0
                                    console.log('Trainer finished')
                                    if (this.state.currentLineIterator + 1 == this.state.entireText.length) {
                                        this.setState({ finalScore: this.calculateTotalScore(), auto_record_active: false })
                                        this.sendToS3()
                                    } else {
                                        this.videoPlayer.recordToggle.handleClick()
                                        this.setState({
                                            currentLineIterator: this.state.currentLineIterator + 1,
                                            status: "active",
                                            auto_record_active: true
                                        })
                                    }
                                }
                            }
                            else {
                                console.log("No more texts to read")
                                this.setState({ finishedText: true, finalScore: this.calculateTotalScore(), auto_record_active: false })
                            }
                        })
                    })
                        .catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log('Got error from speechToTextAudio api')
                    this.videoPlayer.recordToggle.handleClick()
                    this.setState({ errorMessage: "We could not hear you. Please try again", status: "active", auto_record_active: true })
                })
            }
        }) // End event "record finished"
        // error handling
        this.videoPlayer.on('error', (element, error) => {
            console.warn(error)
        })

        this.videoPlayer.on('deviceError', () => {
            console.error('device error:', this.videoPlayer.deviceErrorCode)
        })
    }
    sendToS3() {
        var react_comp = this
        var merged_blob = new Blob(this.currSessionBlobs)
        var formData = new FormData()
        console.log(`Current seesion blobs ${this.currSessionBlobs.length}`)
        this.currSessionBlobs.forEach(blob => {
            formData.append('files', blob)
        })
        this.currSessionBlobs = []
        // save in S3
        console.log("[finish] Auto record active", this.state.auto_record_active)
        console.log("recording", this.speaking)
        axios({
            method: "post",
            data: formData,
            url: "/actor-audition/upload_audition_videos",
        }).then(function (response) {
            var video = response.data.videoUrl
            console.log("michal", response, video)
            react_comp.setState({ videoURL: video })

            console.log("auditionKKK", react_comp.state)
            react_comp.setState((state) => {
                return { finishedText: true }
            })
            var parse = JSON.parse(react_comp.state.finalScore)
            var data = JSON.stringify({
                "video": {
                    "videoUrl": react_comp.state.videoURL,
                    "similarity": parse.similarityScore,
                    "exact": parse.exactScore
                }
            })
            console.log("handleClick", data)
            var config = {
                method: 'put',
                url: `/actor-audition/${react_comp.state._id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            axios(config)
                .then(function (response) {

                    console.log("response data")

                    console.log(JSON.stringify(response.data))
                })
                .catch(error => {
                    console.log(error)
                })
            return video
        }).catch(function (error) {
            console.log(error)
        })
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.videoPlayer) {
            this.videoPlayer.dispose()
        }
        if (this.audioPlayer) this.audioPlayer.dispose()
    }
    startConversation() {
        if (!this.state.auto_record_active) {
            // Meaning we will now turn it on
            this.currSessionBlobs = []
        }
        this.videoPlayer.recordToggle.handleClick()
        this.setState(state => {
            return { auto_record_active: true, conversationStarted: true }
        })
    }
    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }
    render() {
        // const isFinishedText = this.state.finishedText
        if (!this.state.finishedText) {
            return (
                <div>
                    <span style={{ display: "block" }}>{this.state.entireText[this.state.currentLineIterator]}</span>

                    <button onClick={() => this.startConversation()} hidden={this.state.conversationStarted}>Record</button>
                    <div data-vjs-player>
                        <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline>
                            <div className="btn-box">
                                {this.state.errorMessage != "" &&
                                    <span style={{ display: "block" }}>{this.state.errorMessage}</span>
                                }
                            </div>
                        </video>
                    </div>
                </div>


            )
        }
        else {
            if (this.state.videoURL) {
                console.log(this.state.videoURL)
                return (
                    <div>
                        <span style={{ display: "block" }}>{(this.state.finalScore)}</span>
                        <span style={{ display: "block" }}>Want to watch your audition?</span>

                        <video controls>
                            <source src={(this.state.videoURL)} type="video/mp4" />
                             Your browser does not support the <code>video</code> element.
                            </video>
                    </div>
                )
            }
            else {
                return (<span></span>)
            }
        }
    }
}

export default Video
