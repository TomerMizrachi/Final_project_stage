import React from 'react'
import AuthLayout from '@containers/Auth/AuthLayout/AuthLayout'
import StyledLoginLayout from './LoginLayout.styles'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function LoginLayout(props) {
	return (
		<AuthLayout>
			<StyledLoginLayout>
				<Box mb={3} className="login-header">
					<h2 className="title">Login to Stage</h2>
					<div className="desc">
						<span>Don't have an account? </span>
						<Link to="/signup">Sign Up</Link>
					</div>
				</Box>
				<div className="login-content">
					{props.children}
				</div>
			</StyledLoginLayout>
		</AuthLayout>
	)
}
