import React from 'react'
import StyledAuditionItem from './AuditionItem.styles'
import { Grid, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function AuditionItem({ audition }) {
	return (
		<StyledAuditionItem>
			<div className="header">
				<Box display="flex" alignItems="center">
					<img src={audition.image} alt={audition.title} />
					<Box className="title-section" flex={1}>
						<div className="heading4">{audition.title}</div>
						<Box display="flex" justifyContent="space-between">
							<div className="name">{audition.name}</div>
							<Link to="#" className="follow-link text-accent">+Follow</Link>
						</Box>
					</Box>
				</Box>
			</div>

			<Grid container className="content" direction="column" spacing={1}>
				<Grid item className="cost">
					<Box display="flex" alignItems="center">
						<i className="material-icons">monetization_on</i>
						<Box display="flex" justifyContent="space-between" flex={1}>
							<div className="value">${audition.cost_from} - ${audition.cost_to}</div>
							<span className="monthly">/monthly</span>
						</Box>
					</Box>
				</Grid>

				<Grid item className="location">
					<Box display="flex" alignItems="center">
						<i className="material-icons">room</i>
						<Box display="flex" justifyContent="space-between" flex={1}>
							<div className="value">{audition.location}</div>
							<Link to={audition.map_link} className="map_link">View Map</Link>
						</Box>
					</Box>
				</Grid>

				<Grid item className="audition-type">
					<Box display="flex" alignItems="center">
						<i className="material-icons">business_center</i>
						<div className="value">{audition.type.join(', ')}</div>
					</Box>
				</Grid>
			</Grid>
		</StyledAuditionItem>
	)
}
