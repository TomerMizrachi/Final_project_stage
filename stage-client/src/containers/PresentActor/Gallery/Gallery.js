import React from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeGrid.styles'
import PicBox from './PicBox'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function Gallery(props) {
 
    const { pictures } = props

    return (
        <StyledPracticeStep>
            <Grid container spacing={5} className="align">
                <Grid item xs={12}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Box mb={6}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center">
                                <div className="heading4">BOOK</div>
                            </Box>
                        </Box>
                        <div className="grid-container">
                            <div className="wrapper">
                                <Grid container spacing={4}>
                                    {pictures ? (pictures.map((picture, index) => (
                                        <Grid item key={index} xs={3}>
                                            <PicBox picture={picture} />
                                        </Grid>
                                    ))) : (<Grid item className="align">
                                        <div className="heading4">You uploaded no pictures</div>
                                    </Grid>)}
                                </Grid>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </StyledPracticeStep>
    )
}
Gallery.propTypes = {
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
)(withRouter(Gallery))