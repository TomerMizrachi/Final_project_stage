import React from 'react';
import StyledDashboardTopCards from './DashboardTopCards.styles'
import { Grid, Box } from '@material-ui/core'
import { IconButton } from '@components/uielements/Button/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function DashboardTopCards(props) {
	console.log("tipe", props)
	return (
		<Box mb={6}>
			<StyledDashboardTopCards>
				<Grid container spacing={5}>
					<Grid item xs={5}>
						<div className="card-box">
							<Box className="heading4" mb={2}>Auditions</Box>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="orange static">
												<i className="material-icons">library_books</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">{props.actor.relevantauditions.length}</div>
											<div className="desc">Availible Auditions</div>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="success">
												<i className="material-icons">mail</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">{props.invitedNum}</div>
											<div className="desc">Invited Auditions</div>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Grid>
					<Grid item xs={5}>
						<div className="card-box">
							<Box className="heading4" mb={2}>Trainer</Box>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="orange static">
												<i className="material-icons">library_books</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">{props.actor.auditions.length}</div>
											<div className="desc">Auditions In Practice</div>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="success">
												<i className="material-icons">mail</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">{props.submitted}</div>
											<div className="desc">Audition Submitted</div>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</StyledDashboardTopCards>
		</Box>
	)
}

DashboardTopCards.propTypes = {
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
)(withRouter(DashboardTopCards))