import React, { Component } from 'react';
import StyledDashboardTopCards from './TrainerTopCards.styles';
import { Grid, Box } from '@material-ui/core';
import { IconButton } from '@components/uielements/Button/Button';
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class TrainerTopCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// audition: props.actor.trainerAudition,
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
			// 	series: [props.actor.trainerAudition.videos[0] ? props.actor.trainerAudition.videos[0].similarity : 0,
			// 	props.actor.trainerAudition.videos[0] ? props.actor.trainerAudition.videos[0].exact : 0]
		}
	}
	componentWillReciveProps(nextProp) {
		if (nextProp.actor.trainerAudition !== this.props.actor.trainerAudition) {
			this.state.audition = this.props.actor.trainerAudition
			this.state.series = [this.props.actor.trainerAudition.videos[0] ? this.props.actor.trainerAudition.videos[0].similarity : 0,
			this.props.actor.trainerAudition.videos[0] ? this.props.actor.trainerAudition.videos[0].exact : 0]
		}
	}
	render() {
		return (
			<Box mb={6}>
				{this.state.audition &&
					<StyledDashboardTopCards>
						<Box display="flex" justifyContent="normal" alignItems="center" mb={4}>
							<Link to="/Dashboard/trainer">Trainer {'> '}</Link>
							<span >{this.state.audition.auditionInfo[0].name}</span>
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
													<div className="heading2">{this.state.audition.auditionInfo[0].name}</div>
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
													<div className="heading3">{this.state.audition.auditionInfo[0].due_date}</div>
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
													<div className="heading3">{this.state.audition.auditionInfo[0].type}</div>
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
				}
			</Box>
		)
	}
}
TrainerTopCards.propTypes = {
	auth: PropTypes.object.isRequired,
	actor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	// SubmitVideo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	actor: state.actor,
	errors: state.errors
})
export default connect(
	mapStateToProps,
	// { SubmitVideo }
)(withRouter(TrainerTopCards))
