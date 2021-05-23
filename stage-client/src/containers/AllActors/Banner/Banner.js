import React from 'react';
import HeroAuditions from '@containers/AllAuditions/Banner/Banner.styles';
import { Box } from '@material-ui/core';

function Banner() {
	return (
		<HeroAuditions>
			<div className="container">
				<Box className="banner-wrapper" py={10}>
					<div className="content">
						<h2 className="title">
							<span>Find the most suitable actor for you</span>
							<span className="text-accent">through Stage</span>

						</h2>
					</div>
					<div className="image-block">
						<img className="banner-img" src="/images/pages/auditions/banner.png" alt="Banner" />
					</div>

				</Box>
			</div>
		</HeroAuditions>
	)
}

export default Banner;