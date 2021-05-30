import React from 'react';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import PracticeList from './PracticeList/PracticeList';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function Trainer(props) {
	
	return (
		<DashboardLayout>
			<PracticeList />
		</DashboardLayout>
	)
}

Trainer.propTypes = {
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
)(withRouter(Trainer))



