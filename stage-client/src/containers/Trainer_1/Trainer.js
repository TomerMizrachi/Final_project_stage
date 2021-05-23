import React from 'react'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import DashboardTopCards from '@containers/Trainer/TrainerTopCards/TrainerTopCards';
import VacancyStats from '@containers/Dashboard/VacancyStats/VacancyStats'
import PracticeComp from '@containers/Trainer/PracticeComp';
import FilmedAuditions from '@containers/Trainer/FilmedAuditions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'

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
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Trainer)