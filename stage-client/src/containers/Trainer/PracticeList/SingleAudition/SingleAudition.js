import React from 'react';
import StyledFeaturedActorAudition from './SingleAudition.styles';
import { LinkButton, IconButton } from '@components/uielements/Button/Button';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
function SingleAudition(props) {
	const { audition } = props;
	console.log(props)
	const onClick = e =>{
		e.preventDefault()
		props.history.push('/trainer')
	}

	return (
		<StyledFeaturedActorAudition className={`featured-audtion-item ${props.className}`}>
			<Grid container direction="coloumn">
				<Grid container className="audition-details" alignItems="center">
					<Grid item className="audition-content" md>
						<div className="audition-name heading4">Name: {audition.auditionInfo.name}</div>
						<div className="audition-name text-accent">Role: {audition.auditionInfo.role}</div>
					</Grid>
					<IconButton className="success static offset-right-sm">
						<i className="material-icons">event</i>
					</IconButton>
					<Grid item className="audition-content" md>
						<Grid item className="recruitment-details" md>{audition.auditionInfo.due_date}</Grid>
						<Grid item className="recruitment-details subtitle">End of recruitment</Grid>
					</Grid>
					<IconButton className="orange static offset-right-sm">
						<i className="material-icons">description</i>
					</IconButton>
					<Grid item className="audition-content" md>
						<Grid item className="recruitment-details" md>{audition.auditionInfo.type}</Grid>
						<Grid item className="recruitment-details subtitle" md>Audition genere</Grid>
					</Grid>
					<Grid item className="ctas" rtl>
						<LinkButton /*href="/login"*/ onClick={onClick} className="default round active text-accent offset-left-sm">Start Practice</LinkButton>
					</Grid>
					<Grid>
						<IconButton className="danger static offset-right-sm">
							<i className="material-icons">favorite</i>
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</StyledFeaturedActorAudition>
	)
}

SingleAudition.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(
	mapStateToProps,
)(withRouter(SingleAudition))