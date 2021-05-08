import styled from "styled-components";

const BigSearchBar = styled.body`
.search-box {
	margin: 0 20px;


				.search {
					position: relative;
					bottom: 180px;
					align-items: center;

					input.search-field {
						background-color: #FFF;
						border: none;
						font-family: 'Open Sans';
						font-weight: 400;
						border-radius: 21px;
						padding: 0 20px;
						height: 42px;
						width: 450px;
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

		}
	}
`;

export default BigSearchBar;