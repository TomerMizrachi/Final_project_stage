import React, { useEffect } from 'react'
import RecruiterLayout from '@containers/DashboardLayout/RecruiterLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'
import { Grid, Box } from '@material-ui/core';
import { myAuditions } from '@actions/recruiterActions'
import { withRouter } from 'react-router-dom'

function Recruiter(props) {
    // console.log("propssss: ", props.auth.user.id)
    useEffect(() => {
        props.myAuditions(props.auth.user.id)
    })
    return (
        <RecruiterLayout>
            <Grid>
                <Grid item xs={6}>
                    <h1 className="title">Hi {props.auth.user.name}, it׳s great having you here.</h1>
                </Grid>
                <Grid>
                    <h3 className="dec">Here are your published auditions:</h3>
                </Grid>
            </Grid>
            {/* <DashboardTopCards stats={props.actor} /> */}
        </RecruiterLayout>
    );
}

Recruiter.propTypes = {
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
)(withRouter(Recruiter))