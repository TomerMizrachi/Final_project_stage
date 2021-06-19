import React, { useEffect } from 'react'
import RecruiterLayout from '@containers/DashboardLayout/RecruiterLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'
import { Grid } from '@material-ui/core';
import { myAuditions } from '@actions/recruiterActions'
import { withRouter } from 'react-router-dom'
import SubmittedCards from './SubmittedCards/SubmittedCards';

function Submitted(props) {
    console.log(props)
    useEffect(() => {
    }, [props.auth.user])
    return (
        <RecruiterLayout>
            <Grid>
                <Grid item xs={6}>
                    <h1 className="title">Hi {props.auth.user.name}.</h1>
                </Grid>
                <Grid>
                    <h3 className="dec">Here are all the submitted auditions :</h3>
                </Grid>
            </Grid>
            <SubmittedCards />
        </RecruiterLayout>
    );
}

Submitted.propTypes = {
    logoutUser: PropTypes.func.isRequired,
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
    { logoutUser, myAuditions }
)(withRouter(Submitted))