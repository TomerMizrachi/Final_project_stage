import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
	display: flex;
	height: 100%;
	overflow: hidden;

	#dashboard-sidebar {
		flex: 0 0 260px;
		box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
		padding: 30px;
	}
	
	#dashboard-content {
		flex: 1;
		padding: 30px;

		>.wrapper {
			max-width: 1270px;
			margin: 0 auto;
		}
	}
`;

export default StyledDashboardLayout;