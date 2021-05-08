import styled from 'styled-components';
import themeConfig from '@config/theme.config';

const StyledCountersBlock = styled.div`
	.wrapper {
		background-color: ${themeConfig.accentColor} !important;
		border-radius: 10px;
		background-image: url('/images/pages/home/counters-bg.png');
		background-size: cover;
    background-repeat: no-repeat;

		>.counter-items {
			.counter-item {
				color: #FFF;
				text-align: center;

				.counter {
					font-size: 36px;
					font-weight: 600;
					line-height: 40px;
					margin-bottom: 15px;
				}

				.title {
					font-family: 'Open Sans';
				}
			}
		}
	}
`;

export default StyledCountersBlock;