import styled from 'styled-components'

const StyledFeaturedActorItem = styled.div`
	box-shadow: 0px 2px 15px rgba(62, 53, 120, 0.2);
	background-color: rgba(62, 53, 120, 0.04);
	border-radius: 10px;
	padding: 24px;

	.audition-image {
		/* margin-bottom: 10px; */

		img {
			border-radius: 50%;
			object-fit: contain;
			width: 64px;
			height: 64px;
			background-color: #c4c4c4;
		}
	}

	.audition-title {
		font-weight: 600;
		/* margin-bottom: 4px; */
	}

	.actor-name {
		font-family: 'Open Sans';
		font-weight: 600;
	}

	.audition-details {
		font-size: 12px;
		font-weight: 500;

		.material-icons {
			color: #A9A9A9;
			font-size: 18px;
			width: 20px;
			text-align: center;
			margin-right: 10px;
		}
	}
`

export default StyledFeaturedActorItem