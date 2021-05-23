import express from 'express'
import { getAuditions, getAuditionById, createAudition, updateAudition, recruiterAudition } from '../controllers/auditionController.js'

const router = express.Router()

router.get('/', getAuditions)

router.get('/actor', getAuditionById)

router.post('/', createAudition)

router.put('/:id', updateAudition)

router.get('/rec/:id', recruiterAudition)

export default router
