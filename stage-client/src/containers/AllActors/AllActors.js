import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Banner from './Banner/Banner'
import RecruiterLayout from '@containers/DashboardLayout/RecruiterLayout'
import ActorList from './ActorsList/ActorsList'
import Typecast from './Typecast/TypeCast'

function AllActors(props) {
	console.log("allactorscomp:",props)
	return (
		<RecruiterLayout>
			<Banner/>
			<Typecast/>
			<ActorList/>
		</RecruiterLayout>
	)
}

AllActors.propTypes = {
	auth: PropTypes.object.isRequired,
	recruiter: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	recruiter: state.recruiter,
	errors: state.errors
})

export default connect(
	mapStateToProps,
)(withRouter(AllActors))