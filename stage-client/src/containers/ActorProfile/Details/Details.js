import React, { useState, useEffect, useRef } from 'react'
import { Grid, TextField, MenuItem, FormGroup, FormLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@components/uielements/Button/Button';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledDashboardTopCards from '@containers/Trainer_1/TrainerTopCards/TrainerTopCards.styles';
import { genderOptions, bodyOptions, skillsOptions, hairOptions, eyesOptions, languagesOptions } from '@containers/Auth/SignUp/SignUpPages/SignUpActor/actorOptions'

function Details(props) {
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

    const SkillsChange = (event) => {
        setSkills({ ...skills, [event.target.name]: event.target.checked })
    }

    const languagesChange = (event) => {
        setLanguages({ ...languages, [event.target.name]: event.target.checked })
    }

    console.log(props)
    return (
        <StyledDashboardTopCards>
            {/* <Box display="flex" justifyContent="normal" alignItems="center" mb={4}> */}
            {/* <Link to="/Dashboard/trainer">Trainer {'> '}</Link> */}
            {/* <Link to="/Trainer">{this.state.audition.auditionInfo.name}</Link> */}
            {/* <div target="_blank" onClick={this.trainerPage} >Trainer {'> '} </div>
            <div onClick={this.currPage}>Cinderalla</div> */}
            {/* </Box> */}
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
                                        <div className="heading2"></div>
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
                    </div>
                    <Grid item xs={8}>
                        {errors && <Alert severity="error"> {JSON.stringify(errors)} </Alert>}
                    </Grid>
                </Grid>
            </Grid>
        </StyledDashboardTopCards >
    )
}


Details.propTypes = {
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
    mapStateToProps
)(withRouter(Details))
