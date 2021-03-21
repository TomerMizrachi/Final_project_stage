import express from 'express'
import { getAllActorAudition, createS3Url } from '../controllers/actorAuditionController.js'

const router = express.Router()

router.get('/', getAllActorAudition)

// router.post('/video', saveVideo)
router.get('/get_signed_url', createS3Url)

export default router;

