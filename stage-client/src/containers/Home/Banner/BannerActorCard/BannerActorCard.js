import React from 'react'
import StyledBannerActorCard from './BannerActorCard.styles'
import { IconButton } from '@components/uielements/Button/Button'
import Rating from '@material-ui/lab/Rating'

export default function BannerActorCard(props) {
	const { actor } = props
	return (
		<StyledBannerActorCard className={`banner-actor-card ${props.className}`}>
			<div className="actor-image">
				<img src={actor.image} alt={actor.name} />
			</div>

			<div className="actor-content">
				<div className="actor-name">{actor.name}</div>
				<div className="actor-title">{actor.title}</div>
				<Rating value={actor.rating} precision={0.1} size="small" readOnly />
			</div>

			<div className="actor-actions">
				<IconButton className="success bt-xs outline">
					<i className="material-icons">check</i>
				</IconButton>
				<IconButton className="danger bt-xs outline offset-left-xs">
					<i className="material-icons">close</i>
				</IconButton>
			</div>
		</StyledBannerActorCard>
	)
}
