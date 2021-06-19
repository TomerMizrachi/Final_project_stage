import React, { useState } from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeSteps/Audition.styles'
import { Grid, Box } from '@material-ui/core'
import { Button, LinkButton } from '@components/uielements/Button/Button'
import VideoPlayer from "react-happy-video"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function SubmittedBox(props) {
    const [reqruite, setReqruite] = useState(false)
    const audition = props.audition
    const actor_audition = props.actor_audition

    const clicked = e => {
        e.preventDefault()
        props.history.push({
            pathname: '/present',
            state: {
                actor: actor_audition.actorInfo[0],
                invite: true
            }
        })
    }

    return (audition && actor_audition ?
        (<StyledPracticeStep>
            <div className="header">
                <Grid container direction="column">
                    <Grid container className="audition-details" alignItems="center">
                        <Grid item className="audition-content" md>
                            <div className="audition-name heading4">Audition: {audition.name}</div>
                            <div className="audition-name text-accent">Roll: {audition.role}</div>
                        </Grid>
                        <Grid item className="audition-content" md></Grid>
                        <Grid item className="audition-content" md>
                            <Grid item className="audition-name heading4" md>{audition.due_date}</Grid>
                            <Grid item className="recruitment-details subtitle">End of recruitment</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="header">
                <Grid container direction="column">
                    <Grid container className="audition-details" alignItems="center">
                        <Grid item className="audition-content" md>
                            <div className="audition-name heading4">Actor: {actor_audition.actorInfo[0].user_info[0].full_name}</div>
                            {/* <div className="audition-name heading4">Score: {actor_audition.score}</div> */}
                        </Grid>
                        <Grid item className="audition-content" md>
                        </Grid>
                        <Grid item className="audition-content" md>
                            <Button className="default round active text-accent " onClick={clicked}>Actoer profile</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <Grid item >
                    <VideoPlayer width="100%" color="#3b3346" source={actor_audition.submittedVideo} />
                </Grid>
            </Box>
            {reqruite &&
                <div className="header" />
            }
            { reqruite &&
                <div>
                    <Grid container direction="column">
                        <Grid container className="audition-details" alignItems="center">
                            <Grid item className="audition-content" md>
                                <div className="audition-name heading4"><b>Great!</b> we are happy you liked {actor_audition.actorInfo[0].user_info[0].full_name} preformance.</div>
                                <div className="audition-name heading4">Please contact via Email: {actor_audition.actorInfo[0].user_info[0].Email}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            }
            <div className="header" />
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <Grid item >
                    <LinkButton onClick={() => setReqruite(!reqruite)} className="sc-eCImvq eNJiRc orange bt-sm round">Reqruite {actor_audition.actorInfo[0].user_info[0].full_name}</LinkButton>
                </Grid>
            </Box>

        </StyledPracticeStep>) : null
    )
}

SubmittedBox.propTypes = {
    auth: PropTypes.object.isRequired,
    recruiter: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    recruiter: state.recruiter,
    errors: state.errors
})

export default connect(
    mapStateToProps,
)(withRouter(SubmittedBox))