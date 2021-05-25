import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition.styles';
import { Button,LinkButton,IconButton} from '@components/uielements/Button/Button';
import { Grid } from '@material-ui/core';

export default function SingleAudition(props) {
	const { audition } = props;

	return (audition && (
		<StyledFeaturedActorAudition className={`featured-audtion-item ${props.className}`}>
			<Grid container direction="column">
				<Grid container className="audition-details" alignItems="center">
					<Grid item className="audition-content" md>
						<div className="audition-name heading4">{audition.name}</div>
						<div className="audition-name text-accent">{audition.role}</div>
					</Grid>	
					<IconButton className="success static offset-right-sm">
						<i className="material-icons">event</i>
					</IconButton>
					<Grid item className="audition-content" md>
					<Grid item className="recruitment-details" md>{audition.due_date}</Grid>
					<Grid item className="recruitment-details subtitle">End of recruitment</Grid>
					</Grid>
					<IconButton className="orange static offset-right-sm">
						<i className="material-icons">description</i>
					</IconButton>
					<Grid item className="audition-content" md>
					<Grid item className="recruitment-details" md>{audition.type}</Grid>
					<Grid item className="recruitment-details subtitle" md>Audition genere</Grid>
					</Grid>
					<Grid item className="ctas" rtl><Button className="default round active text-accent offset-left-sm" onClick={console.log("clicked")}>Add to trainer</Button></Grid>


				</Grid>
			</Grid>
		</StyledFeaturedActorAudition>
	
	)
	)
}
