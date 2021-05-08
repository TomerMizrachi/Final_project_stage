import { createGlobalStyle } from 'styled-components';
import themeConfig from '@config/theme.config';

const GlobalStyles = createGlobalStyle`
	*, *:before, *:after {
		box-sizing: border-box;
	}

  body,
	input,
	button,
	fieldset,
	label,
	.MuiBadge-badge {
		font-family: 'Poppins', 'Segoe UI' ,'Helvetica Neue', sans-serif !important;
		font-size: 14px;
		font-weight: 400;
		outline: none;
		color: #363848;
	}

	html, body {
		overflow-x: hidden;
	}

	.container {
		max-width: ${themeConfig.appWidth}px;
		margin: 0 auto;
		padding: 0 10px;
	}

	.text-accent {
		color: ${themeConfig.accentColor} !important;
	}

	a {
		color: ${themeConfig.accentColor};
		text-decoration: none;
		&:not(.noline):hover {
			text-decoration: underline;
		}
	}

	img {
		max-width: 100%;
		vertical-align: bottom;
	}
	
	i {
		vertical-align: bottom;
	}

	h1, h2, h3, h4, h5, h6 {
		margin-top: 0;
	}

	h2.title {
		font-size: 32px;
		font-weight: 600;
	}

	h3.title {
		font-size: 22px;
		font-weight: 600;
	}

	.heading2 {
		font-size: 22px;
		font-weight: 500;
	}

	.heading4 {
		font-size: 15px;
		font-weight: 500;
	}

	.heading6 {
		font-size: 11px;
		font-weight: 500;
	}

	.flipX {
		transform: scaleX(-1);
	}

`;

export default GlobalStyles;
