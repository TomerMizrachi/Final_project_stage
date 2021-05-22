import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser"
import auditionText from './textForAudition.txt';
import axios from 'axios'
import hark from 'hark';

export default class Aud extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            entireText:"",
            currentLineIterator:0,
            lineToRead:"",
            finishedText:false,
            sumSimilariyScore:0,
            sumExactScore:0,
            finalScore:{},
            roleSpeaking:"NONE",
            auto_record_active:false
        }

    }


x
    calculateTotalScore(){
        //avg of sumSimilarty and sumExcat divided by length of sentence/2, taking into consideration the actorLine and actor has one line each. Should be replaced.
        var similarityScore= this.state.sumSimilariyScore/(this.state.entireText.length/2)
        var exactScore=this.state.sumExactScore/(this.state.entireText.length/2)
        var finalScore={
            "similarityScore": similarityScore,
            "exactScore":exactScore,
        }
        this.setState({
            finalScore: finalScore
        })
        return JSON.stringify(finalScore)
    }
    readText(){
        fetch(auditionText)
        .then((r) => r.text())
        .then(text  => {
            this.setState({
                entireText:text.split("\n")
            })
        })   
    }

  
    componentDidMount() {
        this.readText()
        this.speaking = false;
        this.speech_timeout = 0;
        var react_comp = this
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (camera) {
            var speechEvents = hark(camera, {});
            speechEvents.on('speaking', function () {
                if (react_comp.state.auto_record_active == false) return;
                if (react_comp.state.status !== 'recording') {
                    react_comp.setState({status:"recording"})
                };
                console.log("react_comp.state.status", react_comp.state.status)
                // if (!react_comp.recording) {
                //     console.log('Toggle record one', react_comp.videoPlayer)
                //     //react_comp.videoPlayer.recordToggle.handleClick()

                // }
                // if(react_comp.speaking == false){
                //     react_comp.startSpeechTimestamp = new Date().getTime();
                // }
                react_comp.speaking = true;
                console.log('started speaking!');
                clearTimeout(react_comp.speech_timeout);

            });
            speechEvents.on('stopped_speaking', function () {
                console.log(react_comp.state)
                // if (react_comp.speaking == false) return;
                react_comp.setState({status:"inactive",auto_record_active:"false"})  

               react_comp.speech_timeout = setTimeout(function () {
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

            }
            
            );
        });
    }



    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    render() {
        // this.readText()
        // console.log(this.state.entireText)
        const isFinishedText = this.state.finishedText;
        // console.log(this.state)
        const { status, audioSrc } = this.state; // audioType is also available
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
                if (this.state.currentLineIterator<this.state.entireText.length){

                axios.post("http://127.0.0.1:5000/speechToTextAudio", formData)
                    .then(res => {
                        this.setState({status:"inactive",auto_record_active:"false"})
                        let resultTranscript = res.data.transcript
                        console.log(resultTranscript)
                        let expectedText = this.state.entireText[this.state.currentLineIterator].replace('actor:','')
                        this.setState({currentLineIterator:this.state.currentLineIterator+1,roleSpeaking:"ACTOR",lineToRead:this.state.entireText[this.state.currentLineIterator]})
                        axios.get("http://127.0.0.1:12345/compare", {
                            params: {
                                inputText: resultTranscript,
                                expectedText: expectedText
                            }
                        }).then(res=>{
                            this.setState({roleSpeaking:"VOCAL_SERVICE",sumExactScore:parseFloat(this.state.sumExactScore)+parseFloat(res.data.exactScore),sumSimilariyScore:parseFloat(this.state.sumSimilariyScore)+parseFloat(res.data.similarityScore)})
                            axios.get("http://127.0.0.1:5000/textToSpeech", {
                            params: {
                                textToRead: this.state.entireText[this.state.currentLineIterator].replace('otherLine:','')
                            }
                        }).then(res=>{ 
                            if (this.state.currentLineIterator<this.state.entireText.length){
                                // console.log(res.data.data)
                                var base64string=res.data.data
                                var snd = new Audio("data:audio/wav;base64," + base64string);
                                snd.play()
                                this.setState({currentLineIterator:this.state.currentLineIterator+1})
                                if (this.state.currentLineIterator==this.state.entireText.length){
                                    this.setState({finishedText:true,finalScore:this.calculateTotalScore()})

                                }

                            }
                      

                            else{
                                console.log("No more texts to read")
                                this.setState({finishedText:true,finalScore:this.calculateTotalScore()})
                                // console.log(this.state.finalScore)
                            }
                        })
                        })
                            .catch(err => {
                                console.log(err)
                            })

                    })
                }
                else{
                    console.log("no more text to read")
                    this.setState({finishedText:true,finalScore:this.calculateTotalScore()})

                }
            },
            onRecordCallback: (e) => {
                // console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        { if (!this.state.finishedText){
        return (
            <div>
            <p>{this.state.entireText[this.state.currentLineIterator]}</p>
                <AudioAnalyser {...audioProps}>
                    <div className="btn-box">
                        {status !== "recording" &&
                            <button onClick={() => this.controlAudio("recording")}>record</button>
                        }
                        <button onClick={() => this.controlAudio("inactive")}>stop</button>
                    </div>
                </AudioAnalyser>
            </div>
        );
                    } 
        else{
            return(<p>{(this.state.finalScore)}</p>)
        }
    }
}

}