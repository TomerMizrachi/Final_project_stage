import styled from 'styled-components'

const RecruiterCards = styled.div`
	.card-box {
		padding: 20px;
		padding-bottom: 30px;
		border-radius: 10px;
		box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15);
	}

	.desc {
		color: #8A8A8A;
		font-size: 11px;
	}

	.audition-in-progress {
		border-right: 1px solid rgba(138, 138, 138, 0.4);
	}

	.recent-audition {
		.audition-rating {
			text-align: center;
			.heading2 {
				i {
					color: #FBA556;
					margin-right: 4px;
				}
			}
		}
	}
`

export default RecruiterCards