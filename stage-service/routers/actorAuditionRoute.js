import express from 'express'
import { getAllAA, getAAById,getSubmmited, createAA ,getAAByActorId, updateAA, deleteAA, createS3Url } from '../controllers/actorAuditionController.js'

const router = express.Router()

router.get('/', getAllAA)

router.get('/id/:id', getAAById)

router.get('/submitted', getSubmmited)

router.get('/actor', getAAByActorId)

router.post('/', createAA)

router.put('/:id', updateAA)

router.delete('/:id', deleteAA)

router.get('/get_signed_url', createS3Url)

export default router;

