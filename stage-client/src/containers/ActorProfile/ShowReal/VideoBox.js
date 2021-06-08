import React from 'react';
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles'
import { Grid, Box } from '@material-ui/core'
import { LinkButton } from '@components/uielements/Button/Button'
import VideoPlayer from "react-happy-video"

export default function VideoBox({ video }) {
    return (
        <StyledPracticeStep>
            <div className="header">
                <Grid item>
                    {/* <Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}> */}
                    {/* <div className="heading4">{video}</div> */}
                    <VideoPlayer width="100%" color="#3b3346" source={video} />
                    {/* </Box> */}
                </Grid>
            </div>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <LinkButton href="#" className="sc-eCImvq eNJiRc orange bt-sm round">Delete</LinkButton>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
            </Box>
        </StyledPracticeStep>
    )
}
