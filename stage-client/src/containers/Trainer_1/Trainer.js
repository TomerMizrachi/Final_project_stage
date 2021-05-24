import React from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import DashboardTopCards from './TrainerTopCards/TrainerTopCards'
import PracticeComp from './PracticeComp'
import FilmedAuditions from './FilmedAuditions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

function Trainer(props) {
	console.log("props: ", props)
	return (
		<DashboardLayout>
			<DashboardTopCards />
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