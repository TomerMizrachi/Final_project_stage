import React, { Component } from 'react';
import StyledDashboardTopCards from './TrainerTopCards.styles';
import { Grid, Box, colors } from '@material-ui/core';
import { IconButton } from '@components/uielements/Button/Button';
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TrainerTopCards extends Component {
	constructor(props) {
		super(props);
		//console.log("aa",audition)
		this.state = {
			audition:props.data.location.state.audition,
			// audition: this.props.location.state.audition,
			options: {
				colors: ['#FBA556', '#2BC155'],
				labels: ['Similarity Score', 'Exact Score'],
				// legend: "#FFFFFF",
				// alignItems:{
				// 	position:'left'
				// },
				chart: {
					type: 'donut',
				},
				plotOptions: {
					pie: {
						startAngle: -90,
						endAngle: 90,
						offsetY: 10
					}
				},
				grid: {
					padding: {
						bottom: -20
					}
				},
				responsive: [{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
							// height:200
						},
						legend: {
							position: 'bottom'
						}
					}
				}],
			},
			labels: ['Similarity Score', 'Exact Score'],
			series: [44, 55]
		}
		console.log("STATE",this.state)
	}
	render() {
		return (
			<Box mb={6}>
				<StyledDashboardTopCards>
					<Box display="flex" justifyContent="normal" alignItems="center" mb={4}>
						<Link to="/Dashboard/trainer">Trainer {'> '}</Link>
						<Link to="/Trainer">{this.state.audition.auditionInfo.name}</Link>
						{/* <div target="_blank" onClick={this.trainerPage} >Trainer {'> '} </div>
						<div onClick={this.currPage}>Cinderalla</div> */}

					</Box>
					<Grid container spacing={5}>

						<Grid item xs={12}>
							<div className="card-box">
								<Grid container spacing={3} className="align">
									<Grid item className="recent-audition" xs={5}>
										<Grid container spacing={1} >
											<Grid item className="audition-info">
												<div className="heading2">{this.state.audition.auditionInfo.name}</div>
												<div className="desc">{this.state.audition.auditionInfo.name}, 14/2/2021</div>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={5}>
										<Grid container spacing={1} alignItems="center">
											<Grid item>
												<IconButton className="orange static">
													<i className="material-icons">event</i>
												</IconButton>
											</Grid>
											<Grid item >
												<div className="heading3">14/2/2020</div>
												<div className="desc">End Of Recruitment</div>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={5}>
										<Grid container spacing={1} alignItems="center" className="audition-in-progress">
											<Grid item>
												<IconButton className="orange static">
													<i className="material-icons">library_books</i>
												</IconButton>
											</Grid>
											<Grid item>
												<div className="heading3">Comedy, Movie</div>
												<div className="desc">Genere</div>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={5}>
										<Box className="heading3" mb={0}>Highest Audition Metrics</Box>
										<Grid item>
											<div className="chart">
												<Chart options={this.state.options} series={this.state.series} type="donut" />
											</div>
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
}

export default TrainerTopCards;
// TrainerTopCards.propTypes = {
//     auth: PropTypes.object.isRequired,
// 	// actor: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
// 	// actor: state.actor,
//     auth: state.auth,
//     errors: state.errors
// })
// export default connect(
//     mapStateToProps,
// )(TrainerTopCards)