import React, { useState, useEffect, useRef } from 'react'
import { Grid, Box } from '@material-ui/core'
import SingleAudition from './SingleAudition/SingleAudition'
import InvitedAudition from './SingleAudition/InvitedAudition'
import { TextField, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getActorInfo, getMyRelevantAuditions, getMyAuditions } from '@actions/actorActions'
import { Alert } from '@material-ui/lab'

function AuditionList(props) {
	const isFirstRun = useRef(true)
	const isFirst = useRef(true)
	const [errors, setErrors] = useState()
	const [list, setList] = useState('Relevant Auditions')
	const handleChange = (event) => {
		setList(event.target.value)
	}
	useEffect(() => {
		console.log("what happend")
		props.getMyAuditions(props.auth.user.actor_id)
	}, [])

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false
			return;
		}
		setErrors({ errors: props.errors.actor })
	}, [props.errors])

	useEffect(() => {
		console.log(props)
		if (isFirstRun.current) {
			console.log("first time")
			isFirstRun.current = false;
			return;
		}
		const params = {
			age: props.actor.profile.age,
			height: props.actor.profile.height,
			gender: props.actor.profile.gender,
			body_structure: props.actor.profile.body_structure,
			hair: props.actor.profile.hair,
			eyes: props.actor.profile.eyes,
			skills: props.actor.profile.skills,
			languages: props.actor.profile.languages
		}
		console.log(params)
		props.getMyRelevantAuditions(params)
	}, [props.actor.profile])

	return (
		<div className="container">
			<Box className="header" mb={5}>
				<Grid container justify="space-between" alignItems="flex-end" spacing={4}>
					<Grid item>
						{list === "Relevant Auditions" ?
							<h3 className="title">Showing {props.actor.relevantauditions.length} {list}</h3> :
							<h3 className="title">Showing {list}</h3>}
					</Grid>
					<Grid item xs={4} >
						<TextField select defaultValue="Relevant Auditions" variant="outlined" fullWidth
							value={list} onChange={e => handleChange(e)} size="small" >
							<MenuItem value="Invited Auditions">Invited Auditions</MenuItem>
							<MenuItem value="Relevant Auditions">Relevant Auditions</MenuItem>
						</TextField>
					</Grid>
				</Grid>
			</Box>
			<Grid item>
				{errors && <Alert onClose={() => { setErrors(false) }} severity="error"> {JSON.stringify(errors)} </Alert>}
			</Grid>
			<Grid container className="all-auditions" spacing={5}>
				{list === "Relevant Auditions" ? props.actor.relevantauditions.map((audition, index) => (
					<Grid item key={index} className="featured-audition" xs={12}>
						<SingleAudition audition={audition} />
					</Grid>
				)) :
					props.actor.auditions.map((audition, index) => (
						<Grid item key={index} className="featured-audition" xs={12}>
							<InvitedAudition audition={audition} />
						</Grid>
					))}
			</Grid>
		</div>
	)
}

AuditionList.propTypes = {
	getMyAuditions: PropTypes.func.isRequired,
	getActorInfo: PropTypes.func.isRequired,
	getMyRelevantAuditions: PropTypes.func.isRequired,
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
	{ getMyRelevantAuditions, getActorInfo, getMyAuditions }
)(withRouter(AuditionList))