import React from 'react'
import StyledFeaturedActorItem from './FeaturedActorItem.styles'
import Rating from '@material-ui/lab/Rating'
import { LinkButton } from '@components/uielements/Button/Button'
import { Grid, Box } from '@material-ui/core'

export default function FeaturedActorItem(props) {
	const { actor } = props

	return (
		<StyledFeaturedActorItem className={`featured-actor-item ${props.className}`}>
			<Grid container direction="column">
				<Grid container className="actor-details" alignItems="center">
					<Grid item className="actor-image">
						<img src={actor.image} alt={actor.name} />
					</Grid>

					<Grid item className="actor-content" xs={12} sm>
						<div className="actor-name">{actor.name}</div>
						<div className="actor-desc">{actor.desc}</div>
					</Grid>
				</Grid>

				<Box pt={2} />

				<Grid container className="rating-block" justify="space-between" alignItems="center">
					<Grid item>
						<Box display="flex" alignItems="center">
							<Rating value={actor.rating} precision={0.1} size="small" readOnly />
							<span className="actor-rating">{actor.rating}</span>
						</Box>
					</Grid>
					<Grid item>
						<LinkButton href={actor.link} className="orange bt-sm round">View</LinkButton>
					</Grid>
				</Grid>
			</Grid>
		</StyledFeaturedActorItem>
	)
}
