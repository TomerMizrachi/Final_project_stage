import express from 'express'
import { getAuditions, getAuditionById, createAudition, updateAudition, recruiterAudition,getRelevantAuditions } from '../controllers/auditionController.js'

const router = express.Router()

router.get('/', getAuditions)

router.get('/actor', getAuditionById)

router.post('/', createAudition)

router.put('/', updateAudition)

router.get('/rec', recruiterAudition)

router.get('/getRelevantAuditions',getRelevantAuditions)

export default router
