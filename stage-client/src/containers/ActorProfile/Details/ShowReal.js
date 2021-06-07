import React, { useState, useRef, useEffect } from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeGrid.styles';
import UploadedVideo from './UploadedVideo';
import { Grid, Box } from '@material-ui/core';
import { connect } from 'react-redux'
import { LinkButton } from '@components/uielements/Button/Button';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getActorInfo } from '@actions/actorActions'

function ShowReal(props) {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        setVideos(props.actor.profile.videos)
    }, [props.actor])
    const uploadVideo = e => {
        e.preventDefault()
        console.log("upload video")
    }
    return (
        <StyledPracticeStep>
            <Grid container spacing={5} className="align">
                <Grid item xs={12}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Box mb={6}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center">
                                <div className="heading4">SHOW REAL</div>
                            </Box>
                            <LinkButton onClick={uploadVideo} className="accent round bt-sm outline">Upload Video</LinkButton>
                        </Box>
                        <div className="grid-container">
                            <div className="wrapper">
                                <Grid container spacing={4}>
                                    {videos && videos.map((video, index) => (
                                        <Grid item key={index} xs={3}>
                                            <UploadedVideo video={video} />
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
    getActorInfo: PropTypes.func.isRequired,
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
    { getActorInfo }
)(withRouter(ShowReal))
{/* <Grid container spacing={3} className="align">
<Grid item xs={3}>
</Grid>
<Grid item xs={6}>
    <div className="heading4">SHOW REAL</div>
    <Grid item >
        <Box mb={6}>
            <ShowReal showReal={props.actor.profile.videos} />
        </Box>
    </Grid>
</Grid>
</Grid> */}