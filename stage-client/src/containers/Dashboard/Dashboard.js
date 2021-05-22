import React from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import DashboardTopCards from '@containers/Dashboard/DashboardTopCards/DashboardTopCards';
import VacancyStats from '@containers/Dashboard/VacancyStats/VacancyStats'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'

function Dashboard(props) {
	console.log("props: ", props.auth.user)
	return (
		<DashboardLayout user={props.auth.user}>
			<DashboardTopCards />
			<VacancyStats />
		</DashboardLayout>
	);
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard)