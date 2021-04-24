import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser"
import axios from 'axios'


export default class Aud extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ""
        }
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
        const { status, audioSrc, audioType } = this.state;
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
                axios.post("http://127.0.0.1:5000/audio", formData)
                .then(res => {
                let resultTranscript=res.data.transcript
                let expectedText='to be or not to be this is the question'
                console.log(resultTranscript)
                axios.get("http://127.0.0.1:12345/compare", { params: {
                    inputText: resultTranscript,
                    expectedText: expectedText
                      }})
                    .catch(err => {
                    console.log(err)
                })

                })

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
                            // <i className="iconfont icon-start" title="开始"
                            //    onClick={() => this.controlAudio("recording")}></i>
                        }
                        {status === "recording" &&
                        // <i className="iconfont icon-pause" title="暂停"
                        //    onClick={() => this.controlAudio("paused")}></i>
                        <button onClick={() => this.controlAudio("paused")}>pause</button>
                        }
                        {/* <i className="iconfont icon-stop" title="停止"
                            onClick={() => this.controlAudio("inactive")}></i> */}
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