import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import SingleAudition from './SingleAudition/SingleAudition'
import InvitedAudition from './SingleAudition/InvitedAudition'
import { TextField, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getActorInfo, getMyRelevantAuditions, getMyAuditions } from '@actions/actorActions'

function AuditionList(props) {
	const [list, setList] = useState('Relevant Auditions');
	const handleChange = (event) => {
		setList(event.target.value)
	}
	useEffect(() => {
		props.getMyAuditions(props.auth.user.actor_id)
	}, [])

	useEffect(() => {
		console.log(props)
		const params = {
			age: props.actor.profile.age,
			height: props.actor.profile.height,
			gender: props.actor.profile.gender,
			body_structure: props.actor.profile.body_structure,
			hair: props.actor.profile.hair,
			eyes: props.actor.profile.eyes,
		}
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
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ getMyRelevantAuditions, getActorInfo, getMyAuditions }
)(withRouter(AuditionList))