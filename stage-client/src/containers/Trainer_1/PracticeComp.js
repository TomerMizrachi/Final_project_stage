import React from 'react';
import SiteConfig from '@config/site.config';
import { Grid, Box } from '@material-ui/core';
import StyledAuditionStep from './PracticeComp.styles';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';
import Popup from 'reactjs-popup';
import Filming from '../Filming'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Audio from '../Audio'

export default function PracticeComp() {
	const [openAudio, setAudioOpen] = React.useState(false);
	const [openVideo, setVidioOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const handleAudioClickOpen = () => {
		setAudioOpen(true);
	};
	const handleVideoClickOpen = () => {
		setVidioOpen(true);
	};
	const handleClose = () => {
		setAudioOpen(false);
	};
	const handleVideoClose = () => {
		setVidioOpen(false);
	};

	return (
		<Box mb={6}  >
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
									<Popup trigger={<LinkButton className="heading4 orange bt-sm round" position="center" modal>View Text</LinkButton>}>
									</Popup>
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
													<Audio></Audio>
												</div>
											</DialogContentText>
										</DialogContent>
										{/* <DialogActions>
											<Button autoFocus onClick={handleClose} color="primary">Disagree</Button>
											<Button onClick={handleClose} color="primary" autoFocus>Agree</Button>
										</DialogActions> */}
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
													<Filming></Filming>
												</div>
											</DialogContentText>
										</DialogContent>
										{/* <DialogActions>
											<Button autoFocus onClick={handleClose} color="primary">Disagree</Button>
											<Button onClick={handleClose} color="primary" autoFocus>Agree</Button>
										</DialogActions> */}
									</Dialog>
								</Box>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</StyledAuditionStep>
		</Box>
	)
}
