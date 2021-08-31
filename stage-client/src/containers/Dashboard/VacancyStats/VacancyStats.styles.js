import styled from 'styled-components'

const StyledVacancyStatsGraph = styled.div`
	.stats-graph {}
	.legendLabels {
		>.legendLabel {
			display: flex;
			align-items: center;
			>.point {
				width: 20px;
				height: 20px;
				border-radius: 8px;
			}
			>.name {
				padding-left: 10px;
			}
		}
	}
`

export default StyledVacancyStatsGraph