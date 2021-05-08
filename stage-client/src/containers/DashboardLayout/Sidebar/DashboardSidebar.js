import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import StyledDashboardSidebar from './DashboardSidebar.styles';
import { IconButton } from '@components/uielements/Button/Button';

export default function DashboardSidebar() {
	return (
		<StyledDashboardSidebar>
			<Box className="header" display="flex" mb={8}>
				<IconButton className="accent offset-right-sm">M</IconButton>

				<div className="user-details">
					<div className="name">Michal Frankel</div>
					<div className="role">Actor</div>
				</div>
			</Box>

			<div className="navigation">
				<Grid container direction="column">
					<Grid item>
						<NavLink to="/dashboard" exact activeClassName="active">
							<i className="material-icons">home</i>
							<span>Dashboard</span>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/allauditions" exact activeClassName="active">
							<i className="material-icons flipX">search</i>
							<span>Search Job</span>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/dashboard/trainer" exact activeClassName="active">
							<i className="material-icons">extension</i>
							<span>Trainer</span>
						</NavLink>
					</Grid>
				</Grid>
			</div>
		</StyledDashboardSidebar>
	)
}
