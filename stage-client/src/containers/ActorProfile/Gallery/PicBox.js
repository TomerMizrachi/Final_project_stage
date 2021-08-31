import React from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles'
import { Box } from '@material-ui/core'
import { LinkButton } from '@components/uielements/Button/Button'
import axios from 'axios'

export default function PicBox({ picture, actor_id }) {
    const deletePic = () => {
        var fileName = JSON.stringify(picture)
        fileName = fileName.replace("https://stage-videos.s3.amazonaws.com/", "")
        fileName = fileName.replace('"', "")
        fileName = fileName.replace('"', "")
        var data_ = JSON.stringify({
            "fileName": fileName
        });
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
            });
        var data = JSON.stringify({
            "urlPic": picture,
            "id": actor_id
        })
        var config = {
            method: 'put',
            url: '/actor/deletePic',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            });
        console.log("delete image", picture)
    }
    return (
        <StyledPracticeStep>
            <div className="header">
                <img
                    style={{ width: 300, height: 200 }}
                    src={picture}
                    resizeMode='contain'
                />
            </div>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <LinkButton onClick={deletePic} className="sc-eCImvq eNJiRc orange bt-sm round">Delete</LinkButton>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
            </Box>
        </StyledPracticeStep>
    )
}
