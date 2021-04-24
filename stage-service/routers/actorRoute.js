import express from 'express'
import { getAllActorsInfo, getActorById, actorProfile, updateActorProfile, uploadBook, uploadVideos, deleteActor } from '../controllers/actorController.js'

const router = express.Router()

router.get('/', getAllActorsInfo)

router.get('/:id', getActorById)

router.post('/', actorProfile)

router.put('/:id', updateActorProfile)

router.put('/:id', uploadBook)

router.put('/:id', uploadVideos)

router.delete('/:id', deleteActor)

export default router;
