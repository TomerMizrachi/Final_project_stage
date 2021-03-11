import express from 'express'
import { getAllActorAudition } from '../controllers/actorAuditionController.js'

const router = express.Router()

router.get('/', getAllActorAudition)

export default router;
