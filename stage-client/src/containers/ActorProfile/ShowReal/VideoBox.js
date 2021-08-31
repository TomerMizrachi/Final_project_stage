import React from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles'
import { Grid, Box } from '@material-ui/core'
import { LinkButton } from '@components/uielements/Button/Button'
import VideoPlayer from "react-happy-video"
import axios from 'axios'

export default function VideoBox({ video, actor_id }) {
    const deleteVideo = () => {
        console.log(video, actor_id)
        var fileName = JSON.stringify(video)
        fileName = fileName.replace("https://stage-videos.s3.amazonaws.com/", "")
        fileName = fileName.replace('"', "")
        fileName = fileName.replace('"', "")
        fileName = fileName.replace(':', "")
        var data_ = JSON.stringify({
            "fileName": fileName
        })
        var config = {
            method: 'put',
            url: '/actor/deleteFromS3',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data_
        }

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            })

        var data = JSON.stringify({
            "urlVideo": video,
            "id": actor_id
        })
        var config = {
            method: 'put',
            url: '/actor/deletevideo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("delete video", video)
    }
    return (
        <StyledPracticeStep>
            <div className="header">
                <Grid item>
                    <VideoPlayer width="100%" color="#3b3346" source={video} />
                </Grid>
            </div>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <LinkButton onClick={deleteVideo} className="sc-eCImvq eNJiRc orange bt-sm round">Delete</LinkButton>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
            </Box>
        </StyledPracticeStep>
    )
}
