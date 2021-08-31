import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import SignUpLayout from '@containers/Auth/SignUp/SignUpLayout/SignUpLayout'
import StyledSignUp from './SignUp.styles'
import { useParams, withRouter } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import SignUpSteps from '@containers/Auth/SignUp/SignUpSteps/SignUpSteps'
import { Button } from '@components/uielements/Button/Button'
import { registerUser, loginUser } from '@actions/authActions'

function SignUp(props) {
	const isFirstRun = useRef(true)
	const { userRole } = useParams()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [errors, setErrors] = useState()

	useEffect(() => {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (props.auth.isAuthenticated) {
			console.log("in sign up useeffect")
			if(props.auth.user.type === "actor"){
				props.history.push("/dashboard")
			}else{
				props.history.push("/")
			}
		}
	})

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return
		}
		setErrors({ errors: props.errors })
	}, [props.errors])
	
	useEffect(() => {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if (value !== password) {
				return false
			}
			return true
		});
	}, [password2])

	useEffect(() => {
		return () => ValidatorForm.removeValidationRule('isPasswordMatch')
	}, [])

	const handleSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: name,
			email: email,
			type: userRole,
			password: password,
			password2: password2
		}
		props.registerUser(newUser, props.history)
	}

	return (
		<SignUpLayout>
			<StyledSignUp>
				<Box mb={3}>
					<SignUpSteps step="signup" role={userRole} />
				</Box>

				<ValidatorForm onSubmit={handleSubmit}>
					<input type="hidden" name="role_type" value={userRole} />

					<Grid container direction="column" spacing={2}>
						<Grid item xs={7}>
							<TextValidator label="Name"
								onChange={e => setName(e.target.value)}
								variant="outlined"
								id="name"
								value={name}
								validators={['required']}
								errorMessages={['this field is required']}
								fullWidth
							/>
						</Grid>

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
								validators={['required', 'minStringLength:6', 'maxStringLength:30']}
								errorMessages={['this field is required', 'password minimum length is 6 chracthers', 'password maximum length is 30 chracthers']}
								fullWidth
							/>
						</Grid>

						<Grid item xs={7}>
							<TextValidator label="Confirm Password"
								onChange={e => setPassword2(e.target.value)}
								variant="outlined"
								type="password"
								autoComplete="current-password"
								id="password2"
								value={password2}
								validators={['isPasswordMatch', 'required']}
								errorMessages={['password mismatch', 'this field is required']}
								fullWidth
							/>
						</Grid>

						<Grid item xs={7}>
							<Button type="submit" className="accent fullwidth bt-xl">Create an account</Button>
						</Grid>

						<Grid item xs={8}>
							{errors && <Alert severity="error"> {JSON.stringify(errors.errors)} </Alert>}
						</Grid>
					</Grid>
				</ValidatorForm>
			</StyledSignUp>
		</SignUpLayout>
	)
}

SignUp.propTypes = {
	loginUser: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ registerUser, loginUser } 
)(withRouter(SignUp))
