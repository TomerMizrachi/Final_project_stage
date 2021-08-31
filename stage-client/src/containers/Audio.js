import React, { Component } from "react"
import AudioAnalyser from "react-audio-analyser"
import auditionText from './textForAudition.txt'
import axios from 'axios'
import hark from 'hark'

export default class Aud extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            status: "",
            entireText: "",
            currentLineIterator: 0,
            lineToRead: "",
            finishedText: false,
            sumSimilariyScore: 0,
            sumExactScore: 0,
            finalScore: {},
            roleSpeaking: "NONE",
            auto_record_active: false,
            conversationStarted: false,
            errorMessage: "",

        }

    }

    controlAudio(status) {
        this.setState({
            status: status,
            auto_record_active: true,
            conversationStarted: true,
        })
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
            console.log("TEXT",this.props.audition.auditionInfo[0].text_file)
            this.setState({ entireText:this.props.audition.auditionInfo[0].text_file.split("\n")})

    }


    componentDidMount() {
        this.readText()
        this.speaking = false;
        this.speech_timeout = 0;
        this.speech_loop_counter_timeout = 0;
        var react_comp = this
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (camera) {
            var speechEvents = hark(camera, {});
            speechEvents.on('speaking', function () {
                if (react_comp.state.auto_record_active !== true) {
                    return;
                }
                if (react_comp.state.status !== 'recording') {
                    react_comp.setState({ status: "recording" })
                };
                if (react_comp.speaking == false) {
                    react_comp.startSpeechTimestamp = new Date().getTime();
                }
                react_comp.speaking = true;
                console.log('started speaking!');
                react_comp.setState({ errorMessage: ' ' })
                clearTimeout(react_comp.speech_timeout);
                clearTimeout(react_comp.speech_loop_counter_timeout);
            });
            speechEvents.on('stopped_speaking', function () {
                if (react_comp.speaking === false) {
                    return;
                }
                console.log('Stopped speaking. State:', react_comp.state)
                let silence_timeout = 3
                react_comp.speech_timeout = setTimeout(function () {
                    react_comp.speaking = false;
                    react_comp.setState({ status: "inactive", auto_record_active: false })
                    console.log('Stopped speaking')
                }, silence_timeout * 1000);

                // logging  
                var seconds = silence_timeout;
                (function looper() {
                    console.log('Recording is going to be stopped in ' + seconds + ' seconds.');
                    seconds--;
                    if (seconds <= 0) {
                        return;
                    }
                    react_comp.speech_loop_counter_timeout = setTimeout(looper, 1000);
                })();
            });
        });
    }



    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    render() {
        const { status, audioSrc } = this.state // audioType is also available
        const audioProps = {
            audioType: "audio/wav",
            status,
            audioSrc,
            timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
            startCallback: (e) => {
                console.log("succ start", e)

            },
            pauseCallback: (e) => {
                console.log("succ pause", e)
            },
            stopCallback: (e) => {
                this.setState({
                    audioSrc: window.URL.createObjectURL(e)
                })
                const formData = new FormData();

                formData.append("file", e);
                console.log("succ stop", e)
                if (this.state.currentLineIterator < this.state.entireText.length) {
                    this.setState({ status: "inactive", auto_record_active: false })
                    axios.post("https://textualservices.herokuapp.com/speechToTextAudio", formData)
                        .then(res => {
                            let confidence=res.data.confidence
                            let resultTranscript = res.data.transcript
                            console.log("conf",confidence)
                            console.log(confidence)
                            if (confidence<0.8){
                                throw 'We could not hear you';
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
                                this.setState({ roleSpeaking: "VOCAL_SERVICE", sumExactScore: parseFloat(this.state.sumExactScore) + parseFloat(res.data.exactScore), sumSimilariyScore: parseFloat(this.state.sumSimilariyScore) + parseFloat(res.data.similarityScore) })
                                axios.get("https://textualservices.herokuapp.com/textToSpeech", {
                                    params: {
                                        textToRead: this.state.entireText[this.state.currentLineIterator].replace('other actor:', '')
                                    }
                                }).then(res => {
                                    if (this.state.currentLineIterator < this.state.entireText.length) {
                                        var base64string = res.data.data
                                        var snd = new Audio("data:audio/wav;base64," + base64string);
                                        snd.play()
                                        snd.onended = () => {
                                            snd.currentTime = 0
                                            console.log('Trainer finished')
                                            if (this.state.currentLineIterator + 1 == this.state.entireText.length) {
                                                this.setState({ finishedText: true, finalScore: this.calculateTotalScore(), auto_record_active: false })
                                            } else {
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
                            this.setState({ errorMessage: "We could not hear you. Please try again", status: "active", auto_record_active: true })
                        })


                }
                else {
                    console.log("no more text to read")
                    this.setState({ finishedText: true, finalScore: this.calculateTotalScore() })

                }
            },
            onRecordCallback: (e) => {
                // console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        {
            if (!this.state.finishedText) {
                return (
                    <div>
                        <span style={{ display: "block" }}>{this.state.entireText[this.state.currentLineIterator]}</span>
                        <AudioAnalyser {...audioProps}>
                            <div className="btn-box">
                                {this.state.conversationStarted == false &&
                                    <button onClick={() => this.controlAudio("recording")}>record</button>
                                }
                                {this.state.errorMessage != "" &&
                                    <span style={{ display: "block" }}>{this.state.errorMessage}</span>
                                }
                            </div>
                        </AudioAnalyser>
                    </div>
                );
            }
            else {
                return (<p>{(this.state.finalScore)}</p>)
            }
        }
    }

}
