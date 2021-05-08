import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition/SingleAudition.styles';
import { Link } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import SiteConfig from '@config/site.config';
import SingleAudition from './SingleAudition/SingleAudition';

export default function AuditionList() {
	const featuredActors = [
		{
			'name': 'David Hutapea',
			'desc': 'Male, 1.63 cm',
			'image': SiteConfig.BLANK_IMAGE,
			'rating': 4.3,
			'link': '',
		},
		{
			'name': 'Henry Simatupang',
			'desc': 'Female, 1.70 cm',
			'image': SiteConfig.BLANK_IMAGE,
			'rating': 4.8,
			'link': '',
		},
		{
			'name': 'Henry Simatupang',
			'desc': 'Female, 1.70 cm',
			'image': SiteConfig.BLANK_IMAGE,
			'rating': 4.6,
			'link': '',
		},
		{
			'name': 'Henry Simatupang',
			'desc': 'Female, 1.70 cm',
			'image': SiteConfig.BLANK_IMAGE,
			'rating': 4.3,
			'link': '',
		},
	];

	return (
		<StyledFeaturedActorAudition>
			<div className="container">
				<Box className="wrapper" py={8} mb={4}>
					<Box className="header" mb={5}>
						<Grid container justify="space-between" alignItems="flex-end" spacing={10}>
							<Grid item>
								<h3 className="title">Featured actors profile this week</h3>
							</Grid>
							<Grid item>
								<Link to="#" className=""><strong>view more</strong></Link>
							</Grid>
						</Grid>
					</Box>

					<Grid container className="featured-actors" spacing={3}>
						{featuredActors.map((actor, index) => (
							<Grid item key={index} className="featured-actor" sm={3}>
								<SingleAudition actor={actor} />
							</Grid>
						))}
					</Grid>
				</Box>
			</div>
		</StyledFeaturedActorAudition>
	)
}
