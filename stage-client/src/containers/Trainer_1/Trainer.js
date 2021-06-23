import React, { useState, useEffect, useRef } from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import TrainerTopCards from './TrainerTopCards/TrainerTopCards'
import PracticeComp from './PracticeComp'
import FilmedAuditions from './FilmedAuditions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getActorInfo, setTrainerAudition } from '@actions/actorActions'

function Trainer(props) {
	console.log("propsss", props)
	const [errors, setErrors] = useState()
	const isFirstRun = useRef(true)
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			// props.getActorInfo(props.auth.user.id)
			console.log(JSON.parse(localStorage.getItem('trainerAudition')))
			return;
		}
		props.setTrainerAudition(JSON.parse(localStorage.getItem('trainerAudition')))

		setErrors({ errors: props.errors })
	}, [props.errors])

	return (
		<DashboardLayout>
			<TrainerTopCards />
			<PracticeComp />
			<FilmedAuditions />
		</DashboardLayout>
	);
}

Trainer.propTypes = {
	getActorInfo: PropTypes.func.isRequired,
	setTrainerAudition: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ getActorInfo, setTrainerAudition }
)(withRouter(Trainer))