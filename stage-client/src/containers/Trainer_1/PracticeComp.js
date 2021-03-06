import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import StyledAuditionStep from './PracticeComp.styles'
import { IconButton, LinkButton } from '@components/uielements/Button/Button'
import Filming from '../Filming'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Audio from '../Audio'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function PracticeComp(props) {
	const [audition, setAudition] = useState()
	console.log("ron audition", audition)
	useEffect(() => {
		setAudition(JSON.parse(localStorage.getItem('trainerAudition')))
	}, [props.actor.trainerAudition])

	const [openAudio, setAudioOpen] = useState(false)
	const [openVideo, setVidioOpen] = useState(false)
	const [openText, setTextOpen] = useState(false)
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const handleAudioClickOpen = () => {
		setAudioOpen(true)
	}
	const handleVideoClickOpen = () => {
		setVidioOpen(true)
	}
	const handleTextClickOpen = () => {
		setTextOpen(true)
	}
	const handleClose = () => {
		setAudioOpen(false)
	}
	const handleVideoClose = () => {
		setVidioOpen(false)
	}
	const handleTextClose = () => {
		setTextOpen(false)
	}

	return (
		<Box mb={6} >
			{ audition &&
				<StyledAuditionStep>
					<Grid container justify="space-between" alignItems="flex-end" spacing={4}>
						<Grid item xs={4}>
							<div className="card-box">
								<div className="header">
									<Box display="flex" alignItems="center" justifyContent="space-evenly">
										<IconButton className="orange bt-xxl static">
											<i className="material-icons">assignment</i>
										</IconButton>
									</Box>
								</div>
								<Grid item >
									<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
										<LinkButton className="heading4 orange bt-sm round" position="center" onClick={handleTextClickOpen}>View Text</LinkButton>
										<Dialog fullScreen={fullScreen}
											open={openText}
											onClose={handleTextClose}
											aria-labelledby="responsive-dialog-title">
											<DialogTitle id="responsive-dialog-title">{"View Text"}</DialogTitle>
											<DialogContent>
												<DialogContentText>
													<div className="container">
														<div className="header">
															<IconButton className="accent static">
																<i className="material-icons">assignment</i>
															</IconButton>
															<span className="title text-accent">Hi, welcome to your audio trainer! Now you can practice the audition text.</span>
														</div>
													</div>
													<DialogContentText>
														{audition && audition.auditionInfo[0].text_file}
													</DialogContentText>
												</DialogContentText>
											</DialogContent>
										</Dialog>
									</Box>
								</Grid>

							</div>
						</Grid>
						<Grid item xs={4}>
							<div className="card-box">
								<div className="header">
									<Box display="flex" alignItems="center" justifyContent="space-evenly">
										<IconButton className="orange bt-xxl static">
											<i className="material-icons">mic</i>
										</IconButton>
									</Box>
								</div>
								<Grid item>
									<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
										<LinkButton className="heading4 orange bt-sm round" position="center" onClick={handleAudioClickOpen} >Start Audio Practice</LinkButton>
										<Dialog fullScreen={fullScreen}
											open={openAudio}
											onClose={handleClose}
											aria-labelledby="responsive-dialog-title">
											<DialogTitle id="responsive-dialog-title">{"Audio Practice"}</DialogTitle>
											<DialogContent>
												<DialogContentText>
													<div className="container">
														<div className="header">
															<IconButton className="accent static">
																<i className="material-icons">mic</i>
															</IconButton>
															<span className="title text-accent">Hi, welcome to your audio trainer!</span>
														</div>
														<div className="paragraph"> This is the place where we will practice the text itself prior to filming it. We will display the score here in the end of each practice.</div>
													</div>
													<div className="audioWrapper">
														<Audio audition={audition}></Audio>
													</div>
												</DialogContentText>
											</DialogContent>
										</Dialog>
									</Box>
								</Grid>
							</div>
						</Grid>
						<Grid item xs={4}>
							<div className="card-box">

								<div className="header">
									<Box display="flex" alignItems="center" justifyContent="space-evenly">
										<IconButton className="orange bt-xxl static">
											<i className="material-icons">videocam</i>
										</IconButton>
									</Box>
								</div>
								<Grid item>
									<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
										<LinkButton className="heading4 orange bt-sm round" position="center" onClick={handleVideoClickOpen} >Film Audition</LinkButton>
										<Dialog fullScreen={fullScreen}
											open={openVideo}
											onClose={handleVideoClose}
											aria-labelledby="responsive-dialog-title">
											<DialogTitle id="responsive-dialog-title">{"Film Your Audition"}</DialogTitle>
											<DialogContent>
												<DialogContentText>
													<div className="container">
														<div className="header">
															<IconButton className="accent static">
																<i className="material-icons">videocam</i>
															</IconButton>
														</div>
													</div>
													<div className="audioWrapper">
														<Filming audition={audition}></Filming>
													</div>
												</DialogContentText>
											</DialogContent>
										</Dialog>
									</Box>
								</Grid>
							</div>
						</Grid>
					</Grid>
				</StyledAuditionStep>
			}
		</Box>
	)
}
PracticeComp.propTypes = {
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor
})

export default connect(
	mapStateToProps,
)(withRouter(PracticeComp))
