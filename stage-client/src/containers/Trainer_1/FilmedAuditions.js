import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@material-ui/core'
import PracticeGrid from './PracticeGrid/AuditionGrid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setTrainerAudition } from '@actions/actorActions'

function FilmedAuditions(props) {
	const [videos, setVideos] = useState()
	const isFirstRun = useRef(true)
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			props.setTrainerAudition(JSON.parse(localStorage.getItem('trainerAudition')))
			return
		}
	}, [])

	useEffect(() => {
		setVideos(props.actor.trainerAudition.videos)
	}, [props.actor])

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
	setTrainerAudition: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ setTrainerAudition }
)(withRouter(FilmedAuditions))