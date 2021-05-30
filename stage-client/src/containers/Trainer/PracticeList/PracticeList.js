import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import SingleAudition from './SingleAudition/SingleAudition'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMyAuditions } from '@actions/actorActions'


function PracticeList(props) {

	useEffect(() => {
		async function fetchData() {
			await props.getMyAuditions(props.auth.user.actor_id);
		}
		fetchData()
	}, [])

	return (
		<div className="container">
			<Box className="wrapper" py={8} mb={4}>
				<Box className="header" mb={5}>
					<Grid container justify="space-between" alignItems="flex-end" spacing={4}>
						<Grid item>
							<h3 className="title">Showing {props.actor.auditions.length} trainings</h3>
						</Grid>
					</Grid>
				</Box>
				<Grid container className="all-auditions" spacing={5}>

					{props.actor.auditions ?
						props.actor.auditions.map((audition, index) => (
							<Grid item key={index} className="featured-audition" xs={12} height={30}>
								<SingleAudition audition={audition} />
							</Grid>
						)) : null}
				</Grid>

			</Box>
		</div>
	)
}

PracticeList.propTypes = {
	getMyAuditions: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ getMyAuditions }
)(withRouter(PracticeList))