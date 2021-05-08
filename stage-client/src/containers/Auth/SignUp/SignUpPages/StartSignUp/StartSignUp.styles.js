import styled from 'styled-components';

const StyledStartSignUp = styled.section`
	.heading {
		font-size: 18px;
		font-weight: 500;
	}

	.user-roles {
		.role-type {
			text-align: center;
			box-shadow: 0px 4px 3px 1px rgb(0 0 0 / 20%);
			border-radius: 24px;
			/* background-color: rgba(0,0,0,0.01); */
			cursor: pointer;

			&:hover {
				background-color: rgba(0,0,0,0.03);
			}

			img {
				margin-bottom: 6px;
			}

			.title {
				font-size: 16px;
				font-weight: 500;
			}
		}
	}
`;

export default StyledStartSignUp;