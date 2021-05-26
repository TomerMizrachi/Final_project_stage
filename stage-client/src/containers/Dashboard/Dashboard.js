import React, { useEffect } from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import DashboardTopCards from '@containers/Dashboard/DashboardTopCards/DashboardTopCards';
import VacancyStats from '@containers/Dashboard/VacancyStats/VacancyStats'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logoutUser } from '@actions/authActions'
import { getActorInfo,getMyRelevantAuditions,getMyAuditions } from '@actions/actorActions'

function Dashboard(props) {
	console.log("props: ", props)

	useEffect(() => {
		const params = {
			// gender:props.actor.profile.gender,
			//	body_structure:props.actor.profile.body_structure,
			 eyes: "Blue",
			// hair:props.actor.profile.hair
		}
		props.getActorInfo(props.auth.user.id)

	}, [props.auth.user])
	return (
		<DashboardLayout user={props.auth.user}>
			<DashboardTopCards /> 
			<VacancyStats />
		</DashboardLayout>
	);
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	getActorInfo: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	getMyRelevantAuditions: PropTypes.func.isRequired,
	getMyAuditions: PropTypes.func.isRequired,
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ logoutUser, getActorInfo,getMyRelevantAuditions,getMyAuditions}
)(withRouter(Dashboard))