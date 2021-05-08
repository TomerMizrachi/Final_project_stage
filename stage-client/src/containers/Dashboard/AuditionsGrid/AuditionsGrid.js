import React from 'react';
import StyledAuditionsGrid from './AuditionsGrid.styles';
import AuditionItem from '@containers/Dashboard/AuditionsGrid/AuditionItem/AuditionItem';
import { Grid } from '@material-ui/core';

export default function AuditionsGrid({ auditions }) {
	return (
		<StyledAuditionsGrid>
			<div className="grid-container">
				<div className="wrapper">
					<Grid container spacing={4}>
						{auditions.map((audition, index) => (
							<Grid item key={index} xs={3}>
								<AuditionItem audition={audition} />
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</StyledAuditionsGrid>
	)
}
