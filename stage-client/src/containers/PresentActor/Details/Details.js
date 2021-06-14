import React, { useState, useRef, useEffect } from 'react';
import StyledFeaturedActor from '@containers/AllAuditions/AuditionsList/SingleAudition/SingleAudition.styles';
import { Button } from '@components/uielements/Button/Button'
import { Grid } from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { sendDM } from '@actions/recruiterActions'
import { Alert } from '@material-ui/lab'

function Details(props) {
    console.log(props)
    const isFirstRun = useRef(true)
    const { actor } = props
    const [auditionID, setAuditionID] = useState('')
    const [errors, setErrors] = useState()
    const recruiterAudition = props.recruiter.auditions

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            return;
        }
        setErrors({ errors: props.errors })
    }, [props.errors])

    const inviteClick = e => {
        e.preventDefault()
        const data = {
            audition_id: auditionID,
            actor_id: actor._id,
            DM: "true"
        }
        props.sendDM(data)
    }

    return (
        <div>
            <Grid item xs={8}>
                {errors && <Alert onClose={() => { setErrors(false) }} severity="error"> {JSON.stringify(errors)} </Alert>}
            </Grid>
            <StyledFeaturedActor className={`featured-audtion-item`}>
                <Grid container direction="column">
                    <Grid item className="audition-name heading4" md>Name: {actor.user_info[0] && actor.user_info[0].full_name}</Grid>
                    <Grid container className="audition-details" alignItems="center">
                        <Grid item className="audition-content" md>
                            <div className="recruitment-details">Gender: {actor.gender}</div>
                            <div className="audition-name">Age: {actor.age}</div>
                        </Grid>
                        <Grid item className="audition-content" md>
                            <Grid item className="recruitment-details" md>Body: {actor.body_structure}</Grid>
                            <Grid item className="recruitment-details">Height: {actor.height}</Grid>
                        </Grid>
                        <Grid item className="audition-content" md>
                            <Grid item className="recruitment-details" md>Hair: {actor.hair}</Grid>
                            <Grid item className="recruitment-details" md>Eyes: {actor.eyes}</Grid>
                        </Grid>
                        <Grid item className="auditi on-content" md>
                            <Grid item className="audition-name heading4" md>Languges:</Grid>
                            {actor.languages ?
                                actor.languages.map((languge) => (
                                    <Grid item key={languge} className="recruitment-details" md>{languge}</Grid>
                                ))
                                : null}
                        </Grid>
                        <Grid item className="audition-content" md>
                            <Grid item className="audition-name heading4" md>Skills:</Grid>
                            {actor.skills ?
                                actor.skills.map((skill) => (
                                    <Grid item key={skill} className="recruitment-details" md>{skill}</Grid>
                                ))
                                : null}
                        </Grid>
                        <Grid item className="audition-content" md>
                            <TextField select helperText="Choose audition" label="Audition" variant="outlined" size="small" fullWidth
                                value={auditionID} onChange={e => setAuditionID(e.target.value)}>
                                {recruiterAudition ? (
                                    recruiterAudition.map((audition, index) => (
                                        <MenuItem value={audition._id} key={index}>{audition.name}</MenuItem>))) :
                                    (< MenuItem value="No auditions">No auditions</MenuItem>)}
                            </TextField>
                            <Button onClick={inviteClick} className="default round fullwidth active text-accent">Invaite Actor</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </StyledFeaturedActor >
        </div>
    )
}

Details.propTypes = {
    sendDM: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    recruiter: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    recruiter: state.recruiter,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { sendDM }
)(withRouter(Details))