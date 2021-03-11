import express from 'express'
import { getAllActorsInfo } from '../controllers/actorController.js'

const router = express.Router()

router.get('/', getAllActorsInfo)

export default router;
