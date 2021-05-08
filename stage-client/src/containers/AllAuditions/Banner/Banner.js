import React from 'react';
import HeroAuditions from './Banner.styles';
import SearchBar from './SearchBar/SearchBar';
import { Box } from '@material-ui/core';

function Banner() {
	return (
		<HeroAuditions>
			<div className="container">
				<Box className="banner-wrapper" py={10}>
					<div className="content">
						<h2 className="title">
							<span>Find your dream auditions</span>
							<span className="text-accent">through Stage</span>
						</h2>
					</div>
					<div className="image-block">
						<img className="banner-img" src="/images/pages/auditions/banner.png" alt="Banner" />
					</div>
				</Box>
				<SearchBar></SearchBar>
			</div>
		</HeroAuditions>
	)
}

export default Banner;