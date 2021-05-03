import express from 'express'
import { getActors, getActorById, actorProfile, updateActorProfile, uploadBook, uploadVideos, deleteActor } from '../controllers/actorController.js'

const router = express.Router()

router.get('/', getActors)

router.get('/:id', getActorById)

router.post('/', actorProfile)

router.put('/:id', updateActorProfile)

router.put('/pic/:id', uploadBook)

router.put('/video/:id', uploadVideos)

router.delete('/video/')

router.delete('/:id', deleteActor)

export default router;
