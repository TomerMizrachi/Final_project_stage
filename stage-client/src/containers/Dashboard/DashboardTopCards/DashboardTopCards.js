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
											<IconButton className="orange static">
												<i className="material-icons">library_books</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">55</div>
											<div className="desc">Availible Auditions</div>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="success">
												<i className="material-icons">mail</i>
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
					<Grid item xs={5}>
						<div className="card-box">
							<Box className="heading4" mb={2}>Trainer</Box>

							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="orange static">
												<i className="material-icons">library_books</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">55</div>
											<div className="desc">Audition in practice</div>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<IconButton className="success">
												<i className="material-icons">mail</i>
											</IconButton>
										</Grid>
										<Grid item>
											<div className="heading2">4</div>
											<div className="desc">Audition Submitted</div>
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
