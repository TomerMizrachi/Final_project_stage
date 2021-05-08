import React from 'react'
import SignUpLayout from '@containers/Auth/SignUp/SignUpLayout/SignUpLayout';
import StyledSignUp from './SignUp.styles';
import { useParams } from 'react-router-dom';
import { Grid, Box, TextField } from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import SignUpSteps from '@containers/Auth/SignUp/SignUpSteps/SignUpSteps';
import { Button } from '@components/uielements/Button/Button';

export default function SignUp(props) {
	const { userRole } = useParams();

	const validateForm = e => {
		e.preventDefault();
		console.log('validate form code');
		props.history.push('/signup/' + userRole + '/profile');
	}

	const handleSubmit = e => {
		e.preventDefault();
		console.log("submit form code");
	}

	return (
		<SignUpLayout>
			<StyledSignUp>
				<Box mb={3}>
					<SignUpSteps step="signup" role={userRole} />
				</Box>

				<form onSubmit={handleSubmit}>
					<input type="hidden" name="role_type" value={userRole} />

					<Grid container direction="column" spacing={2}>
						<Grid item xs={7}>
							<TextField label="Name" variant="outlined" fullWidth />
						</Grid>

						<Grid item xs={7}>
							<TextField label="Email" variant="outlined" fullWidth />
						</Grid>

						<Grid item xs={7}>
							<TextField label="Password" variant="outlined" type="password" autoComplete="current-password" fullWidth />
						</Grid>

						<Grid item xs={7}>
							<Button type="submit" className="accent fullwidth bt-xl" onClick={validateForm}>Create an account</Button>
						</Grid>

						{/* <Grid item xs={8}>
							<Alert severity="error">Something went wrong, please try again later or contact support.</Alert>
						</Grid> */}
					</Grid>
				</form>
			</StyledSignUp>
		</SignUpLayout>
	)
}
