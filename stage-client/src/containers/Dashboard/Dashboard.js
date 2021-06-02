import React, { useEffect, useState } from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import DashboardTopCards from '@containers/Dashboard/DashboardTopCards/DashboardTopCards';
import VacancyStats from '@containers/Dashboard/VacancyStats/VacancyStats'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logoutUser } from '@actions/authActions'
import { Grid, Box } from '@material-ui/core';
import { getActorInfo, getAuditionMetrics, getMyAuditions, getMyRelevantAuditions } from '@actions/actorActions'

function Dashboard(props) {
	const [invitedNum, setInvitedNum] = useState()
	const [submitted, setSubmitted] = useState()
	const calcInviteNum = () => {
		let count = 0
		props.actor.auditions.map((audition) => {
			if (audition.DM)
				count++
		})
		return count
	}
	const submittedAuditions = () => {
		let count = 0
		props.actor.auditions.map((audition) => {
			if (audition.submitted)
				count++
		})
		return count
	}
	useEffect(() => {
		setInvitedNum(calcInviteNum())
		setSubmitted(submittedAuditions())
	}, [props.actor.auditions])

	useEffect(() => {
		props.getMyAuditions(props.auth.user.actor_id)
		props.getAuditionMetrics(props.auth.user.actor_id)
		props.getActorInfo(props.auth.user.id)
		
	}, [props.auth.user])

	useEffect(() => {
		console.log( props)
		const params = {
			age: props.actor.profile.age,
			height: props.actor.profile.height,
			gender: props.actor.profile.gender,
			body_structure: props.actor.profile.body_structure,
			hair: props.actor.profile.hair,
			eyes: props.actor.profile.eyes,	
		}
		props.getMyRelevantAuditions(params)
	}, [props.actor.profile])

	return (
		<DashboardLayout user={props.auth.user}>
			<Grid>
				<Grid item xs={6}>
					<h1 className="title">Hi {props.auth.user.name}, it׳s great having you here.</h1>
				</Grid>
				<Grid>
					<h3 className="dec">Here are your recent practices and audition submissions:</h3>
				</Grid>
			</Grid>
			<DashboardTopCards stats={props.actor} invitedNum={invitedNum} submitted={submitted} />
		</DashboardLayout>
	);
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	getActorInfo: PropTypes.func.isRequired,
	getAuditionMetrics: PropTypes.func.isRequired,
	getMyRelevantAuditions: PropTypes.func.isRequired,
	getMyAuditions: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ logoutUser, getActorInfo, getAuditionMetrics, getMyAuditions, getMyRelevantAuditions }
)(withRouter(Dashboard))