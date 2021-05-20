import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import SignUpLayout from '@containers/Auth/SignUp/SignUpLayout/SignUpLayout';
import StyledSignUpActor from './SignUpActor.styles';
import SignUpSteps from '@containers/Auth/SignUp/SignUpSteps/SignUpSteps';
import { Grid, Box, TextField, MenuItem, FormGroup, FormLabel } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@components/uielements/Button/Button';
import { Link } from 'react-router-dom';
import { registerActor } from '@actions/authActions'
import { genderOptions, bodyOptions, skillsOptions, hairOptions, eyesOptions, languagesOptions } from './actorOptions.js'
function SignUpActor(props) {
	const isFirstRun = useRef(true)
	const [age, setAge] = useState('')
	const [gender, setGender] = useState('')
	const [bodyStructure, setBodyStructure] = useState('')
	const [skills, setSkills] = useState({})
	const [height, setHeight] = useState('')
	const [hair, setHair] = useState('')
	const [eyes, setEyes] = useState('')
	const [languages, setLanguages] = useState({})
	const [errors, setErrors] = useState()
	const [email, setEmail] = useState('')
	console.log("props: ", props,"emaiil",email)


	useEffect(() => {
		console.log(skills, languages)

	}, [skills, languages])

	useEffect(() => {
		if (isFirstRun.current) {
			setEmail(props.auth.user.email)
			isFirstRun.current = false;
			return;
		}
		setErrors({ errors: props.errors })
	}, [props.errors]);

	const SkillsChange = (event) => {
		setSkills({ ...skills, [event.target.name]: event.target.checked })
	}

	const languagesChange = (event) => {
		setLanguages({ ...languages, [event.target.name]: event.target.checked })
	}

	const mapObjToArr = (obj) => {
		let arr = []
		for (let key in obj) {
			if (obj[key] === true)
				arr.push(key)
		}
		console.log(arr)
		return arr
	}
	const handleSubmit = e => {
		e.preventDefault()
		const languagesArr = mapObjToArr(languages)
		const skillArr = mapObjToArr(skills)
		const actorProfile = {
			email: email,
			age: age,
			gender: gender,
			body_structure: bodyStructure,
			height: height,
			hair: hair,
			skills: skillArr,
			languages: languagesArr
		}
		props.registerActor(actorProfile, props.history)
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
									<TextField id="outlined-number" type="number" label="Age in years" variant="outlined" fullWidth
										InputProps={{ inputProps: { min: 0, max: 120, onKeyDown: (event) => event.preventDefault() } }} value={age}
										onChange={e => setAge(e.target.value)} />
								</Grid>
								<Grid item xs={12}>
									<TextField select label="Gender" variant="outlined" fullWidth
										value={gender} onChange={e => setGender(e.target.value)} >
										{genderOptions.map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField select label="Body structure" variant="outlined" fullWidth
										value={bodyStructure} onChange={e => setBodyStructure(e.target.value)} >
										{bodyOptions.map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<FormLabel>Choose skills</FormLabel>
									<FormGroup label="Skills" variant="outlined" value={skills} >
										{skillsOptions.map((option) => (
											<FormControlLabel
												key={option} control={<Checkbox checked={skills.option} onChange={SkillsChange} name={option} />}
												label={option}
											/>
										))}
									</FormGroup>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField id="outlined-number" type="number" label="Height in CM" variant="outlined" fullWidth
										InputProps={{ inputProps: { min: 100, max: 210, onKeyDown: (event) => event.preventDefault() } }} value={height}
										onChange={e => setHeight(e.target.value)} />
								</Grid>
								<Grid item xs={12}>
									<TextField select label="Hair color" variant="outlined" fullWidth
										value={hair} onChange={e => setHair(e.target.value)} >
										{hairOptions.map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField select label="Eyes color" variant="outlined" fullWidth
										value={eyes} onChange={e => setEyes(e.target.value)} >
										{eyesOptions.map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<FormLabel>Choose languages</FormLabel>
									<FormGroup label="languages" variant="outlined" value={languages} >
										{languagesOptions.map((option) => (
											<FormControlLabel
												key={option} control={<Checkbox checked={languages.option} onChange={languagesChange} name={option} />}
												label={option}
											/>
										))}
									</FormGroup>								</Grid>
								<Grid item xs={12}>
									<Box display="flex" justifyContent="flex-end" pt={2}>
										<Button type="submit" className="accent fullwidth1 bt-xl">Let's start</Button>
									</Box>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={8}>
							{errors && <Alert severity="error"> {JSON.stringify(errors)} </Alert>}
						</Grid>
					</Grid>
				</form>
			</StyledSignUpActor>
		</SignUpLayout>
	)
}

SignUpActor.propTypes = {
	registerActor: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ registerActor }
)(withRouter(SignUpActor))