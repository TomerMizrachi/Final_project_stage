import React from 'react'
import StyledFeaturedAuditionItem from './FeaturedAuditionItem.styles'
import { LinkButton, IconButton } from '@components/uielements/Button/Button'
import { Grid, Box } from '@material-ui/core'

export default function FeaturedAuditionItem(props) {
	const { audition } = props

	return (
		<StyledFeaturedAuditionItem className={`featured-audition-item ${props.className}`}>
			<Grid container alignItems="center" direction="column" spacing={1}>
				<Grid item className="audition-image">
					<img src={audition.image} alt={audition.name} />
				</Grid>

				<Grid item>
					<div className="audition-name">{audition.title}</div>
				</Grid>

				<Grid item>
					<div className="actor-name text-accent">{audition.name}</div>
				</Grid>

				<Grid item>
					<Box className="audition-details" py={2}>
						<Box display="flex" mb={1}>
							<i className="material-icons">event</i>
							<div className="date">{audition.date}</div>
						</Box>

						<Box display="flex">
							<i className="material-icons">library_books</i>
							<div className="date">{audition.category}</div>
						</Box>
					</Box>
				</Grid>

				<Grid item>
					<Grid container justify="space-between">
						<Grid item>
							<IconButton className={audition.favorite ? 'danger' : 'disabled'}>
								<i className="material-icons">favorite</i>
							</IconButton>
						</Grid>
						<Grid item>
							<LinkButton href={audition.link} className="default round active text-accent offset-left-sm">Apply Now</LinkButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</StyledFeaturedAuditionItem>
	)
}
