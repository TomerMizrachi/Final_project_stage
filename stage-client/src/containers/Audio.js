import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser"
import auditionText from './textForAudition.txt';
import axios from 'axios'

export default class Aud extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            entireText:"",
            currentLineIterator:0,
            finishedText:false,
            sumSimilariyScore:0,
            sumExactScore:0,
            finalScore:{},
            roleSpeaking:"NONE"
        }
    }

    calculateTotalScore(){
        //avg of sumSimilarty and sumExcat divided by length of sentence/2, taking into consideration the actorLine and actor has one line each. Should be replaced.
        var similarityScore= this.state.sumSimilariyScore/(this.state.text.length/2)
        var exactScore=this.state.sumExactScore/(this.state.text.length/2)
        var finalScore={
            "similarityScore": similarityScore,
            "exactScore":exactScore,
        }
        return JSON.stringify(finalScore)
    }
    readText(){
        fetch(auditionText)
        .then((r) => r.text())
        .then(text  => {
          this.state.text=text.split("\n")
        })   
    }

    retrieveNextLine(){

    }
  
    componentDidMount() {
    }

    controlAudio(status) {
        this.setState({
            status
        })
    }

    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    render() {
        this.readText()
        const { status, audioSrc } = this.state; // audioType is also available
        const audioProps = {
            audioType: "audio/wav",
            // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
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

                if (this.state.currentLineIterator<this.state.text.length){

                axios.post("http://127.0.0.1:5000/speechToTextAudio", formData)
                    .then(res => {
                        let resultTranscript = res.data.transcript
                        let expectedText = this.state.text[this.state.currentLineIterator].replace('actor:','')
                        this.state.currentLineIterator+=1
                        this.state.roleSpeaking="ACTOR"
                        console.log( this.state.roleSpeaking)
                        console.log(resultTranscript)
                        axios.get("http://127.0.0.1:12345/compare", {
                            params: {
                                inputText: resultTranscript,
                                expectedText: expectedText
                            }
                        }).then(res=>{
                            this.state.roleSpeaking="VOCAL_SERVICE"
                            this.state.sumExactScore=parseFloat(this.state.sumExactScore)+parseFloat(res.data.exactScore)
                            this.state.sumSimilariyScore=parseFloat(this.state.sumSimilariyScore)+parseFloat(res.data.similarityScore)
                            console.log(this.state.sumExactScore)
                            console.log(this.state.sumSimilariyScore)
                            console.log( this.state.roleSpeaking)
                            axios.get("http://127.0.0.1:5000/textToSpeech", {
                            params: {
                                textToRead: this.state.text[this.state.currentLineIterator].replace('otherLine:','')
                            }
                        }).then(res=>{
                            if (this.state.currentLineIterator<this.state.text.length){
                                this.state.currentLineIterator+=1
                                console.log(res.data.data)
                                var base64string=res.data.data
                                var snd = new Audio("data:audio/wav;base64," + base64string);
                                snd.play()
                            }
                            else{
                                console.log("No more texts to read")
                                this.state.finishedText=true
                                this.state.finalScore=this.calculateTotalScore()
                                console.log(this.state.finalScore)
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
                    this.state.finishedText=true
                    this.state.finalScore=this.calculateTotalScore()
                    console.log(this.state.finalScore)


                }
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        return (
            <div>
                <AudioAnalyser {...audioProps}>
                    <div className="btn-box">

                        {status !== "recording" &&
                            <button onClick={() => this.controlAudio("recording")}>record</button>
                        }

                        <button onClick={() => this.controlAudio("inactive")}>stop</button>
                    </div>
                </AudioAnalyser>
                {/* <p>choose output type</p>
                <select name="" id="" onChange={(e) => this.changeScheme(e)} value={audioType}>
                    <option value="audio/webm">audio/webm（default）</option>
                    <option value="audio/wav">audio/wav</option>
                    <option value="audio/mp3">audio/mp3</option>
                </select> */}
            </div>
        );
    }
}