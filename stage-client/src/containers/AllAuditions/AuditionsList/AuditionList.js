import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition/SingleAudition.styles';
import { Link } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import SiteConfig from '@config/site.config';
import SingleAudition from './SingleAudition/SingleAudition';

export default function AuditionList() {
	const featuredAuditions = [
		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'image': SiteConfig.BLANK_IMAGE,
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},

		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'image': SiteConfig.BLANK_IMAGE,
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},
		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'image': SiteConfig.BLANK_IMAGE,
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},
		{
			'name': 'Beauty & the Beast',
			'role': 'The beast',
			'image': SiteConfig.BLANK_IMAGE,
			'end_of_recruitment': '14/2/2021',
			'genere': 'comedy,genere',
		},
	];

	return (
		<StyledFeaturedActorAudition>
			<div className="container">
				<Box className="wrapper" py={8} mb={4}>
					<Box className="header" mb={5}>
						<Grid container justify="space-between" alignItems="flex-end" spacing={40}>
							<Grid item>
								<h3 className="title">Showing 24 auditions matches your profile</h3>
							</Grid>
							<Grid item>
								<Link to="#" className=""><strong>view more</strong></Link>
							</Grid>
						</Grid>
					</Box>

					<Grid container className="featured-auditions" spacing={3}>
						{featuredAuditions.map((audition, index) => (
							<Grid item key={index} className="featured-audition" sm={3}>
								<SingleAudition audition={audition} />
							</Grid>
						))}
					</Grid>
				</Box>
			</div>
		</StyledFeaturedActorAudition>
	)
}
