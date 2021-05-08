import React from 'react';
import StyledFeaturedAuditions from './FeaturedAuditions.styles';
import { Grid, Box } from '@material-ui/core';
import SiteConfig from '@config/site.config';
import FeaturedAuditionItem from './FeaturedAuditionItem/FeaturedAuditionItem';
import { Button } from '@components/uielements/Button/Button';

export default function FeaturedAuditions() {
	const featuredAuditions = [
		{
			'title': 'The beauty & beast',
			'name': 'Avi Nesher',
			'date': '14/2/2020',
			'category': 'Comedy, theatre',
			'image': SiteConfig.BLANK_IMAGE,
			'link': '',
		},
		{
			'title': 'The beauty & beast',
			'name': 'Avi Nesher',
			'date': '14/2/2020',
			'category': 'Comedy, theatre',
			'image': SiteConfig.BLANK_IMAGE,
			'link': '',
			'favorite': true,
		},
		{
			'title': 'The beauty & beast',
			'name': 'Avi Nesher',
			'date': '14/2/2020',
			'category': 'Comedy, theatre',
			'image': SiteConfig.BLANK_IMAGE,
			'link': '',
		},
		{
			'title': 'The beauty & beast',
			'name': 'Avi Nesher',
			'date': '14/2/2020',
			'category': 'Comedy, theatre',
			'image': SiteConfig.BLANK_IMAGE,
			'link': '',
		},
	];

	return (
		<StyledFeaturedAuditions>
			<div className="container">
				<Box className="wrapper" pt={4} pb={8} mb={4}>
					<Box className="header" mb={4}>
						<Grid container justify="center" alignItems="center" spacing={2} direction="column">
							<Grid item xs={5}>
								<h3 className="title">Featured Auditions</h3>
							</Grid>
							<Grid item xs={5}>
								<div className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
							</Grid>
						</Grid>
					</Box>

					<Box mb={5}>
						<Grid container className="featured-auditions" spacing={5}>
							{featuredAuditions.map((audition, index) => (
								<Grid item key={index} className="featured-audition" sm={3}>
									<FeaturedAuditionItem audition={audition} />
								</Grid>
							))}
						</Grid>
					</Box>

					<Box display="flex" justifyContent="center">
						<Button className="accent round">View more</Button>
					</Box>
				</Box>
			</div>
		</StyledFeaturedAuditions>
	)
}
