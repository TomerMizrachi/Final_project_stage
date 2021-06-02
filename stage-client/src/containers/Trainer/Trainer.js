import React, {useEffect, useState} from 'react';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import PracticeList from './PracticeList/PracticeList';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getActorInfo, getMyAuditions } from '@actions/actorActions'

function Trainer(props) {
	const [state, setstate] = useState(false)

	useEffect(() => {
		async function fetchData() {
			await props.getMyAuditions(props.auth.user.actor_id);
			setstate(true)
		}
		fetchData()
	}, [props.actor.profile])

	return (
		<DashboardLayout>
			{state ? <PracticeList auditions={props.actor.auditions} /> : null}
		</DashboardLayout>
	)
}

Trainer.propTypes = {
	getMyAuditions: PropTypes.func.isRequired,
	getActorInfo: PropTypes.func.isRequired,
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
	{ getActorInfo, getMyAuditions }
)(withRouter(Trainer))



