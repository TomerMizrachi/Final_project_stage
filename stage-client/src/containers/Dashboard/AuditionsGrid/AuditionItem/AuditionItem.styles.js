import styled from 'styled-components'

const StyledAuditionItem = styled.div`
	box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15);
	padding: 20px;
	border-radius: 10px;

	>.header {
		border-bottom: 1px solid #EBEBEB;
		padding-bottom: 20px;
		margin-bottom: 20px;

		img {
			width: 56px;
			height: 56px;
			object-fit: contain;
			background-color: #D3D3D3;
			border-radius: 6px;
		}

		.title-section {
			padding-left: 15px;

			.heading4 {
				margin-bottom: 6px;
			}

			.name {
				font-size: 12px;
				color: #797979;
				font-weight: 500;
			}

			.follow-link {
				font-size: 13px;
				font-weight: 600;
			}
		}
	}

	>.content {
		font-weight: 500;
		font-size: 13px;

		i.material-icons {
			color: #A9A9A9;
			width: 24px;
			text-align: center;
			margin-right: 15px;
			font-size: 24px;
		}

		.cost {
			.monthly {
				color: #C2C2C2;
				font-weight: 400;
			}
		}

		.location {
			.map_link {
				color: #A9A9A9;
				text-decoration: underline;
				font-weight: 400;
			}
		}
	}
`;

export default StyledAuditionItem