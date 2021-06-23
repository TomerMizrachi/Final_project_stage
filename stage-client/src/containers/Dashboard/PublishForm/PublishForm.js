import React, { useState, useEffect, useRef } from 'react'
import RecruiterLayout from '@containers/DashboardLayout/RecruiterLayout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { publishAudition } from '@actions/recruiterActions'
import { Alert } from '@material-ui/lab'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, TextField, MenuItem, FormGroup, FormLabel } from '@material-ui/core';
import { Button } from '@components/uielements/Button/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { genderOptions, bodyOptions, skillsOptions, hairOptions, eyesOptions, languagesOptions } from '@containers/Auth/SignUp/SignUpPages/SignUpActor/actorOptions.js'
import { textExample, typeOptions, publicOptions, heightOptions, ageOptions } from './recruiterOptions'
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  textarea: {
    resize: "both"
  }
}))

function PublishForm(props) {
  console.log("props: ", props)
  const isFirstRun = useRef(true)
  const classes = useStyles()
  const [dueDate, setDueDate] = useState('')
  const [availability, setAvailability] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [type, setType] = useState('')
  const [open, setOpen] = useState('')
  const [text, setText] = useState(textExample)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [bodyStructure, setBodyStructure] = useState('')
  const [skills, setSkills] = useState({})
  const [height, setHeight] = useState('')
  const [hair, setHair] = useState('')
  const [eyes, setEyes] = useState('')
  const [languages, setLanguages] = useState({})
  const [errors, setErrors] = useState()

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
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
    console.log(arr)
    return arr
  }

  const handleSubmit = e => {
    e.preventDefault()
    const languagesArr = mapObjToArr(languages)
    const skillArr = mapObjToArr(skills)
    const isOpen = open === "Yes" ? "true" : "false"
    const typecast = {
      age: age,
      gender: gender,
      body_structure: bodyStructure,
      height: height,
      eyes: eyes,
      hair: hair,
      skills: skillArr,
      languages: languagesArr
    }
    const audition = {
      recruiter_id: props.auth.user.id,
      name: name,
      type: type,
      role: role,
      text_file: text,
      due_date: dueDate,
      availability_date: availability,
      open_to_all: isOpen,
      typecast: typecast,
      is_active: "true"
    }
    props.publishAudition(audition, props.history)
  }

  return (
    <RecruiterLayout>
      <Box className="header" mb={3}>
        <div className="desc">Please fill the audition deatils</div>
      </Box>
      <Box className="header" mb={3}>
        <FormLabel>Actor Typecast :</FormLabel>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField select label="Age in years" variant="outlined" fullWidth
                  value={age} onChange={e => setAge(e.target.value)} >
                  {ageOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
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
              <Box className="header" mb={3}>
                <FormLabel>Audition Deatils :</FormLabel>
              </Box>
              <Grid item xs={12}>
                <TextField label="Due Date" variant="outlined" fullWidth
                  helperText="Due Date: the last day to submmit the filmed audition"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Name of audition" variant="outlined" fullWidth
                  value={name}
                  onChange={e => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Auditon type" variant="outlined" fullWidth
                  value={type} onChange={e => setType(e.target.value)} >
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Audition text" variant="outlined" multiline
                  rows={20}
                  fullWidth
                  value={text}
                  onChange={e => setText(e.target.value)}
                  inputProps={{ className: classes.textarea }}
                  helperText="Audition Text: this is the place for youe audition text"
                />
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
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Availability Date" variant="outlined" fullWidth
                  helperText="Availability Date: the re-call day"
                  value={availability}
                  onChange={e => setAvailability(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Role Name" variant="outlined" fullWidth
                  value={role}
                  onChange={e => setRole(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Public" variant="outlined" fullWidth
                  value={open} onChange={e => setOpen(e.target.value)}
                  helperText="Publish: No means only specific actor you will choose will see it" >
                  {publicOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <Button type="submit" className="accent fullwidth1 bt-xl">Publish Audition</Button>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            {errors && <Alert severity="error"> <Grid item>There is a problem with your form</Grid>{
              Object.keys(errors.errors).map((error) => <Grid item> {error}: {errors.errors[error]}</Grid>)
            }<Grid item>Please try again</Grid> </Alert>}
          </Grid>
        </Grid>
      </form>
    </RecruiterLayout>
  );
}

PublishForm.propTypes = {
  publishAudition: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { publishAudition }
)(PublishForm)