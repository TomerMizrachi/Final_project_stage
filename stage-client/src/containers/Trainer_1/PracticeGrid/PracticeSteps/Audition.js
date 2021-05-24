import React from 'react';
import StyledPracticeStep from './Audition.styles';
import { Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';

export default function PracticeStep({ audition }) {
	return (
		<StyledPracticeStep>
			<div className="header">
				<Box display="flex" alignItems="center" justifyContent="space-evenly">
                    <LinkButton href="#" className="sc-eCImvq eNJiRc orange bt-sm round">Send</LinkButton>
                    <LinkButton href="#" className="sc-eCImvq eNJiRc accent bt-sm round">Watch</LinkButton>

                </Box>
				<Box display="flex" alignItems="center" justifyContent="space-evenly">
				</Box>
			</div>
			<Grid item>
				<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
					<div className="heading4">{audition.date}</div>
				</Box>
			</Grid>
		</StyledPracticeStep>
	)
}
