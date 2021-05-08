import styled from "styled-components";

const StyledHeader = styled.header`
	background: #F8F9FD;

	.header-wrapper {
		display: flex;
		justify-content: space-between;

		.logo {
			margin: 10px 0;
			
			img {
				height: 40px;
			}
		}
		
		.navbar {
			display: flex;
			align-items: center;

			.menu {
				list-style: none;
				padding: 0;
				margin: 0;
				display: flex;

				li {
					a {
						color: #363848;
						text-decoration: none;
						
						&.active {
							font-weight: 500;
						}
					}
				}

				li + li {
					margin-left: 30px;
				}
			}

			.search-box {
				margin: 0 20px;

				.search {
					position: relative;

					input.search-field {
						background-color: #FFF;
						border: none;
						font-family: 'Open Sans';
						font-weight: 400;
						border-radius: 21px;
						padding: 0 20px;
						height: 42px;
						width: 260px;
						box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 30%);
					}

					button.icon-btn {
						position: absolute;
						right: 0;
						top: 0;
						width: 42px;
						height: 42px;
						background-color: transparent;
						border: none;

						&:after {
							content: '';
							background-image: url('/images/icons/search.svg');
							background-repeat: no-repeat;
							background-position: center;
							background-size: contain;
							width: 20px;
							height: 20px;
							display: inline-block;
							vertical-align: bottom;
							margin-right: 10px;
						}
					}
				}
			}

			.nav-btns {
				display: flex;
			}
		}
	}
`;

export default StyledHeader;