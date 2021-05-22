import styled from 'styled-components';

const StyledDashboardTopCards = styled.div`
	.card-box {
		padding: 20px;
		padding-bottom: 30px;
		border-radius: 10px;
		box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15);
		background: #8743DF;
		color: #FFFFFF
	}

	.desc {
		// color: #8A8A8A;
		font-size: 11px;
	}
	.donut{
		position:relative;
	}
	.audition-in-progress {
		border-right: 1px solid #FFFFFF;;
	}
	.align{
		flex-wrap: wrap;
		flex-wrap: nowrap;
		margin-top: 10px;
		align-items: center;
		// margin-left: 29px;
	}
	.heading3{
		font-size: 20px;
	}
	.MuiBox-root-104 {
		margin-bottom: 0px;
	}
	.heading2 {
		font-size: 30px;
		margin-right: 39px;
	}
	.recent-audition {
		.audition-rating {
			text-align: center;
			.heading2 {
				i {
					margin-right: 24px;
				}
			}
		},
		.audition-info{
			flex-grow: 0;
			// max-width: 41.666667%;
			flex-basis: 24.666667%;
		}
	}
`;

export default StyledDashboardTopCards;