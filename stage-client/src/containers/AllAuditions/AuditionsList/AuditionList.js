import { Grid, Box } from '@material-ui/core'
import SingleAudition from './SingleAudition/SingleAudition'
import { Select, MenuItem, FormControl } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMyRelevantAuditions } from '@actions/actorActions'

function AuditionList(props) {
	console.log(props)
	useEffect(() => {
		console.log(props)
		const params = {
			// gender:props.actor.profile.gender,
			//	body_structure:props.actor.profile.body_structure,
			 eyes: "Blue",
			// hair:props.actor.profile.hair
		}
		props.getMyRelevantAuditions(props.actor.profile._id, params)

	}, [])


	return (

		<div className="container">
			<Box className="header" mb={5}>
				<Grid container justify="space-between" alignItems="flex-end" spacing={4}>
					<Grid item>
						<h3 className="title">Showing {props.getMyRelevantAuditions} Relevant auditions</h3>
					</Grid>
					<FormControl variant="outlined" size="small">
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value="invited"
						>
							{/* <MenuItem value="invited">Invited Auditions</MenuItem> */}
							<MenuItem value="relevant">Relevant Auditions</MenuItem>

						</Select>
					</FormControl>
				</Grid>
			</Box>
			{<Grid container className="all-auditions" spacing={5}>

				{props.actor.relevantauditions.map((audition, index) => (
					<Grid item key={index} className="featured-audition" xs={12}>
						<SingleAudition audition={audition} />
					</Grid>
				))}
			</Grid>}
		</div>
	)
}

AuditionList.propTypes = {
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
	{ getMyRelevantAuditions }
)(withRouter(AuditionList))