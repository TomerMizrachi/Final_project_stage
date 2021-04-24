import express from 'express'
import { getAuditions, getAuditionById, createAudition, updateAudition } from '../controllers/auditionController.js'

const router = express.Router()

router.get('/', getAuditions)

router.get('/:id', getAuditionById)

router.post('/', createAudition)

router.put('/:id', updateAudition)



export default router
