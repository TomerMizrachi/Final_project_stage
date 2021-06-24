import React, { useEffect, useState } from 'react'
import StyledPracticeStep from './PracticeGrid.styles';
import Audition from './PracticeSteps/Audition';
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'

function AuditionsGrid(props) {
	const [SubSucsess, setSubSucsess] = useState(false)
	// useEffect(() => {
	// 	setSubSucsess(props.history.location.state.audition.submitted)

	// }, [props.history.location.state.audition.submitted])
	const closeAlert = () => {
		// props.falseSub()
		setSubSucsess(false)
	}
	return (
		<StyledPracticeStep>
			<div className="grid-container">
				{SubSucsess && <Alert onClose={() => { closeAlert() }} severity="success">This is a success — The Actor will get your message!</Alert>}

				<div className="wrapper">
					<Grid container spacing={4}>
						{props.videos.map((video, index) => (
							<Grid item key={index} xs={3}>
								<Audition video={video} />
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</StyledPracticeStep>
	)
}
AuditionsGrid.propTypes = {
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	actor: state.actor
})

export default connect(
	mapStateToProps,
)(withRouter(AuditionsGrid))