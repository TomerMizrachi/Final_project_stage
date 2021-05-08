import styled from 'styled-components';

const StyledAuthLayout = styled.div`
	height: 100%;

	>.container,
	.grid-container {
		height: 100%;
	}

	.left-banner-section {
		position: relative;

		img {
			max-width: 280px;
		}
		:after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: rgb(95 75 219 / 70%);
			z-index: 1;
		}
	}

	.authLayoutContent {
		max-width: 760px;
	}
`;

export default StyledAuthLayout;