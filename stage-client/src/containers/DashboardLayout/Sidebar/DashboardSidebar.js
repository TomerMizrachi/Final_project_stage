import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import StyledDashboardSidebar from './DashboardSidebar.styles';
import { IconButton } from '@components/uielements/Button/Button';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'

function DashboardSidebar(props) {
	console.log("propsdside",props)
	const onClick = e =>{
		e.preventDefault()
		props.logoutUser()
	}

	return (
		<StyledDashboardSidebar>
			<Box className="header" display="flex" mb={8}>
				<IconButton className="accent offset-right-sm">M</IconButton>

				<div className="user-details">
					<div className="name">{props.auth.user.name}</div>
					<div className="role">Actor</div>
					<NavLink to="/" onClick={onClick}>Logout</NavLink>
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
							<span>Auditions</span>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/dashboard/trainer" exact activeClassName="active">
							<i className="material-icons">extension</i>
							<span>Trainer</span>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/profile" exact activeClassName="active">
							<i className="material-icons">person</i>
							<span>Profile</span>
						</NavLink>
					</Grid>
				</Grid>
			</div>
		</StyledDashboardSidebar>
	)
}

DashboardSidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(DashboardSidebar)