import React, { useState } from 'react'
import StyledPracticeStep from './Audition.styles';
import { Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';
import VideoPlayer from "react-happy-video"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SubmitVideo } from '@actions/actorActions'

function Audition(props) {
	const video = props.video
	const _id = props.history.location.state.audition._id
	const submitted = props.history.location.state.audition.submitted
	const send = e => {
		e.preventDefault()
		if (!submitted) {
			var data = JSON.stringify({
				"submitted": true,
				"submittedVideo": video.videoUrl
			});
			props.SubmitVideo(_id, data)
		}
		else {
			console.log("video was already submitted")
			return;
		}
	}

	return (video ?
		(<StyledPracticeStep>
			<Box display="flex" alignItems="center" justifyContent="space-evenly">
				<Grid item >
					<VideoPlayer width="100%" color="#3b3346" source={video.videoUrl} />
				</Grid>
			</Box>
			<div >
				<Grid container direction="column">
					<Grid container className="audition-details" alignItems="center">
						<Grid item className="audition-content" md>
							<div className="audition-name heading4">Filmed Date: {video.createdAt}</div>
							<div className="audition-name text-accent">Similarity:{video.similarity}</div>
							<div className="audition-name text-accent">Exact:{video.exact}</div>
						</Grid>
						<Grid item className="audition-content" md></Grid>
					</Grid>
				</Grid>
			</div>
			<div className="header" />
			<Box display="flex" alignItems="center" justifyContent="space-evenly">
				<Box display="flex" alignItems="center" justifyContent="space-evenly">
					<LinkButton onClick={send} className="sc-eCImvq eNJiRc orange bt-sm round">Submit Audition</LinkButton>
				</Box>
			</Box>
		</StyledPracticeStep>) : null
	)
}
Audition.propTypes = {
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	SubmitVideo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor,
	errors: state.errors
})
export default connect(
	mapStateToProps,
	{ SubmitVideo }
)(withRouter(Audition))