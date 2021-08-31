import React, { useEffect } from 'react'
import Banner from './Banner/Banner'
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AuditionList from './AuditionsList/AuditionList'
import { getActorInfo } from '@actions/actorActions'


function AllAuditions(props) {
	console.log(props)
	useEffect(() => {
		props.getActorInfo(props.auth.user.id)
	}, [])
	
	return (
		<DashboardLayout>
			<Banner/>
			<AuditionList /> 
		</DashboardLayout>
	)
}

AllAuditions.propTypes = {
	getActorInfo: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ getActorInfo }
)(withRouter(AllAuditions))