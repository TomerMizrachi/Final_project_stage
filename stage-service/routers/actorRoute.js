import express from 'express'
import { getAllActorsInfo, actorProfile } from '../controllers/actorController.js'

const router = express.Router()

router.get('/', getAllActorsInfo)

router.post('/', actorProfile)



export default router;
