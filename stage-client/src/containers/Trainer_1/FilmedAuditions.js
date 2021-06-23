import React, { useState, useEffect } from 'react'
import SiteConfig from '@config/site.config';
import { Box } from '@material-ui/core';
import { LinkButton } from '@components/uielements/Button/Button';
import PracticeGrid from './PracticeGrid/AuditionGrid';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logoutUser } from '@actions/authActions'

function FilmedAuditions(props) {
	// const videos = props.actor.trainerAudition.videos
	const [videos, setVideos] = useState()
	useEffect(() => {
		setVideos(props.actor.trainerAudition.videos)
	}, [props.actor.trainerAudition])

	return (
		<Box mb={6}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Box display="flex" alignItems="center">
					<div className="heading4">My Filmed Auditions</div>
				</Box>
			</Box>

			{videos && <PracticeGrid videos={videos} />}
		</Box>
	)
}
FilmedAuditions.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(FilmedAuditions))