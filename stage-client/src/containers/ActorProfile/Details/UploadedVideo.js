import React from 'react';
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles';
import { Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';

export default function UploadedVideo({ video }) {
    return (
        <StyledPracticeStep>
            <div className="header">
                <Box display="flex" alignItems="center" justifyContent="space-evenly">
                    <LinkButton href="#" className="sc-eCImvq eNJiRc orange bt-sm round">Delete</LinkButton>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-evenly">
                </Box>
            </div>
            <Grid item>
                <Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
                    <div className="heading4">{video}</div>
                </Box>
            </Grid>
        </StyledPracticeStep>
    )
}
