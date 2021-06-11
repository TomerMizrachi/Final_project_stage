import React from 'react';
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles';
import { Box } from '@material-ui/core';
import { LinkButton } from '@components/uielements/Button/Button';

export default function PicBox({ picture }) {
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
                <LinkButton href="#" className="sc-eCImvq eNJiRc orange bt-sm round">Delete</LinkButton>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
            </Box>
        </StyledPracticeStep>
    )
}
