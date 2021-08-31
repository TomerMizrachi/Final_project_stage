import styled from 'styled-components'
import themeConfig from '@config/theme.config'

const StyledSignUpSteps = styled.div`
	.steps {
		.step {
			background-color: ${themeConfig.accentColorLight};
			font-size: 0px;
			text-indent: -999px;
			overflow: hidden;
			height: 10px;
			width: 25px;
			display: inline-block;
			margin-right: 8px;
			border-radius: 5px;

			&.large {
				width: 50px;
			}

			&.active {
				background-color: ${themeConfig.accentColor};
			}
		}
	}
`

export default StyledSignUpSteps