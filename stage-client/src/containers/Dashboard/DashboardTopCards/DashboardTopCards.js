import React from 'react';
import StyledDashboardTopCards from './DashboardTopCards.styles';
import { Grid, Box } from '@material-ui/core';
import { IconButton } from '@components/uielements/Button/Button';

export default function DashboardTopCards() {
	return (
		<Box mb={6}>
			<StyledDashboardTopCards>
				<Grid container spacing={5}>
					<Grid item xs={5}>
						<div className="card-box">
							<Box className="heading4" mb={2}>Auditions</Box>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="danger heart static">
												<i className="material-icons">favorite</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">55</div>
											<div className="desc">Liked auditions</div>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="accent static">
												<i className="material-icons">library_books</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">4</div>
											<div className="desc">Invited auditions</div>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Grid>

					<Grid item xs={7}>
						<div className="card-box">
							<Grid container spacing={3}>
								<Grid item xs={5}>
									<Box className="heading4" mb={2}>Trainer</Box>
									<Grid container spacing={1} alignItems="center" className="audition-in-progress">
										<Grid item>
											<IconButton className="success static">
												<i className="material-icons">event</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">3</div>
											<div className="desc">Auditions in progress</div>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className="recent-audition" xs={7}>
									<Box className="heading6" mb={2}>Recent audition practice</Box>
									<Grid container spacing={1}>
										<Grid item className="audition-info" xs={6}>
											<div className="heading2">Cinderalla</div>
											<div className="desc">Avi Nesher, 14/2/2021</div>
										</Grid>
										<Grid item className="audition-rating" xs={6}>
											<Box className="heading2" display="inline-flex" alignItems="center"><i className="material-icons">star</i><span>96</span></Box>
											<div className="desc">Highest score</div>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Grid>
				</Grid>
			</StyledDashboardTopCards>
		</Box>
	)
}
