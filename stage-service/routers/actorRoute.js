import express from 'express'
import {
    getActors, getActorByUserId, actorProfile, updateActorProfile,
    uploadPics, uploadVideos, deleteActor, deletePic, deleteVideo,
    createS3Url, deleteFromS3
} from '../controllers/actorController.js'

const router = express.Router()

router.get('/', getActors)

router.get('/info', getActorByUserId)

router.post('/', actorProfile)

router.put('/', updateActorProfile)

router.put('/uploadPics', uploadPics)

router.put('/uploadVideos', uploadVideos)

router.put('/deletePic', deletePic)

router.put('/deletevideo', deleteVideo)

router.delete('/:id', deleteActor)

router.get('/get_signed_url', createS3Url)

router.put('/deleteFromS3', deleteFromS3)

export default router;
