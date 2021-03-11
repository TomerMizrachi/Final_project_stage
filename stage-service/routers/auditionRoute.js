import express from 'express'
import { getAuditions } from '../controllers/auditionController.js'

const router = express.Router()

router.get('/', getAuditions)

export default router;
