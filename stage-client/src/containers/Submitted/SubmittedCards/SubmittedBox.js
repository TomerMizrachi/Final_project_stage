import React from 'react';
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles'
import { Grid, Box } from '@material-ui/core'
import { LinkButton } from '@components/uielements/Button/Button'
import VideoPlayer from "react-happy-video"

export default function SubmittedBox({ audition, actor_audition }) {
    console.log("audition", audition)
    console.log("actoraudition", actor_audition)
    return (
        <StyledPracticeStep>
            <div className="header">
                <Grid container direction="column">
                
                </Grid>
            </div>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <Grid item >
                    <VideoPlayer width="100%" color="#3b3346" source={actor_audition.video} />
                </Grid>
            </Box>
            <div className="header" />
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <Grid item >
                    <LinkButton href="#" className="sc-eCImvq eNJiRc orange bt-sm round">Reqruite</LinkButton>
                </Grid>
            </Box>
        </StyledPracticeStep>
    )
}
