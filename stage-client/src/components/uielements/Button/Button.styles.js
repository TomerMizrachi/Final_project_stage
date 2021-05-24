import styled from "styled-components";
import themeConfig from '@config/theme.config';

const buttonCss = `
	background-color: ${themeConfig.defaultColor};
	cursor: pointer;
	border: none;
	font-size: 13px;
	font-weight: 400;
	height: 42px;
	padding: 0 30px;
	margin: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	vertical-align: bottom;
	transition: all 200ms;
	color: #FFF;
	border-radius: 4px;
	
	&.bt-sm {
		height: 32px;
		padding: 0 20px;
		font-size: 12px;
		font-weight: 500;
	}

	&.filter-btn 
		margin-right: 5px;
}
	&.login-btn{
		padding: 0 10px;
	}
	
	&.bt-xl {
		height: 56px;
		padding: 0 50px;
		font-size: 16px;
    font-weight: 400;
	}

	&.outline {
		border: 1px solid ${themeConfig.disabledColor};
		background-color: transparent;
	}
	
	&.default {
		color: #363848;
	}
	&.default:hover,
	&.default.active {
		background-color: ${themeConfig.defaultColorActive};
	}
	
	&.accent:not(.outline) {
		background-color: ${themeConfig.accentColor};
	}
	&.accent:hover {
		background-color: ${themeConfig.accentColorActive};
	}
	&.accent.outline {
		color: ${themeConfig.accentColor};
		border-color: ${themeConfig.accentColor};
	}
	&.accent.outline:hover {
		background-color: ${themeConfig.accentColorLight};
	}

	&.white {
		background-color: #FFF;
	}

	&.orange {
		color: #FFF;
		background-color: ${themeConfig.orangeColor};
	}
	&.orange:hover {
		background-color: ${themeConfig.orangeColorActive};
	}

	&.success {
		background-color: ${themeConfig.successColor};
	}
	&.success:hover {
		background-color: ${themeConfig.successColorActive};
	}

	&.danger {
		background-color: #FBA556;
	}
	&.danger:hover {
		background-color: #FBA556;
	}

	&.disabled {
		background-color: ${themeConfig.disabledColor};
	}

	&.round {
		border-radius: 21px;
	}

	&.flat {
		border-radius: 0;
	}

	&.fullwidth {
		width: 100%;
	}
`;

const buttonOffsetCss = `
	&.offset-left-xs {
		margin-left: 6px;
	}
	&.offset-left-sm {
		margin-left: 12px;
	}
	&.offset-left-md {
		margin-left: 20px;
	}
	&.offset-left-lg {
		margin-left: 30px;
	}

	&.offset-right-xs {
		margin-right: 6px;
	}
	&.offset-right-sm {
		margin-right: 12px;
	}
	&.offset-right-md {
		margin-right: 20px;
	}
	&.offset-right-lg {
		margin-right: 30px;
	}
`;

const StyledButton = styled.button`
	${buttonCss}

	>.material-icons {
		transform: translateX(-15px);
	}
	>span + .material-icons {
		transform: translateX(15px);
	}

	${buttonOffsetCss}
`;

const StyledLinkButton = styled.a`
	text-decoration: none !important;

	&.graystroke {
		border: 1px solid ${themeConfig.strokeColor} !important;

	}

	${buttonCss}
	${buttonOffsetCss}
`;

const StyledIconButton = styled.button`
	${buttonCss}



	border-radius: 50%;
	width: 42px;
	height: 42px;
	padding: 0 !important;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;

	>i {
		font-size: 21px;
	}

	&.bt-xs {
		height: 20px;
		width: 20px;
	}
	&.bt-xs>i {
		font-size: 14px;
	}
	&.bt-xs.outline {
		border-width: 0.13em;
	}

	&.bt-sm {
		height: 36px;
		width: 36px;
	}
	&.bt-sm>i {
		font-size: 18px;
	}

	&.outline {
		border: 2px solid #444;
		background-color: transparent;
	}
	&.outline:hover {
		background-color: transparent;
	}

	&.default {
		background-color: ${themeConfig.defaultColor};
	}
	&.default:hover {
		background-color: ${themeConfig.defaultColorActive};
	}

	&.success.outline {
		color: ${themeConfig.successColor};
		border-color: ${themeConfig.successColor};
	}
	&.success.outline:hover {
		color: ${themeConfig.successColorActive};
		border-color: ${themeConfig.successColorActive};
	}

	&.danger.outline {
		color: #FBA556;
		border-color: #FBA556;
	}
	&.danger.outline:hover {
		color: #FBA556;
		border-color: #FBA556;
	}

	&.disabled {
		background-color: ${themeConfig.disabledColor};
	}

	&.heart {
		color: #FBA556 !important;
		background-color: #FBA556 !important;
	}

	&.static {
		cursor: default;
	}

	&.

	${buttonOffsetCss}
`;

export { StyledButton, StyledLinkButton, StyledIconButton };

