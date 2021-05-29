import React, { useState, useEffect, useCallback } from 'react'
import StyledRecruiterCards from './RecruiterAudition.styles';
import { Button, LinkButton, IconButton } from '@components/uielements/Button/Button';
// import { registerToAudition } from '@actions/actorActions'
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function useToggle(initialState) {
	const [value, setValue] = useState(initialState);
	const toggle = () => { setValue(!value) };

	return [value, toggle];
};

function RecruiterAudition(props) {
	const { audition } = props;
	const [modal, setModal] = useToggle(false);
	const typecastArr = Object.values(audition.typecast)
	return (audition && (
		<StyledRecruiterCards className={`featured-audtion-item ${props.className}`}>
			<Grid container direction="column">
				<Grid container className="audition-details" alignItems="center">
					<Grid item className="audition-content" md>
						<div className="audition-name heading4">{audition.name}</div>
						<div className="audition-name text-accent">{audition.role}</div>
					</Grid>
					<IconButton className="success static offset-right-sm">
						<i className="material-icons">event</i>
					</IconButton>
					<Grid item className="audition-content" md>
						<Grid item className="recruitment-details" md>{audition.due_date}</Grid>
						<Grid item className="recruitment-details subtitle">End of recruitment</Grid>
					</Grid>
					<IconButton className="orange static offset-right-sm">
						<i className="material-icons">description</i>
					</IconButton>
					<Grid item className="audition-content" md>
						<Grid item className="recruitment-details" md>{audition.type}</Grid>
						<Grid item className="recruitment-details subtitle" md>Audition genere</Grid>
					</Grid>
					<Grid item className="ctas" rtl><Button className="default round active text-accent offset-left-sm" onClick={setModal}>Show actor typecast</Button>
						{modal && <Grid item className="audition-content" md>
							<Grid item className="recruitment-details" style={{ display: "table-caption" }} md>{typecastArr.map(user => user + ',\n')}</Grid>
						</Grid>}
					</Grid>
				</Grid>
			</Grid>
		</StyledRecruiterCards>

	)
	)
}

RecruiterAudition.propTypes = {
	// auth: PropTypes.object.isRequired,
	recruiter: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	// auth: state.auth,
	errors: state.errors,
	recruiter: state.recruiter
})

export default connect(
	mapStateToProps,
)(withRouter(RecruiterAudition))
