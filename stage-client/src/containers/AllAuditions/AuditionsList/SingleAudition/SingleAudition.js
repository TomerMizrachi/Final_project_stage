import React, { useState } from 'react'
import StyledFeaturedActorAudition from './SingleAudition.styles'
import { Button, IconButton } from '@components/uielements/Button/Button'
import { registerToAudition } from '@actions/actorActions'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function useToggle(initialState) {
	const [value, setValue] = useState(initialState)
	const toggle = () => { setValue(!value) }
	return [value, toggle]
};
function SingleAudition(props) {
	const { audition } = props;
	const [modal, setModal] = useToggle(false);
	const typecastArr = Object.values(audition.typecast)
	const onClick = e => {
		e.preventDefault()
		props.registerToAudition(props.auth.user.actor_id, audition._id)
	}
	return (audition && (
		<StyledFeaturedActorAudition className={`featured-audtion-item ${props.className}`}>
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
					<Grid item className="ctas" rtl><Button className="default round active text-accent offset-left-sm" onClick={onClick}>Add to trainer</Button></Grid>
					<Grid item className="ctas" rtl><Button className="default round active text-accent offset-left-sm" onClick={setModal}>More details</Button>

					</Grid>
					{modal ? (<Grid item className="audition-content" md>
						<Grid item className="recruitment-details" style={{ display: "table-caption", textAlign: "center" }} md>{typecastArr.map(user => user + ',\n')}</Grid>
					</Grid>) : (<Grid item className="recruitment-details subtitle" md> </Grid>)}
				</Grid>
			</Grid>
		</StyledFeaturedActorAudition>

	)
	)
}

SingleAudition.propTypes = {
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	registerToAudition: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	actor: state.actor
})

export default connect(
	mapStateToProps,
	{ registerToAudition }
)(withRouter(SingleAudition))
