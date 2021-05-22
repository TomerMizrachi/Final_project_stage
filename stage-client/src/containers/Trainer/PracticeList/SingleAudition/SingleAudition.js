import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition.styles';
import Rating from '@material-ui/lab/Rating';
import { LinkButton,IconButton} from '@components/uielements/Button/Button';
import { Grid, Box, Button } from '@material-ui/core';

export default function SingleAudition(props) {
	const { audition } = props;

	return (
		<StyledFeaturedActorAudition className={`featured-audtion-item ${props.className}`}>
			<Grid container direction="coloumn">
				<Grid container className="audition-details" alignItems="center">
					<Grid item className="audition-content" md>
						<div className="audition-name heading4">{audition.name}</div>
						<div className="audition-name text-accent">{audition.role}</div>
					</Grid>	
					<IconButton className="success static offset-right-sm">
						<i className="material-icons">event</i>
					</IconButton>
					<Grid item className="audition-content" md>
					<Grid item className="recruitment-details" md>{audition.end_of_recruitment}</Grid>
					<Grid item className="recruitment-details subtitle">End of recruitment</Grid>
					</Grid>
					<IconButton className="orange static offset-right-sm">
						<i className="material-icons">description</i>
					</IconButton>
					<Grid item className="audition-content" md>
					<Grid item className="recruitment-details" md>{audition.genere}</Grid>
					<Grid item className="recruitment-details subtitle" md>Audition genere</Grid>
					</Grid>
					<Grid item className="ctas" rtl><LinkButton href="/login" className="default round active text-accent offset-left-sm">More details</LinkButton></Grid>
					<Grid><IconButton className="danger heart static offset-right-sm">
						<i className="material-icons">favorite</i>
					</IconButton></Grid>


				</Grid>
			</Grid>
		</StyledFeaturedActorAudition>
	)
}
