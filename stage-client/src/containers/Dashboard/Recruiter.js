import React from 'react'
import RecruiterLayout from '@containers/DashboardLayout/RecruiterLayout'
import PublishForm from '@containers/Dashboard/PublishForm/PublishForm'
import { Grid } from '@material-ui/core'
import { Button } from '@components/uielements/Button/Button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '@actions/authActions'
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";


function Recruiter(props) {
    console.log("props: ", props)

    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <RecruiterLayout>
            <ModalProvider>
                <Grid item xs={6}>
                    <Button className="accent bt-xl" onClick={handleClick}>Publish New Audition</Button>
                </Grid>
                <PublishForm />
            </ModalProvider>
        </RecruiterLayout>
    );
}

Recruiter.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Recruiter)