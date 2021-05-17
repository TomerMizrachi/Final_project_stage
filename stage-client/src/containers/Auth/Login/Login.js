import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoginLayout from '@containers/Auth/Login/LoginLayout/LoginLayout'
import { Grid } from '@material-ui/core';
import { Button } from '@components/uielements/Button/Button'
import { loginUser } from '@actions/authActions'

function Login(props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (props.auth.isAuthenticated) {
			props.history.push("/dashboard")
		}
	}, [])

	const handleSubmit = e => {
		e.preventDefault();
		const userData = {
			email: email,
			password: password,
		}
		props.loginUser(userData)
	}

	return (
		<LoginLayout>
			<ValidatorForm onSubmit={handleSubmit}>
				<Grid container direction="column" spacing={2}>
					<Grid item xs={7}>
						<TextValidator label="Email"
							onChange={e => setEmail(e.target.value)}
							variant="outlined"
							id="email"
							value={email}
							validators={['required', 'isEmail']}
							errorMessages={['this field is required', 'email is not valid']}
							fullWidth
						/>
					</Grid>
					<Grid item xs={7}>
						<TextValidator label="Password"
							onChange={e => setPassword(e.target.value)}
							variant="outlined"
							type="password"
							autoComplete="current-password"
							id="password"
							value={password}
							validators={['required']}
							errorMessages={['this field is required']}
							fullWidth
						/>
					</Grid>
					<Grid item xs={7}>
						<Button type="submit" className="accent fullwidth bt-xl">Login</Button>
					</Grid>
				</Grid>
			</ValidatorForm>
		</LoginLayout>
	);
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ loginUser }
)(withRouter(Login))