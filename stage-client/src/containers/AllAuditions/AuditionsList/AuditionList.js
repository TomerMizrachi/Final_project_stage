import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import SingleAudition from './SingleAudition/SingleAudition'
import { Select, MenuItem, FormControl, Button, Menu } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getActorInfo, getMyRelevantAuditions } from '@actions/actorActions'

function AuditionList(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [list, setList] = useState();
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleChange = (event) => {
		setList(event.target.value);
	};

	return (

		<div className="container">
			<Box className="header" mb={5}>
				<Grid container justify="space-between" alignItems="flex-end" spacing={4}>
					<Grid item>
						<h3 className="title">Showing {props.actor.relevantauditions.length} Relevant auditions</h3>
					</Grid>
					{/* <Button aria-controls="simple-menu" aria-haspopup="true" color="primary" variant="contained" onClick={handleClick}>
						Open Menu</Button> */}
					{/* <FormControl variant="outlined" size="small">
						<Select
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={open}
							onClose={handleClose}
							onChange={handleChange}
							onOpen={handleOpen}
							value={list}
						>
							<MenuItem onClick={handleClose} value="invited">Invited Auditions</MenuItem>
							<MenuItem onClick={handleClose} value="relevant">Relevant Auditions</MenuItem>
							{/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
					{/* </Select> */}
					{/* </FormControl> */}
					<FormControl variant="outlined" size="small" >
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
						// value="invited"
						// keepMounted
						// open={open}
						// onClose={handleClose}
						// onChange={handleChange}
						// onOpen={handleOpen}
						// value={list}
						>
							<MenuItem value="invited">Invited Auditions</MenuItem>
							<MenuItem value="relevant">Relevant Auditions</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Box>
			<Grid container className="all-auditions" spacing={5}>

				{props.actor.relevantauditions.map((audition, index) => (
					<Grid item key={index} className="featured-audition" xs={12}>
						<SingleAudition audition={audition} />
					</Grid>
				))}
			</Grid>
		</div>
	)
}

AuditionList.propTypes = {
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
	{ getMyRelevantAuditions, getActorInfo }
)(withRouter(AuditionList))