import React, { useState, useRef, useEffect } from 'react'
import { Grid, TextField, MenuItem, FormGroup } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@components/uielements/Button/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledDashboardTopCards from '@containers/Trainer_1/TrainerTopCards/TrainerTopCards.styles'
import { bodyOptions, skillsOptions, hairOptions, languagesOptions } from '@containers/Auth/SignUp/SignUpPages/SignUpActor/actorOptions'
import { UpdateProfile, getActorInfo } from '@actions/actorActions'

function Details(props) {
    const isFirstRun = useRef(true)
    const [id, setId] = useState('')
    const [age, setAge] = useState('')
    const [bodyStructure, setBodyStructure] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [skills, setSkills] = useState({})
    const [height, setHeight] = useState('')
    const [hair, setHair] = useState('')
    const [languages, setLanguages] = useState({})
    const [errors, setErrors] = useState()

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setErrors({ errors: props.errors })
    }, [props.errors])

    useEffect(() => {
        setId(props.actor.profile._id)
        setAge(props.actor.profile.age)
        setHeight(props.actor.profile.height)
        setHair(props.actor.profile.hair)
        setBodyStructure(props.actor.profile.body_structure)
        setAboutMe(props.actor.profile.aboutMe)
    }, [props.actor])

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
            id: id,
            age: age,
            body_structure: bodyStructure,
            height: height,
            hair: hair,
            skills: skillArr,
            aboutMe: aboutMe,
            languages: languagesArr
        }
        props.UpdateProfile(actorProfile)
        props.getActorInfo(props.auth.user.id)
    }


    return (
        <StyledDashboardTopCards>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <div className="card-box">
                            <Grid container spacing={3} className="align">
                                <Grid item xs={3}>
                                    <Grid container spacing={1} >
                                        <Grid item className="audition-info">
                                            <div className="heading2">{props.auth.user.name}</div>
                                            <div className="heading4">Profile Update</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid item >
                                        <TextField id="outlined-number" type="number" variant="outlined" size="small" fullWidth
                                            InputProps={{ inputProps: { min: 15, max: 100, onKeyDown: (event) => event.preventDefault() } }} value={age}
                                            onChange={e => setAge(e.target.value)} />
                                        <div className="desc">Age</div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid item>
                                        <TextField id="outlined-number" type="number" variant="outlined" size="small" fullWidth
                                            InputProps={{ inputProps: { min: 150, max: 210, onKeyDown: (event) => event.preventDefault() } }} value={height}
                                            onChange={e => setHeight(e.target.value)} />
                                        <div className="desc">Height</div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={6} className="align">
                                <Grid item xs={3}>
                                    <Grid container spacing={1} >
                                        <Grid item className="audition-info">
                                            <div className="heading2"></div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid item>
                                        <TextField select variant="outlined" size="small" fullWidth
                                            value={hair} onChange={e => setHair(e.target.value)} >
                                            {hairOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <div className="desc">Hair</div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid item>
                                        <TextField select variant="outlined" size="small" fullWidth
                                            value={bodyStructure} onChange={e => setBodyStructure(e.target.value)} >
                                            {bodyOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <div className="desc">Body structure</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={6} className="align">
                                <Grid item xs={3}>
                                    <Grid container spacing={1} >
                                        <Grid item className="audition-info">
                                            <div className="heading4">Your languges:</div>
                                            {
                                                props.actor.profile.languages &&
                                                    (props.actor.profile.languages.length > 0) ?
                                                    (props.actor.profile.languages.map((option) =>
                                                        (<div key={option}>{option}</div>)))
                                                    : (<div>None</div>)
                                            }
                                            <div className="heading4">Your skills:</div>
                                            {
                                                props.actor.profile.skills &&
                                                    (props.actor.profile.skills.length > 0) ?
                                                    (props.actor.profile.skills.map((option) =>
                                                        (<div key={option}>{option}</div>)))
                                                    : (<div>None</div>)
                                            }
                                            <div className="heading3">To update</div>
                                            <div className="heading3">check the relevants</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className="desc">Choose languages</div>
                                    <FormGroup label="languages" variant="outlined" value={languages} >
                                        {languagesOptions.map((option) => (
                                            <FormControlLabel
                                                key={option} control={<Checkbox checked={languages.option} onChange={languagesChange} name={option} />}
                                                label={option}
                                            />
                                        ))}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className="desc">Choose skills</div>
                                    <FormGroup label="Skills" variant="outlined" value={skills} >
                                        {skillsOptions.map((option) => (
                                            <FormControlLabel
                                                key={option} control={<Checkbox checked={skills.option} onChange={SkillsChange} name={option} />}
                                                label={option}
                                            />
                                        ))}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button type="submit" className="default bt-xl">Update Profile</Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className="align">
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="heading4">ABOUT ME</div>
                                    <div className="desc">Tell more about yourself</div>
                                    <Grid item >
                                        <TextField id="filled-basic" variant="filled" multiline fullWidth
                                            value={aboutMe} onChange={e => setAboutMe(e.target.value)} >
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid item xs={8}>
                            {errors && <Alert severity="error"> {JSON.stringify(errors)} </Alert>}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </StyledDashboardTopCards >
    )
}


Details.propTypes = {
    getActorInfo: PropTypes.func.isRequired,
    UpdateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    actor: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    actor: state.actor,
    errors: state.errors
})


export default connect(
    mapStateToProps,
    { UpdateProfile, getActorInfo }
)(withRouter(Details))
