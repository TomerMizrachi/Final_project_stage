import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition/SingleAudition.styles';
import { Link } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import SiteConfig from '@config/site.config';
import SingleAudition from './SingleAudition/SingleAudition';

export default function PracticeList() {
	const featuredAuditions = [
		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},

		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},
		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},
		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},
	];

	return (
		
	
			<div className="container">
				<Box className="wrapper" py={8} mb={4}>
					<Box className="header" mb={5}>
						<Grid container justify="space-between" alignItems="flex-end" spacing={40}>
							<Grid item>
								<h3 className="title">Showing {featuredAuditions.length} trainings</h3>
							</Grid>
						</Grid>
					</Box>
					<Grid container className="all-auditions" spacing={5}>

						{featuredAuditions.map((audition, index) => (
							<Grid item key={index} className="featured-audition"  xs={12} height={30}>
								<SingleAudition audition={audition} />
							</Grid>
						))}
					</Grid>

				</Box>
			</div>
	)
}
