import React, { useEffect, useState } from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import PracticeList from './PracticeList/PracticeList'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMyAuditions } from '@actions/actorActions'

function Trainer(props) {
	useEffect(() => {
		props.getMyAuditions(props.auth.user.actor_id)
	}, [props.actor.profile])

	return (
		<DashboardLayout>
			{props.actor.auditions.length > 0 && <PracticeList/>}
		</DashboardLayout>
	)
}

Trainer.propTypes = {
	getMyAuditions: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ getMyAuditions }
)(withRouter(Trainer))



