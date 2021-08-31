import React from 'react'
import StyledCountersBlock from './CountersBlock.styles'
import { Grid, Box } from '@material-ui/core'

export default function CountersBlock() {
	const counters = [
		{
			'title': 'Recuiters',
			'count': '36,789',
		},
		{
			'title': 'Actors',
			'count': '458,973',
		},
		{
			'title': 'Successful rectuiring',
			'count': '56,461',
		},
		{
			'title': 'Active auditions',
			'count': '2,000',
		},
	]

	return (
		<StyledCountersBlock>
			<div className="container">
				<Box className="wrapper" px={4} py={10} mb={8}>
					<Grid container className="counter-items" spacing={3}>
						{counters.map((counter, index) => (
							<Grid item key={index} className="counter-item" sm={3}>
								<div className="counter">{counter.count}</div>
								<div className="title">{counter.title}</div>
							</Grid>
						))}
					</Grid>
				</Box>
			</div>
		</StyledCountersBlock>
	)
}
