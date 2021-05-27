import React, { useState, useEffect } from 'react'
import SiteConfig from '@config/site.config';
import { Box } from '@material-ui/core';
import { LinkButton } from '@components/uielements/Button/Button';
import PracticeGrid from './PracticeGrid/AuditionGrid';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function FilmedAuditions(props) {
	const audition=props.history.location.state.audition.auditionInfo
	console.log("this is me- props", audition)
	useEffect(() => {
		// props.getMyAuditions(props.auth.user.id)
	}, [])
	const auditions = [
		{
			date: '11/10/2020',
			rate: '#',
		},
		{
			date: '12/10/2020',
			rate: '#',
		},
		{
			date: '13/10/2020',
			rate: '#',
		}
	];

	return (
		<Box mb={6}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Box display="flex" alignItems="center">
					<div className="heading4">My Filmed Auditions</div>
				</Box>
				<LinkButton href="#" className="accent round bt-sm outline">View More</LinkButton>
			</Box>

			<PracticeGrid auditions={auditions} />
		</Box>
	)
}
FilmedAuditions.propTypes = {
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
)(withRouter(FilmedAuditions))