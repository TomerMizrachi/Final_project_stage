import express from 'express'
import { getActors, getActorByUserId, actorProfile, updateActorProfile, uploadBook, uploadVideos, deleteActor } from '../controllers/actorController.js'

const router = express.Router()

router.get('/', getActors)

router.get('/:id', getActorByUserId)

router.post('/', actorProfile)

router.put('/:id', updateActorProfile)

router.put('/pic/:id', uploadBook)

router.put('/video/:id', uploadVideos)

router.delete('/video/')

router.delete('/:id', deleteActor)

export default router;
