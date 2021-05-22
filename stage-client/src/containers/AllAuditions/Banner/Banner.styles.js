import styled from 'styled-components';

const Test = styled.section`
	background-color: #F8F9FD;

	.banner-wrapper {
		display: flex;
		align-items: center;
		padding-bottom: 10px;

		.content {
			flex: 0 0 50%;

			.title {
				margin: 0 0 24px;
				font-size: 44px;
				line-height: 52px;
				font-weight: 600;

				span {
					display: block;
					color: #363848;
				}
			}

			.desc {
				font-family: 'Open Sans';
				font-weight: 400;
				margin-bottom: 30px;
			}
		}

		.image-block {
			flex: 0 0 50%;
			padding-left: 60px;
			position: relative;

			img.banner-img {
				pointer-events: none;
			}

		}
	}
`;

export default Test;