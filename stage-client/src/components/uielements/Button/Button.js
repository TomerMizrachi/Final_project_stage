import React from 'react';
import { StyledButton, StyledLinkButton, StyledIconButton } from './Button.styles';

const Button = props => {
	return (
		<StyledButton {...props}>
			{props.children}
		</StyledButton>
	)
}

const LinkButton = props => {
	return (
		<StyledLinkButton {...props}>
			{props.children}
		</StyledLinkButton>
	)
}

const IconButton = props => {
	return (
		<StyledIconButton {...props}>
			{props.children}
		</StyledIconButton>
	)
}

const FilterButton = props => {
	return (
		<StyledIconButton {...props}>
			{props.children}
		</StyledIconButton>
	)
}
export { Button, LinkButton, IconButton, FilterButton};