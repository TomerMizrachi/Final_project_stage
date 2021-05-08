import React from 'react';
import SiteConfig from '@config/site.config';
import StyledBanner from './Banner.styles';
import BannerActorCard from './BannerActorCard/BannerActorCard';
import { LinkButton } from '@components/uielements/Button/Button';
import { Box } from '@material-ui/core';

function Banner() {
	const bannerActorData = {
		'name': 'Tomer',
		'title': 'Actor',
		'image': SiteConfig.BLANK_IMAGE,
		'rating': 5,
	};

	return (
		<StyledBanner id="banner">
			<div className="container">
				<Box className="banner-wrapper" py={10}>
					<div className="content">
						<h2 className="title">
							<span>The only place to find all </span>
							<span className="text-accent">auditions and actors</span>
						</h2>
						<div className="desc">Stage is the only place to recuite, practice and watch recorded <br />auditions</div>
						<div className="actions">
							<LinkButton className="login-btn accent round">Start Now</LinkButton>
							<LinkButton className="login-btn default round offset-left-sm">
								<i className="material-icons">play_circle_outline</i>
								<span>Watch Demo</span>
							</LinkButton>
						</div>
					</div>
					<div className="image-block">
						<img className="banner-img" src="/images/pages/home/banner.png" alt="Banner" />
						<BannerActorCard className="actor-card" actor={bannerActorData} />
					</div>
				</Box>
			</div>
		</StyledBanner>
	)
}

export default Banner;