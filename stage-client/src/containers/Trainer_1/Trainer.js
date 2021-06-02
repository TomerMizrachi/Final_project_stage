import React, { useEffect } from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import TrainerTopCards from './TrainerTopCards/TrainerTopCards'
import PracticeComp from './PracticeComp'
import FilmedAuditions from './FilmedAuditions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

function Trainer(props) {
	const data=props
	useEffect(() => {
		console.log("trainerData",data)
		 //console.log("hii", props.location.state.audition)
		// props.getMyAudition(props.location.state.audition)
	}, [])
	return (
		<DashboardLayout>
			<TrainerTopCards data={data}/>
			<PracticeComp />
			<FilmedAuditions />
		</DashboardLayout>
	);
}

Trainer.propTypes = {
    auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
	actor: state.actor
})

export default connect(
    mapStateToProps,
)(withRouter(Trainer))