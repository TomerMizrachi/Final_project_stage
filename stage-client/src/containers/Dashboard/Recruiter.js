import React from 'react'
import RecruiterLayout from '@containers/DashboardLayout/RecruiterLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'



function Recruiter(props) {
    console.log("props: ", props)
    return (
        <RecruiterLayout>

        </RecruiterLayout>
    );
}

Recruiter.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    recruiter: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    recruiter: state.recruiter
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Recruiter)