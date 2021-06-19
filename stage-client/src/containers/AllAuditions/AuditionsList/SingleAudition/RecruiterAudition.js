import React, { useState, useEffect, useRef } from 'react'
import StyledRecruiterCards from './RecruiterAudition.styles';
import { Button, IconButton } from '@components/uielements/Button/Button';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateAudition } from '@actions/recruiterActions'

function useToggle(initialState) {
	const [value, setValue] = useState(initialState);
	const toggle = () => { setValue(!value) };

	return [value, toggle];
};

function RecruiterAudition(props) {
	const { audition } = props
	console.log(audition)
	const [modal, setModal] = useToggle(false)
	const [is_active, setIs_active] = useState()
	const isFirstRun = useRef(true)

	const obj = audition.typecast
	const str = Object
		.entries(obj)
		.reduce((a, e) => {
			if (typeof e[1] != "function") {
				a += `${e[0]} : ${e[1]} | `
			}
			return a;
		}, "`")
		.slice(1, -2) + ""

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			if (audition) {
				setIs_active(audition._id)
			}
			return;
		}
	}, [props.errors])


	const updateIsActive = () => {
		let params = {
			id: audition._id,
			is_active: !is_active
		}
		setIs_active(!is_active)
		props.updateAudition(params)
	}


	return (audition && (
		<StyledRecruiterCards className={`featured-audtion-item ${props.className}`}>
			<Grid container direction="column">
				<Grid container className="audition-details" alignItems="center">
					<Grid item className="audition-content" md>
						<div className="audition-name heading4">Name: {audition.name}</div>
						<div className="audition-name text-accent">Roll: {audition.role}</div>
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
					<Grid item className="audition-content" md >
						<Button className="default round active text-accent offset-left-sm" onClick={setModal}>Roll typecast</Button>
					</Grid>
					{is_active ?
						(<Grid item className="audition-content" md >
							<Button className="default round active text-accent offset-left-sm" onClick={updateIsActive}>Close reqruitment</Button>
						</Grid>) :
						(<Grid item className="audition-content" md >
							<Button className="default round active text-accent offset-left-sm" onClick={updateIsActive}>Open reqruitment</Button>
						</Grid>)
					}
				</Grid>
				{modal ? (<Grid item className="audition-content" md>
					<Grid item className="recruitment-details" md>{str}</Grid>
				</Grid>) : (<Grid item className="recruitment-details subtitle" md> </Grid>)}
			</Grid>
		</StyledRecruiterCards>))
}

RecruiterAudition.propTypes = {
	// auth: PropTypes.object.isRequired,
	updateAudition: PropTypes.func.isRequired,
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
	{ updateAudition }
)(withRouter(RecruiterAudition))
