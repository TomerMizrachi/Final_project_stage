import React from 'react';
import AuthLayout from '@containers/Auth/AuthLayout/AuthLayout';
import StyledSignUpLayout from './SignUpLayout.styles';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function SignUpLayout(props) {
	return (
		<AuthLayout>
			<StyledSignUpLayout>
				<Box mb={3} className="signup-header">
					<h2 className="title">Sign up to Stage</h2>
					<div className="desc">
						<span>Already a member? </span>
						<Link to="/login">Log in</Link>
					</div>
				</Box>
				<div className="signup-content">
					{props.children}
				</div>
			</StyledSignUpLayout>
		</AuthLayout>
	)
}
