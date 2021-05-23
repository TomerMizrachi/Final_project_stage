import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import SingleActor from './SingleActor/SingleActor'

function ActorList(props) {
	console.log(props)

	return (


		<div className="container">
			<Box className="wrapper" py={8} mb={4}>
				<Box className="header" mb={5}>
					<Grid container justify="space-between" alignItems="flex-end" spacing={40}>
						<Grid item>
							<h3 className="title">Showing {props.recruiter.actors.length} actors matches to typecast</h3>
						</Grid>
					</Grid>
				</Box>
				<Grid container className="all-auditions" spacing={5}>

					{props.recruiter.actors ?
					props.recruiter.actors.map((actor, index) => (
						<Grid item key={index} className="featured-audition" xs={12} height={30}>
							<SingleActor actor={actor} />
						</Grid>
					)): null}
				</Grid>
			</Box>
		</div>
	)
}


ActorList.propTypes = {
	recruiter: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	recruiter: state.recruiter
})

export default connect(
	mapStateToProps
)(withRouter(ActorList))