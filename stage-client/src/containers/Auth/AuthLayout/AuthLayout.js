import React from 'react'
import Layout from '@containers/Layout/Layout'
import StyledAuthLayout from './AuthLayout.styles'
import { Grid, Box } from '@material-ui/core'

export default function SignUpLayout(props) {
	return (
		<Layout>
			<StyledAuthLayout>
				<Grid container className="grid-container">
					<Grid item xs={4} className="left-banner-section">
						<Box display="grid" justifyContent="center" py={10} mt={10}>
							<img src="/images/pages/signup/banner.png" alt="SignUp Banner" />
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box className="authLayoutContent" p={8} pr={0}>
							{props.children}
						</Box>
					</Grid>
				</Grid>
			</StyledAuthLayout>
		</Layout>
	)
}