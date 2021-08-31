import React, { useState } from 'react'
import StyledPracticeStep from './Audition.styles'
import { Grid, Box } from '@material-ui/core'
import {  LinkButton } from '@components/uielements/Button/Button'
import VideoPlayer from "react-happy-video"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'

function Audition(props) {
	const video = props.video
	const _id = props.actor.trainerAudition._id
	const submitted = props.actor.trainerAudition.submitted
	const [SubSucsess, setSubSucsess] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	// useEffect(() => {
	// 	setSubSucsess(props.history.location.state.audition.submitted)

	// }, [props.history.location.state.audition.submitted])
	const closeAlert = () => {
		// props.falseSub()
		setSubSucsess(false)
	}
	const send = e => {
		e.preventDefault()
		if (!submitted) {
			var data = JSON.stringify({
				"submitted": true,
				"submittedVideo": video.videoUrl
			})
			var config = {
				method: 'put',
				url: `/actor-audition/${_id}`,
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			}
			console.log(data)
			axios(config)
				.then(res => {
					setSubSucsess(true)
				})
				.catch(err => {
					console.log(err)
				})
		}
		else {
			setIsSubmitted(true)
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
			<Grid item>
				{SubSucsess && <Alert onClose={() => { closeAlert() }} severity="success">This is a success — The Recruiter will get your auditon!</Alert>}
			</Grid>
			<Grid item >
				{isSubmitted && <Alert onClose={() => setIsSubmitted(false)} severity="error">The audition was already submitted</Alert>}
			</Grid>

		</StyledPracticeStep>) : null
	)
}
Audition.propTypes = {
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor,
	errors: state.errors
})
export default connect(
	mapStateToProps,
)(withRouter(Audition))