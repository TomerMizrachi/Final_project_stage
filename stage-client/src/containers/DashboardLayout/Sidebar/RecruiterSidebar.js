import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import StyledDashboardSidebar from './DashboardSidebar.styles';
import { IconButton } from '@components/uielements/Button/Button';

export default function RecruiterSidebar() {
	return (
		<StyledDashboardSidebar>
			<Box className="header" display="flex" mb={8}>
				<IconButton className="accent offset-right-sm">M</IconButton>

				<div className="user-details">
					<div className="name">Ester Kling</div>
					<div className="role">Recruiter</div>
				</div>
			</Box>

			<div className="navigation">
				<Grid container direction="column">
					<Grid item>
						<NavLink to="/recruiter" exact activeClassName="active">
							<i className="material-icons">home</i>
							<span>Dashboard</span>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/allactors" exact activeClassName="active">
							<i className="material-icons flipX">search</i>
							<span>Search Actor</span>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/recruiter/publish" exact activeClassName="active">
							<i className="material-icons">extension</i>
							<span>Publish Audition</span>
						</NavLink>
					</Grid>
				</Grid>
			</div>
		</StyledDashboardSidebar>
	)
}
