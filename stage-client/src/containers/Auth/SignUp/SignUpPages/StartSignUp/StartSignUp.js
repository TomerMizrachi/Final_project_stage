import React from 'react'
import SignUpLayout from '@containers/Auth/SignUp/SignUpLayout/SignUpLayout'
import StyledStartSignUp from './StartSignUp.styles'
import { Grid, Box } from '@material-ui/core'
import SignUpSteps from '@containers/Auth/SignUp/SignUpSteps/SignUpSteps'

function SignUp() {
	const userRoles = [
		{
			title: 'Actor',
			type: 'actor',
			image: '/images/pages/signup/user-roles/actor.png'
		},
		{
			title: 'Recruiter',
			type: 'recruiter',
			image: '/images/pages/signup/user-roles/recruiter.png'
		},
	]

	return (
		<SignUpLayout>
			<StyledStartSignUp>
				<Box mb={3}>
					<SignUpSteps step="choose-role" />
				</Box>

				<Box mb={3}>
					<div className="heading">I am...</div>
				</Box>

				<Grid container className="user-roles" spacing={4}>
					{userRoles.map((role, index) => (
						<Grid key={index} item>
							<a href={`/signup/${role.type}`} className="noline">
								<Box className={`role-type ${role.type}`} p={2}>
									<img src={role.image} alt={role.title} />
									<div className="title text-accent">{role.title}</div>
								</Box>
							</a>
						</Grid>
					))}
				</Grid>
			</StyledStartSignUp>
		</SignUpLayout >
	);
}

export default SignUp
