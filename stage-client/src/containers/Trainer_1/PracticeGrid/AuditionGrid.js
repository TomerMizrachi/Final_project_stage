import React from 'react';
import StyledPracticeStep from './PracticeGrid.styles';
import Audition from '@containers/Trainer/PracticeGrid/PracticeSteps/Audition';
import { Grid } from '@material-ui/core';

export default function AuditionsGrid({ auditions }) {
	return (
		<StyledPracticeStep>
			<div className="grid-container">
				<div className="wrapper">
					<Grid container spacing={4}>
						{auditions.map((audition, index) => (
							<Grid item key={index} xs={3}>
								<Audition audition={audition} />
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</StyledPracticeStep>
	)
}
