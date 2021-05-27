import React from 'react';
import Banner from './Banner/Banner';
import SearchBar from './Banner/SearchBar/SearchBar';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AuditionList from './AuditionsList/AuditionList';
import { getActorInfo } from '@actions/actorActions'


function AllAuditions(props) {
	console.log(props)
	return (
		<DashboardLayout>
			<Banner>
				<SearchBar />
			</Banner>
			{props.actor ? <AuditionList /> : null}
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