import React, { useState, useEffect } from 'react'
import StyledPracticeStep from '@containers/Trainer_1/PracticeGrid/PracticeGrid.styles'
import PicBox from './PicBox'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import { LinkButton } from '@components/uielements/Button/Button'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getActorInfo } from '@actions/actorActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { DropzoneDialogBase } from 'material-ui-dropzone'
import axios from 'axios'
import fs from 'fs'

function Gallery(props) {
    const [pictures, setPictures] = useState([])
    useEffect(() => {
        setPictures(props.actor.profile.pictures)
    }, [props.actor])

    const [open, setOpen] = useState(false)
    const [fileObjects, setFileObjects] = useState([])

    const dialogTitle = () => (
        <>
            <span>Upload file</span>
            <IconButton
                style={{ right: '12px', top: '8px', position: 'absolute' }}
                onClick={() => setOpen(false)}>
                <CloseIcon />
            </IconButton>
        </>
    );
    const uploadVideo = (fileObjects) => {
        fileObjects.map((fileObject) => {
            const formData = new FormData();
            formData.append("file", fileObject.file);
            console.log(formData.get("file"))
            axios({
                method: "get",
                url: "http://localhost:8001/actor/get_signed_url",
            }).then(function (response) {
                var postURL = response.data.postURL;
                var getURL = response.data.getURL;
                delete axios.defaults.headers.common['Authorization']
                axios({
                    method: "put",
                    url: postURL,
                    data: formData.get("file"),
                    headers: {
                        'Content-Type': 'image/png', "AllowedHeaders": "", 'Access-Control-Allow-Origin': ''
                    }
                }).then(res => {
                    console.log("Response from s3", res)
                    // this.setState({ success: true });
                }).catch(error => {
                    console.log(error);
                })
                console.log(getURL, postURL);
            }).catch(function (error) {
                console.log(error);
            })
        })
        console.log("upload video", fileObjects)
    }

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
                            <LinkButton onClick={() => setOpen(true)} className="accent round bt-sm outline">Upload Pictures</LinkButton>
                        </Box>
                        <div>
                            <DropzoneDialogBase
                                dialogTitle={dialogTitle()}
                                acceptedFiles={['image/*']}
                                // acceptedFiles={['video/*']}
                                fileObjects={fileObjects}
                                cancelButtonText={"cancel"}
                                submitButtonText={"submit"}
                                maxFileSize={5000000}
                                open={open}
                                onAdd={newFileObjs => {
                                    console.log('onAdd', newFileObjs);
                                    setFileObjects([].concat(fileObjects, newFileObjs));
                                }}
                                onDelete={deleteFileObj => {
                                    console.log('onDelete', deleteFileObj);
                                }}
                                onClose={() => setOpen(false)}
                                onSave={() => {
                                    console.log('onSave', fileObjects);
                                    uploadVideo(fileObjects)
                                    setOpen(false);
                                }}
                                showPreviews={true}
                                showFileNamesInPreview={true}
                            />
                        </div>
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
    getActorInfo: PropTypes.func.isRequired,
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
    { getActorInfo }
)(withRouter(Gallery))