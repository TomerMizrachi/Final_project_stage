import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import Details from './Details/Details'
import { getActorInfo } from '@actions/actorActions'
import ShowReal from './ShowReal/ShowReal'
import Gallery from "./Gallery/Gallery";

function Profile(props) {
    useEffect(() => {
        props.getActorInfo(props.auth.user.id)
    }, [])

    return (
        <DashboardLayout>
            <Details />
            <Gallery />
            <ShowReal />
        </DashboardLayout>
    )
}

Profile.propTypes = {
    getActorInfo: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    actor: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    actor: state.actor,
    error: state.error
})



export default connect(
    mapStateToProps,
    { getActorInfo }
)(withRouter(Profile))
