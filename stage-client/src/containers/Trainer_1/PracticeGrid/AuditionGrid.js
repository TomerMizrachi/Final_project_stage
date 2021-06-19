import React from 'react';
import StyledPracticeStep from './PracticeGrid.styles';
import Audition from './PracticeSteps/Audition';
import { Grid } from '@material-ui/core';

export default function AuditionsGrid({ videos }) {
	return (
		<StyledPracticeStep>
			<div className="grid-container">
				<div className="wrapper">
					<Grid container spacing={4}>
						{videos.map((video, index) => (
							<Grid item key={index} xs={3}>
								<Audition video={video} />
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</StyledPracticeStep>
	)
}
