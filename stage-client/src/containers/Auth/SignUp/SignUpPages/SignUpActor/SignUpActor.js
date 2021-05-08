import React from 'react';
import SignUpLayout from '@containers/Auth/SignUp/SignUpLayout/SignUpLayout';
import StyledSignUpActor from './SignUpActor.styles';
import SignUpSteps from '@containers/Auth/SignUp/SignUpSteps/SignUpSteps';
import { Grid, Box, TextField, MenuItem } from '@material-ui/core';
import { Button } from '@components/uielements/Button/Button';
import { Link } from 'react-router-dom';

export default function SignUpActor(props) {
	const genderOptions = [
		{
			label: 'Male',
			value: 'male',
		},
		{
			label: 'Female',
			value: 'female',
		},
		{
			label: 'Others',
			value: 'others',
		},
	]

	const validateForm = e => {
		e.preventDefault();
		console.log('validate form code');
		props.history.push('/dashboard');
	}

	const handleSubmit = e => {
		e.preventDefault();
	}

	return (
		<SignUpLayout>
			<StyledSignUpActor>
				<Box mb={3}>
					<SignUpSteps step="actor-profile" />
				</Box>

				<Box className="header" mb={3}>
					<div className="desc">We will need some more details so we could start sending you auditions.</div>
					<Link to="/dashboard" className="skip-link">You can also skip this step &gt;</Link>
				</Box>

				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField label="Age" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<TextField
										select
										label="Gender"
										variant="outlined"
										value=""
										fullWidth
									>
										{genderOptions.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField label="Body structure" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<TextField label="Skills" variant="outlined" fullWidth />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField label="Height" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<TextField label="Hair color" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<TextField label="Eyes color" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<TextField label="Languages" variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<Box display="flex" justifyContent="flex-end" pt={2}>
										<Button type="submit" className="accent fullwidth1 bt-xl" onClick={validateForm}>Let's start</Button>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</StyledSignUpActor>
		</SignUpLayout>
	)
}
