import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import StyledSignUpActor from '@containers/Auth/SignUp/SignUpPages/SignUpActor/SignUpActor.styles'
import { Grid, Box, TextField, MenuItem, FormGroup, FormLabel } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@components/uielements/Button/Button'
import { searchActors } from '@actions/recruiterActions'
import { genderOptions, bodyOptions, skillsOptions, hairOptions, eyesOptions, languagesOptions } from '@containers/Auth/SignUp/SignUpPages/SignUpActor/actorOptions'
import { heightOptions } from '@containers/Dashboard/PublishForm/recruiterOptions'
import { myAuditions } from '@actions/recruiterActions'

function Typecast(props) {
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

    console.log("props: ", props)


    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            props.myAuditions(props.auth.user.id)
            return;
        }
        setErrors({ errors: props.errors })
    }, [props.errors])

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
        return arr
    }
    const handleSubmit = e => {
        e.preventDefault()
        const languagesArr = mapObjToArr(languages)
        const skillArr = mapObjToArr(skills)
        const actorProfile = {
            age: age,
            gender: gender,
            body_structure: bodyStructure,
            height: height,
            eyes: eyes,
            hair: hair,
            skills: skillArr,
            languages: languagesArr
        }
        props.searchActors(actorProfile)
    }

    return (
        <StyledSignUpActor>

            <Box className="header" mb={3}>
                <div className="desc">Please describe us the actor typecast you wish to find</div>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="outlined-number" type="number" label="Age in years" variant="outlined" fullWidth
                                    InputProps={{ inputProps: { min: 15, max: 100, onKeyDown: (event) => event.preventDefault() } }} value={age}
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
                                <TextField select label="Height in CM" variant="outlined" fullWidth
                                    value={height} onChange={e => setHeight(e.target.value)} >
                                    {heightOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                        {errors && <Alert onClose={() => { setErrors(false) }} severity="error"> {JSON.stringify(errors)} </Alert>}
                    </Grid>
                </Grid>
            </form>
        </StyledSignUpActor>
    )
}

Typecast.propTypes = {
    myAuditions: PropTypes.func.isRequired,
    searchActors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    recruiter: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    recruiter: state.recruiter,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { searchActors,
        myAuditions }
)(withRouter(Typecast))