import React from 'react';
import StyledFooter from './Footer.styles';
import SiteConfig from '@config/site.config';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<StyledFooter>
			<div className="container">
				<Box className="footer-wrapper" py={2}>
					<Link to="/" className="logo">
						<img src="/images/logo-light.svg" alt={SiteConfig.SITE_NAME} />
					</Link>
				</Box>
			</div>
		</StyledFooter>
	)
}

export default Footer;
