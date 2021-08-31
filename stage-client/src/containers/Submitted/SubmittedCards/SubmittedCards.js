import React, { useEffect, useRef, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { myAuditions, mySubmitted } from '@actions/recruiterActions'
import PropTypes from 'prop-types'
import SubmittedBox from './SubmittedBox'

function SubmittedCards(props) {
    console.log("CARDS",props)
    const submitted = props.recruiter.submitted
    const isFirstRun = useRef(true)
    const [errors, setErrors] = useState()

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            props.mySubmitted(props.auth.user.id)
            return
        }
        setErrors({ errors: props.errors })
    }, [props.errors])

    const num = () => {
        let count = 0
        submitted.map((audition)=>{
            count += audition.actor_audition.length
        })
        return count
    }

    return (
        <div className="container">
            <Box className="wrapper" py={4} mb={4}>
                <Box className="header" mb={5}>
                    <Grid container justify="space-between" alignItems="flex-end">
                        <Grid item>
                            <h3 className="title">Showing {num()} auditions</h3>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container className="all-auditions" spacing={5}>
                    {submitted ? submitted.map((audition) => (
                        audition.actor_audition.map((actor_audition, index) => (
                            <Grid item key={index} xs={6}>
                                <SubmittedBox audition={audition} actor_audition={actor_audition} />
                            </Grid>
                        ))
                    )) : null}
                </Grid>
            </Box>
        </div>
    )
}
SubmittedCards.propTypes = {
    mySubmitted: PropTypes.func.isRequired,
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
    { myAuditions, mySubmitted }
)(withRouter(SubmittedCards))