import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SiteConfig from '@config/site.config';
import StyledHeader from './Header.styles';
import { LinkButton, IconButton } from '@components/uielements/Button/Button';
import { Badge, Box } from '@material-ui/core';
import { connect } from 'react-redux';

function Header({ auth }) {
	return (
		<StyledHeader>
			<Box className="header-wrapper" px={3} py={2}>
				<Link to="/" className="logo">
					<img src="/images/logo.svg" alt={SiteConfig.SITE_NAME} />
				</Link>

				<div className="navbar">
					<ul className="menu">
						<li>
							<NavLink to="/" exact activeClassName="active">Home</NavLink>
						</li>
						<li>
							<NavLink to="/case-studies" activeClassName="active">Case studies</NavLink>
						</li>
					</ul>

					<div className="search-box">
						<div className="search">
							<input type="text" className="search-field" placeholder="Search here..." />
							<button type="submit" className="icon-btn"></button>
						</div>
					</div>

					{auth.isAuthenticated ? (
						<IconButton className="default">
							<Badge badgeContent={12} color="primary">
								<i className="material-icons">notifications</i>
							</Badge>
						</IconButton>
					) : (
						<div className="nav-btns">
							<LinkButton href="/login" className="login-btn default round">Log In</LinkButton>
							<LinkButton href="/signup" className="signup-btn accent round offset-left-sm">Sign Up</LinkButton>
						</div>
					)}
				</div>
			</Box>
		</StyledHeader>
	)
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(Header);
