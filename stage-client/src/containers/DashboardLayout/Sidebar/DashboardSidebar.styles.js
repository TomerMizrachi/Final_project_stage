import styled from 'styled-components';
import themeConfig from '@config/theme.config';

const StyledDashboardSidebar = styled.div`
	.header {
		.name {
			color: #363848;
		}

		.role {
			font-size: 85%;
			color: #8A8A8A;
		}
	}

	.navigation a {
		display: block;
		text-decoration: none;
		color: #BFBFBF;
		padding: 6px 0;
		margin-bottom: 20px;
		
		&:hover {
			color: #999;
		}
		
		&.active {
			color: ${themeConfig.accentColor};
			font-weight: 600;
		}

		>i {
			width: 24px;
			text-align: center;
		}
		>span {
			padding-left: 15px;
		}
	}
`;

export default StyledDashboardSidebar;