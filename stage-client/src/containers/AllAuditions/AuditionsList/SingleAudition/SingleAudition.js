import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition.styles';
import Rating from '@material-ui/lab/Rating';
import { LinkButton } from '@components/uielements/Button/Button';
import { Grid, Box } from '@material-ui/core';

export default function SingleAudition(props) {
	const { audition } = props;

	return (
		<StyledFeaturedActorAudition className={`featured-audtion-item ${props.className}`}>
			<Grid container direction="coloumn">
				<Grid container className="audition-details" alignItems="center">
					<Grid item className="audition-content" md={12} md>
						<div className="audition-name">{audition.name}</div>
						<div className="audition-role">{audition.role}</div>
					</Grid>
				</Grid>
			</Grid>
		</StyledFeaturedActorAudition>
	)
}
