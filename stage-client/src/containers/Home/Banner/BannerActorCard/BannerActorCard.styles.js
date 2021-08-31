import styled from 'styled-components'

const StyledBannerActorCard = styled.div`
	background: rgba(255, 255, 255, 0.6);
	box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.07);
	backdrop-filter: blur(4px);
	padding: 15px;
	border-radius: 10px;
	display: flex;
	max-width: 260px;

	.actor-image {		
		img {
			border-radius: 10px;
			object-fit: contain;
			width: 66px;
			background-color: #c4c4c4;
		}
	}

	.actor-content {
		flex: 1;
		padding-left: 10px;

		.actor-name {
			font-size: 16px;
			font-weight: 600;
			line-height: 18px;
			margin-bottom: 2px;
		}
		
		.actor-title {
			font-family: 'Open Sans';
			font-size: 13px;
			margin-bottom: 4px;
		}
	}

	.actor-actions {
		margin-top: 8px;
	}
`

export default StyledBannerActorCard