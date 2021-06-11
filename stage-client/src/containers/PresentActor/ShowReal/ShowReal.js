import React from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeGrid.styles'
import VideoBox from './VideoBox'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function ShowReal(props) {
    const { videos } = props
    return (
        <StyledPracticeStep>
            <Grid container spacing={5} className="align">
                <Grid item xs={12}>
                  
                    <Box mb={6}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center">
                                <div className="heading4">SHOW REAL</div>
                            </Box>
                        </Box>
                        <div className="grid-container">
                            <div className="wrapper">
                                <Grid container spacing={4}>
                                    {videos && videos.map((video, index) => (
                                        <Grid item key={index} xs={6}>
                                            <VideoBox video={video} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </StyledPracticeStep>
    )
}
ShowReal.propTypes = {
    auth: PropTypes.object.isRequired,
    actor: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    actor: state.actor,
    errors: state.errors
})
export default connect(
    mapStateToProps,
)(withRouter(ShowReal))