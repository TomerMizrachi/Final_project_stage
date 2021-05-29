import React, { useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { myAuditions } from '@actions/recruiterActions'
import PropTypes from 'prop-types'
import RecruiterAudition from '@containers/AllAuditions/AuditionsList/SingleAudition/RecruiterAudition'

function RecruiterCards(props) {
    // const [auditions, setAuditions] = useState([]);
    const auditions = props.recruiter.auditions
    console.log(auditions)
    useEffect(() => {
        // myAuditions(props.auth.user.id)
        // props.myAuditions(props.auth.user.id)

        // setAuditions(props.actor.auditions)
    }, [])
    return (
        <div className="container">
            <Box className="wrapper" py={8} mb={4}>
                <Box className="header" mb={5}>
                    <Grid container justify="space-between" alignItems="flex-end" spacing={4}>
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
    myAuditions: PropTypes.object.isRequired,
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