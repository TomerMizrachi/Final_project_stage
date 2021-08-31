import React, { useState, useEffect, useRef } from 'react'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { myAuditions } from '@actions/recruiterActions'
import PropTypes from 'prop-types'
import RecruiterAudition from '@containers/AllAuditions/AuditionsList/SingleAudition/RecruiterAudition'

function RecruiterCards(props) {
    const auditions = props.recruiter.auditions
    const [errors, setErrors] = useState()
    const isFirstRun = useRef(true)
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            props.myAuditions(props.auth.user.id)
            return
        }
        setErrors({ errors: props.errors })
    }, [props.errors])
    return (
        <div className="container">
            <Box className="wrapper" py={4} mb={4}>
                <Box className="header" mb={5}>
                    <Grid container justify="space-between" alignItems="flex-end">
                        <Grid item>
                            <h3 className="title">Showing {auditions.length} auditions</h3>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container className="all-auditions" spacing={5}>
                    {auditions ?
                        auditions.map((audition, index) => (
                            <Grid item key={index} className="featured-audition" xs={12} height={30}>
                                <RecruiterAudition audition={audition} />
                            </Grid>
                        )) : null}
                </Grid>

            </Box>
        </div>
    )
}
RecruiterCards.propTypes = {
    myAuditions: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    recruiter: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    recruiter: state.recruiter
})

export default connect(
    mapStateToProps,
    { myAuditions }
)(withRouter(RecruiterCards))