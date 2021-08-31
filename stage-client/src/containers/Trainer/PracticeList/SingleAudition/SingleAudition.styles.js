import styled from 'styled-components'

const StyledFeaturedActorAudition = styled.div`
	box-shadow: 0px 2px 15px rgba(62, 53, 120, 0.2);
	background-color: rgba(62, 53, 120, 0.04);
	border-radius: 10px;
	padding: 35px;

	.subtitle{
		color: #8A8A8A;
	}
	.actor-details {
		.actor-image {
			img {
				border-radius: 50%;
				object-fit: contain;
				width: 56px;
				background-color: #c4c4c4;
			}
		}
		
		.audition-name{
			font-size: bold;
		}
		.actor-content {
			padding-left: 12px;

			.actor-name {
				font-weight: 600;
			}

			.actor-desc {
				font-family: 'Open Sans';
				font-size: 12px;
			}
		}
	}

	.rating-block {
		.actor-rating {
			font-family: 'Open Sans';
			font-weight: 700;
			font-size: 12px;
			padding-left: 6px;
		}
	}
`

export default StyledFeaturedActorAudition