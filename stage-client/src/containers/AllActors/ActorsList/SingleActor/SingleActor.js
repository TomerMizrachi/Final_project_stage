import React, { useState } from 'react';
import StyledFeaturedActor from '@containers/AllAuditions/AuditionsList/SingleAudition/SingleAudition.styles';
import { Button } from '@components/uielements/Button/Button'
import { Grid } from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { sendDM } from '@actions/recruiterActions'

function SingleActor(props) {
    console.log(props)
    const { actor } = props
    const [auditionID, setAuditionID] = useState('')
    const recruiterAudition = props.recruiter.auditions

    const onClick = e => {
        e.preventDefault()
        const data = {
            audition_id: auditionID,
            actor_id: actor._id,
            DM: "true"
        }
        props.sendDM(data)
    }
   
    return (
        <StyledFeaturedActor className={`featured-audtion-item ${props.className}`}>
            <Grid container direction="column">
                <Grid item className="audition-name heading4" md>Name: {actor.user_info[0] && actor.user_info[0].full_name}</Grid>
                <Grid container className="audition-details" alignItems="center">
                    <Grid item className="audition-content" md>
                        <div className="recruitment-details">Gender: {actor.gender}</div>
                        <div className="audition-name text-accent">Age: {actor.age}</div>
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
                    <Grid item className="ctas" rtl>
                        <TextField select label="Audition" variant="outlined" size="small" fullWidth
                            value={auditionID} onChange={e => setAuditionID(e.target.value)}>
                            {recruiterAudition ? (
                                recruiterAudition.map((audition, index) => (
                                    <MenuItem value={audition._id} key={index}>{audition.name}</MenuItem>))) :
                                (< MenuItem value="No auditions">No auditions</MenuItem>)}
                        </TextField>
                        <Button onClick={onClick} className="default round fullwidth active text-accent">Send audition</Button>
                    </Grid>
                </Grid>
            </Grid>
        </StyledFeaturedActor >
    )
}

SingleActor.propTypes = {
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
)(withRouter(SingleActor))