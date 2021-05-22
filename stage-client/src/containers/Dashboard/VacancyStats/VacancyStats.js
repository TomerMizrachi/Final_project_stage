import React from 'react';
import StyledVacancyStatsGraph from './VacancyStats.styles';
import { Box, Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { FormControlLabel, Switch, Select, MenuItem, FormControl } from '@material-ui/core';

export default function VacancyStats() {

	const [graphCheckboxState, setGraphCheckboxState] = React.useState({
		available_auditions: true,
		auditions_sent: true,
		rejected: false
	});

	const checkboxHandleChange = (event) => {
		setGraphCheckboxState({
			...graphCheckboxState,
			[event.target.name]: event.target.checked
		});
	}

	const chartLegendLabels = [
		{
			name: 'Audition Sent',
			color: '#2BC155'
		},
		{
			name: 'Audition accetped',
			color: '#3F9AE0'
		},
		{
			name: 'Rejected',
			color: '#FF424D'
		},
	];

	return (
		<Box mb={8}>
			<StyledVacancyStatsGraph>
				<Grid container spacing={4} direction="column">
					<Grid item>
						<Grid container className="header" alignItems="center" justify="space-between">
							<Grid item>
								<div className="heading4">Auditions Stats</div>
							</Grid>
							<Grid item>
								<Grid container alignItems="center" justify="center" spacing={2}>
									<Grid item>
										<FormControlLabel
											control={<Switch color="primary"
												checked={graphCheckboxState.available_auditions}
												onChange={checkboxHandleChange}
												name="available_auditions" />}
											label="Availible auditions"
											labelPlacement="start"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={<Switch color="primary"
												checked={graphCheckboxState.auditions_sent}
												onChange={checkboxHandleChange}
												name="auditions_sent" />}
											label="Auditions sent"
											labelPlacement="start"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={<Switch color="primary"
												checked={graphCheckboxState.rejected}
												onChange={checkboxHandleChange}
												name="rejected" />}
											label="Rejected"
											labelPlacement="start"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<FormControl variant="outlined" size="small">
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										value="this-month"
									>
										<MenuItem value="this-month">This Month</MenuItem>
										<MenuItem value="last-month">Last Month</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
						<Line
							className="stats-graph"
							data={{
								labels: [18, 2, 20, 36, 24, 18, 30, 46, 60, 50, 38, 20, 12, 12, 28, 60, 76, 60],
								datasets: [
									{
										label: '# of Votes',
										data: [18, 2, 20, 36, 24, 18, 30, 46, 60, 50, 38, 20, 12, 12, 28, 60, 76, 60],
										borderColor: '#3F9AE0',
										backgroundColor: 'rgba(63, 154, 224, 0.1)',
										fill: 'origin',
									},
									{
										label: 'Votes',
										data: [4, 4, 16, 22, 36, 26, 16, 10, 38, 30, 38, 44, 40, 30, 46, 52, 44, 30],
										borderColor: '#2BC155',
										backgroundColor: 'rgba(43, 193, 85, 0.1)',
										fill: 'origin',
									},
								]
							}}
							width={100}
							height={26}
							options={{
								responsive: true,
								onResize: () => { },
								maintainAspectRatio: true,
								interaction: {
									intersect: false,
									mode: 'nearest',
								},
								plugins: {
									legend: {
										display: false,
									},
									tooltip: {
										enabled: true,
										position: 'nearest',
										backgroundColor: 'rgba(255, 255, 255, 0.7)',
										titleColor: '#666',
										titleFont: {
											size: 14,
										},
										titleMarginBottom: 5,
										bodyColor: '#666',
										bodyFont: {},
										bodySpacing: 2,
										footerColor: '#666',
										footerMarginTop: 6,
										padding: 15,
										cornerRadius: 10,
										boxWidth: 0,
										xAlign: 'center',
										yAlign: 'bottom',
									},
									filler: {
										propagate: true
									},
								},
								elements: {
									point: {
										pointStyle: 'circle',
										radius: 3,
										borderWidth: 0,
										hoverRadius: 3,
										hoverBorderWidth: 3,
									},
									line: {
										tension: 0.3,
										borderWidth: 3,
										borderCapStyle: 'round', // butt, round, square
									},
								},
								scales: {
									x: {
										display: false,
									},
									y: {
										min: 0,
										max: 100,
										ticks: {
											stepSize: 20,
										},
									}
								}
							}}
						/>
					</Grid>

					<Grid item>
						<Grid container className="legendLabels" alignItems="center" justify="center" spacing={6}>
							{chartLegendLabels.map((label, index) => (
								<Grid item key={index} className="legendLabel">
									<div className="point" style={{
										backgroundColor: `${label.color}`
									}}></div>
									<div className="name">{label.name}</div>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>

			</StyledVacancyStatsGraph>
		</Box >
	)
}
