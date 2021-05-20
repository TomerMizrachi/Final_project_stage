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
            lineToRead:"",
            finishedText:false,
            sumSimilariyScore:0,
            sumExactScore:0,
            finalScore:{},
            roleSpeaking:"NONE"
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
        console.log(this.state.entireText)
        const isFinishedText = this.state.finishedText;
        console.log(this.state)
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
                        let resultTranscript = res.data.transcript
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
                                console.log(res.data.data)
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
                    this.setState({finishedText:true,finalScore:this.calculateTotalScore()})

                }
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
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